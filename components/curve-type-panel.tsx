"use client"

import { LineChartIcon as ChartLineUp } from "lucide-react"
import type { CurveType } from "@/types/curve-fitting"

interface CurveTypePanelProps {
  curveType: CurveType
  onChangeCurveType: (type: CurveType) => void
}

export default function CurveTypePanel({ curveType, onChangeCurveType }: CurveTypePanelProps) {
  return (
    <div className="bg-orange-50 rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
        <ChartLineUp className="w-5 h-5 mr-2 text-gray-700" />
        Curve Type
      </h3>

      <div className="space-y-3">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            checked={curveType === "linear"}
            onChange={() => onChangeCurveType("linear")}
            className="w-4 h-4 text-orange-500 focus:ring-orange-500"
          />
          <span className="text-gray-700">Linear</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            checked={curveType === "quadratic"}
            onChange={() => onChangeCurveType("quadratic")}
            className="w-4 h-4 text-orange-500 focus:ring-orange-500"
          />
          <span className="text-gray-700">Quadratic</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="radio"
            checked={curveType === "cubic"}
            onChange={() => onChangeCurveType("cubic")}
            className="w-4 h-4 text-orange-500 focus:ring-orange-500"
          />
          <span className="text-gray-700">Cubic</span>
        </label>
      </div>
    </div>
  )
}
