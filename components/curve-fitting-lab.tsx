"use client"

import { useState, useEffect } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import Graph from "./graph"
import DeviationsPanel from "./deviations-panel"
import EquationDisplay from "./equation-display"
import CurveTypePanel from "./curve-type-panel"
import AdjustableFitPanel from "./adjustable-fit-panel"
import OptionsPanel from "./options-panel"
import DataPointsBasket from "./data-points-basket"
import type { DataPoint, CurveFitResult, CurveType } from "@/types/curve-fitting"
import { fitCurve, evaluatePolynomial } from "@/lib/curve-fitting"

export default function CurveFittingLab() {
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([])
  const [curveType, setCurveType] = useState<CurveType>("quadratic")
  const [fitResult, setFitResult] = useState<CurveFitResult | null>(null)
  const [showCurve, setShowCurve] = useState<boolean>(true)
  const [showResiduals, setShowResiduals] = useState<boolean>(false)
  const [showValues, setShowValues] = useState<boolean>(true)
  const [manualCoefficients, setManualCoefficients] = useState<number[]>([0, 0, 0, 0])
  const [useManualFit, setUseManualFit] = useState<boolean>(false)

  // Get degree from curve type
  const getDegree = (type: CurveType): number => {
    switch (type) {
      case "linear":
        return 1
      case "quadratic":
        return 2
      case "cubic":
        return 3
      default:
        return 2
    }
  }

  // Update curve fit whenever data points or curve type changes
  useEffect(() => {
    if (dataPoints.length >= 2) {
      const result = fitCurve(dataPoints, getDegree(curveType))
      setFitResult(result)

      // Initialize manual coefficients with the fitted values
      if (result) {
        // Make sure we have all coefficients (up to 4 for cubic)
        const newCoefficients = [...result.coefficients]
        while (newCoefficients.length < 4) {
          newCoefficients.push(0)
        }
        setManualCoefficients(newCoefficients)
      }
    } else {
      setFitResult(null)
    }
  }, [dataPoints, curveType])

  const addDataPoint = (x: number, y: number) => {
    const newPoint: DataPoint = {
      id: `point-${Date.now()}`,
      x,
      y,
    }
    setDataPoints([...dataPoints, newPoint])
  }

  const updateDataPoint = (id: string, x: number, y: number) => {
    setDataPoints(dataPoints.map((point) => (point.id === id ? { ...point, x, y } : point)))
  }

  const removeDataPoint = (id: string) => {
    setDataPoints(dataPoints.filter((point) => point.id !== id))
  }

  const clearAllPoints = () => {
    setDataPoints([])
  }

  const handleCoefficientChange = (index: number, value: number) => {
    const newCoefficients = [...manualCoefficients]
    newCoefficients[index] = value
    setManualCoefficients(newCoefficients)
  }

  // Get the current coefficients based on whether we're using manual or auto fit
  const getCurrentCoefficients = () => {
    if (useManualFit) {
      return manualCoefficients
    } else if (fitResult) {
      return fitResult.coefficients
    }
    return []
  }

  // Calculate chi-squared and r-squared for manual coefficients
  const getManualFitStats = () => {
    if (dataPoints.length < 2) return { chiSquared: 0, rSquared: 0 }

    const n = dataPoints.length
    const coeffs = manualCoefficients

    // Calculate predicted y values
    const yPredicted = dataPoints.map((p) => evaluatePolynomial(coeffs, p.x))

    // Calculate mean of observed y values
    const yValues = dataPoints.map((p) => p.y)
    const yMean = yValues.reduce((sum, y) => sum + y, 0) / n

    // Calculate sum of squares
    let ssTotal = 0 // Total sum of squares
    let ssResidual = 0 // Residual sum of squares
    let chiSquared = 0 // Chi-squared

    for (let i = 0; i < n; i++) {
      ssTotal += Math.pow(yValues[i] - yMean, 2)
      ssResidual += Math.pow(yValues[i] - yPredicted[i], 2)

      // Avoid division by zero for chi-squared calculation
      const variance = Math.abs(yPredicted[i]) > 0.001 ? yPredicted[i] : 0.001
      chiSquared += Math.pow(yValues[i] - yPredicted[i], 2) / variance
    }

    // Calculate R-squared
    const rSquared = 1 - ssResidual / ssTotal

    return {
      chiSquared,
      rSquared: Math.max(0, Math.min(1, rSquared)), // Clamp between 0 and 1
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex flex-col gap-4 w-full lg:w-1/4">
            <DeviationsPanel
              fitResult={fitResult}
              manualStats={useManualFit ? getManualFitStats() : null}
              useManualFit={useManualFit}
            />
            <DataPointsBasket onAddPoint={addDataPoint} />
          </div>

          <div className="w-full lg:w-2/4 flex flex-col gap-2">
            <EquationDisplay
              coefficients={getCurrentCoefficients()}
              curveType={curveType}
              useManualFit={useManualFit}
            />
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Graph
                dataPoints={dataPoints}
                coefficients={getCurrentCoefficients()}
                showCurve={showCurve}
                showResiduals={showResiduals}
                showValues={showValues}
                onUpdatePoint={updateDataPoint}
                onRemovePoint={removeDataPoint}
                onAddPoint={addDataPoint}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 w-full lg:w-1/4">
            <OptionsPanel
              showCurve={showCurve}
              showResiduals={showResiduals}
              showValues={showValues}
              onToggleCurve={() => setShowCurve(!showCurve)}
              onToggleResiduals={() => setShowResiduals(!showResiduals)}
              onToggleValues={() => setShowValues(!showValues)}
            />

            <CurveTypePanel curveType={curveType} onChangeCurveType={setCurveType} />

            <AdjustableFitPanel
              coefficients={manualCoefficients}
              curveType={curveType}
              onCoefficientChange={handleCoefficientChange}
              useManualFit={useManualFit}
              onToggleManualFit={() => setUseManualFit(!useManualFit)}
              onClearPoints={clearAllPoints}
            />
          </div>
        </div>
      </div>
    </DndProvider>
  )
}
