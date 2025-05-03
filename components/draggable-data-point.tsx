"use client"

import { useDrag } from "react-dnd"
import { X } from "lucide-react"

interface DraggableDataPointProps {
  id: string
  x: number
  y: number
  toPixelX: (x: number) => number
  toPixelY: (y: number) => number
  showValue: boolean
  onRemove: (id: string) => void
  onDragStateChange: (isDragging: boolean) => void
}

export default function DraggableDataPoint({
  id,
  x,
  y,
  toPixelX,
  toPixelY,
  showValue,
  onRemove,
  onDragStateChange,
}: DraggableDataPointProps) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "dataPoint",
      item: () => {
        onDragStateChange(true)
        return { id, isNew: false }
      },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      end: () => {
        onDragStateChange(false)
      },
    }),
    [id, onDragStateChange],
  )

  const left = toPixelX(x)
  const top = toPixelY(y)

  return (
    <div
      ref={drag}
      className={`absolute w-6 h-6 rounded-full bg-orange-400 border-2 border-orange-600 cursor-move transform -translate-x-1/2 -translate-y-1/2 hover:z-10 ${
        isDragging ? "opacity-50" : "opacity-100"
      } transition-all duration-150 hover:scale-110 shadow-md`}
      style={{
        left: `${left}px`,
        top: `${top}px`,
      }}
    >
      <button
        className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 hover:opacity-100 transition-opacity"
        onClick={(e) => {
          e.stopPropagation()
          onRemove(id)
        }}
      >
        <X className="w-3 h-3" />
      </button>

      {showValue && (
        <div className="absolute top-6 left-0 bg-white/90 text-xs px-1.5 py-0.5 rounded border border-gray-300 whitespace-nowrap shadow-sm">
          ({x.toFixed(2)}, {y.toFixed(2)})
        </div>
      )}
    </div>
  )
}
