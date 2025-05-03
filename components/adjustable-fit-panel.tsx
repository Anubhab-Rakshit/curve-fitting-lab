"use client"

import { Sliders, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CurveType } from "@/types/curve-fitting"

interface AdjustableFitPanelProps {
  coefficients: number[]
  curveType: CurveType
  useManualFit: boolean
  onCoefficientChange: (index: number, value: number) => void
  onToggleManualFit: () => void
  onClearPoints: () => void
}

export default function AdjustableFitPanel({
  coefficients,
  curveType,
  useManualFit,
  onCoefficientChange,
  onToggleManualFit,
  onClearPoints,
}: AdjustableFitPanelProps) {
  // Get the number of coefficients based on curve type
  const getNumCoefficients = (type: CurveType): number => {
    switch (type) {
      case "linear":
        return 2
      case "quadratic":
        return 3
      case "cubic":
        return 4
      default:
        return 3
    }
  }

  const numCoefficients = getNumCoefficients(curveType)

  // Get coefficient labels based on curve type
  const getCoefficientLabels = (type: CurveType): string[] => {
    switch (type) {
      case "linear":
        return ["b", "m"]
      case "quadratic":
        return ["c", "b", "a"]
      case "cubic":
        return ["d", "c", "b", "a"]
      default:
        return ["c", "b", "a"]
    }
  }

  const coefficientLabels = getCoefficientLabels(curveType)

  // Get ranges for each coefficient
  const getRange = (index: number): [number, number] => {
    // For highest power coefficient (a in ax² + bx + c)
    if (index === numCoefficients - 1) return [-2, 2]
    // For middle coefficients
    if (index > 0) return [-10, 10]
    // For constant term
    return [-20, 20]
  }

  return (
    <div className="bg-orange-50 rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <Sliders className="w-5 h-5 mr-2 text-gray-700" />
          Adjustable Fit
        </h3>
      </div>

      <div className="mb-4">
        <label className="flex items-center space-x-2 cursor-pointer p-1 rounded hover:bg-gray-100 transition-colors">
          <input
            type="radio"
            checked={!useManualFit}
            onChange={() => onToggleManualFit()}
            className="w-4 h-4 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-gray-700">Best fit</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer mt-2 p-1 rounded hover:bg-gray-100 transition-colors">
          <input
            type="radio"
            checked={useManualFit}
            onChange={() => onToggleManualFit()}
            className="w-4 h-4 text-blue-500 focus:ring-blue-500"
          />
          <span className="text-gray-700">Adjustable fit</span>
        </label>
      </div>

      {useManualFit && (
        <div className="mt-4">
          <div className="text-sm text-gray-700 mb-3 font-medium">
            {curveType === "linear" ? (
              <span>y = mx + b</span>
            ) : curveType === "quadratic" ? (
              <span>y = ax² + bx + c</span>
            ) : (
              <span>y = ax³ + bx² + cx + d</span>
            )}
          </div>

          <div className="space-y-5">
            {coefficients.slice(0, numCoefficients).map((value, index) => {
              const label = coefficientLabels[index]
              const [min, max] = getRange(index)

              return (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-blue-600 font-medium w-4 text-center">{label}</span>
                  <input
                    type="range"
                    min={min}
                    max={max}
                    step={(max - min) / 100}
                    value={value}
                    onChange={(e) => onCoefficientChange(index, Number.parseFloat(e.target.value))}
                    className="flex-grow h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="w-16 h-7 bg-white border border-gray-300 rounded flex items-center justify-center text-xs font-mono">
                    {value.toFixed(2)}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <Button variant="destructive" onClick={onClearPoints} className="w-full mt-4 flex items-center justify-center">
        <Trash2 className="w-4 h-4 mr-2" />
        Clear All Points
      </Button>
    </div>
  )
}
