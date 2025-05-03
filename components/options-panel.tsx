"use client"

import { CheckSquare } from "lucide-react"

interface OptionsPanelProps {
  showCurve: boolean
  showResiduals: boolean
  showValues: boolean
  onToggleCurve: () => void
  onToggleResiduals: () => void
  onToggleValues: () => void
}

export default function OptionsPanel({
  showCurve,
  showResiduals,
  showValues,
  onToggleCurve,
  onToggleResiduals,
  onToggleValues,
}: OptionsPanelProps) {
  return (
    <div className="bg-orange-50 rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
        <CheckSquare className="w-5 h-5 mr-2 text-gray-700" />
        Options
      </h3>

      <div className="space-y-3">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showCurve}
            onChange={onToggleCurve}
            className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
          />
          <span className="text-gray-700">Curve</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showResiduals}
            onChange={onToggleResiduals}
            className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
          />
          <span className="text-gray-700">Residuals</span>
        </label>

        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showValues}
            onChange={onToggleValues}
            className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
          />
          <span className="text-gray-700">Values</span>
        </label>
      </div>
    </div>
  )
}
