"use client"

import type React from "react"

import { useRef, useEffect, useState, useCallback } from "react"
import { useDrop } from "react-dnd"
import type { DataPoint } from "@/types/curve-fitting"
import DraggableDataPoint from "./draggable-data-point"
import { evaluatePolynomial } from "@/lib/curve-fitting"

interface GraphProps {
  dataPoints: DataPoint[]
  coefficients: number[]
  showCurve: boolean
  showResiduals: boolean
  showValues: boolean
  onUpdatePoint: (id: string, x: number, y: number) => void
  onRemovePoint: (id: string) => void
  onAddPoint: (x: number, y: number) => void
}

export default function Graph({
  dataPoints,
  coefficients,
  showCurve,
  showResiduals,
  showValues,
  onUpdatePoint,
  onRemovePoint,
  onAddPoint,
}: GraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isDragging, setIsDragging] = useState(false)

  // Graph boundaries
  const xMin = -10
  const xMax = 10
  const yMin = -10
  const yMax = 10

  // Convert graph coordinates to pixel coordinates
  const toPixelX = useCallback(
    (x: number) => {
      return ((x - xMin) / (xMax - xMin)) * dimensions.width
    },
    [dimensions.width],
  )

  const toPixelY = useCallback(
    (y: number) => {
      return dimensions.height - ((y - yMin) / (yMax - yMin)) * dimensions.height
    },
    [dimensions.height],
  )

  // Convert pixel coordinates to graph coordinates
  const toGraphX = useCallback(
    (px: number) => {
      return xMin + (px / dimensions.width) * (xMax - xMin)
    },
    [dimensions.width],
  )

  const toGraphY = useCallback(
    (py: number) => {
      return yMin + ((dimensions.height - py) / dimensions.height) * (yMax - yMin)
    },
    [dimensions.height],
  )

  // Set up drop target for data points
  const [, drop] = useDrop(
    () => ({
      accept: "dataPoint",
      drop: (item: any, monitor) => {
        const offset = monitor.getSourceClientOffset()
        if (offset && containerRef.current) {
          const containerRect = containerRef.current.getBoundingClientRect()
          const x = toGraphX(offset.x - containerRect.left)
          const y = toGraphY(offset.y - containerRect.top)

          if (item.isNew) {
            // This is a new point from the basket
            return { x, y }
          } else {
            // This is an existing point being moved
            onUpdatePoint(item.id, x, y)
          }
        }
      },
    }),
    [dimensions, onUpdatePoint, toGraphX, toGraphY],
  )

  // Handle direct clicks on the graph to add points
  const handleCanvasClick = (e: React.MouseEvent) => {
    if (isDragging) return // Don't add a point if we're dragging

    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      const x = toGraphX(e.clientX - rect.left)
      const y = toGraphY(e.clientY - rect.top)
      onAddPoint(x, y)
    }
  }

  // Update dimensions when window resizes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)

    return () => {
      window.removeEventListener("resize", updateDimensions)
    }
  }, [])

  // Draw the graph
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || dimensions.width === 0) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with device pixel ratio for sharper rendering
    const dpr = window.devicePixelRatio || 1
    canvas.width = dimensions.width * dpr
    canvas.height = dimensions.height * dpr

    // Scale all drawing operations by dpr
    ctx.scale(dpr, dpr)

    // Set canvas CSS dimensions
    canvas.style.width = `${dimensions.width}px`
    canvas.style.height = `${dimensions.height}px`

    // Clear canvas with a white background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, dimensions.width, dimensions.height)

    // Draw background grid
    ctx.strokeStyle = "#f0f0f0"
    ctx.lineWidth = 1

    // Vertical grid lines
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      const px = toPixelX(x)
      ctx.beginPath()
      ctx.moveTo(px, 0)
      ctx.lineTo(px, dimensions.height)
      ctx.stroke()
    }

    // Horizontal grid lines
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      const py = toPixelY(y)
      ctx.beginPath()
      ctx.moveTo(0, py)
      ctx.lineTo(dimensions.width, py)
      ctx.stroke()
    }

    // Draw axes
    ctx.strokeStyle = "#000"
    ctx.lineWidth = 2

    // X-axis
    ctx.beginPath()
    ctx.moveTo(0, toPixelY(0))
    ctx.lineTo(dimensions.width, toPixelY(0))
    ctx.stroke()

    // Y-axis
    ctx.beginPath()
    ctx.moveTo(toPixelX(0), 0)
    ctx.lineTo(toPixelX(0), dimensions.height)
    ctx.stroke()

    // Draw axis labels
    ctx.fillStyle = "#333"
    ctx.font = "12px Arial"

    // X axis labels
    ctx.textAlign = "center"
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      if (x === 0) continue // Skip origin
      const px = toPixelX(x)
      ctx.fillText(x.toString(), px, toPixelY(0) + 15)
    }

    // Y axis labels
    ctx.textAlign = "right"
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      if (y === 0) continue // Skip origin
      const py = toPixelY(y)
      ctx.fillText(y.toString(), toPixelX(0) - 5, py + 4)
    }

    // Draw origin label
    ctx.textAlign = "center"
    ctx.fillText("0", toPixelX(0) - 10, toPixelY(0) + 15)

    // Draw x and y labels
    ctx.font = "14px Arial"
    ctx.fillText("x", dimensions.width - 15, toPixelY(0) - 10)
    ctx.fillText("y", toPixelX(0) + 15, 15)

    // Draw the fitted curve
    if (showCurve && coefficients.length > 0) {
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 2.5
      ctx.beginPath()

      const step = (xMax - xMin) / 500 // More points for smoother curve
      let firstPoint = true

      for (let x = xMin; x <= xMax; x += step) {
        const y = evaluatePolynomial(coefficients, x)

        if (y >= yMin && y <= yMax) {
          const px = toPixelX(x)
          const py = toPixelY(y)

          if (firstPoint) {
            ctx.moveTo(px, py)
            firstPoint = false
          } else {
            ctx.lineTo(px, py)
          }
        }
      }

      ctx.stroke()
    }

    // Draw residuals
    if (showResiduals && coefficients.length > 0 && dataPoints.length > 0) {
      ctx.strokeStyle = "#4a6ee0"
      ctx.lineWidth = 1.5

      dataPoints.forEach((point) => {
        const predictedY = evaluatePolynomial(coefficients, point.x)
        const px = toPixelX(point.x)
        const actualPy = toPixelY(point.y)
        const predictedPy = toPixelY(predictedY)

        ctx.beginPath()
        ctx.moveTo(px, actualPy)
        ctx.lineTo(px, predictedPy)
        ctx.stroke()
      })
    }
  }, [dimensions, dataPoints, coefficients, showCurve, showResiduals, toPixelX, toPixelY])

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500px] bg-white rounded-lg overflow-hidden cursor-crosshair border border-gray-200"
    >
      <div ref={drop} className="absolute inset-0" onClick={handleCanvasClick}>
        <canvas ref={canvasRef} className="absolute inset-0" />

        {dataPoints.map((point) => (
          <DraggableDataPoint
            key={point.id}
            id={point.id}
            x={point.x}
            y={point.y}
            toPixelX={toPixelX}
            toPixelY={toPixelY}
            showValue={showValues}
            onRemove={onRemovePoint}
            onDragStateChange={setIsDragging}
          />
        ))}
      </div>
    </div>
  )
}
