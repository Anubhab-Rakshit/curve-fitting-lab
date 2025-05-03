"use client"

import { Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface DeviationsPanelProps {
  fitResult: { chiSquared: number; rSquared: number } | null
  manualStats: { chiSquared: number; rSquared: number } | null
  useManualFit: boolean
}

export default function DeviationsPanel({ fitResult, manualStats, useManualFit }: DeviationsPanelProps) {
  const stats = useManualFit ? manualStats : fitResult

  // Format the values with proper precision
  const formatValue = (value: number | undefined) => {
    if (value === undefined) return "-"
    return value.toFixed(2)
  }

  const chiSquared = stats ? stats.chiSquared : 0
  const rSquared = stats ? stats.rSquared : 0

  // Calculate height percentages for the bars
  const chiSquaredHeight = Math.min(100, chiSquared * 5)
  const rSquaredHeight = rSquared * 100

  return (
    <div className="bg-orange-50 rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center">
          <span className="inline-block w-4 h-4 bg-orange-400 mr-2"></span>
          Deviations
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="text-blue-500 hover:text-blue-700 transition-colors">
                <Info className="w-5 h-5" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs p-3 bg-white shadow-lg rounded-lg border border-gray-200">
              <p className="text-sm text-gray-700">
                <strong>Chi-squared (χ²)</strong> measures the sum of squared differences between observed and expected
                values.
              </p>
              <p className="mt-2 text-sm text-gray-700">
                <strong>R-squared (r²)</strong> indicates how well the model fits the data (0-1, higher is better).
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex justify-between items-end mt-6">
        <div className="flex flex-col items-center">
          <div className="h-40 w-12 bg-white border border-gray-300 rounded relative overflow-hidden">
            <div
              className="absolute bottom-0 w-full bg-orange-400 rounded-b transition-all duration-300 ease-out"
              style={{
                height: `${chiSquaredHeight}%`,
                maxHeight: "100%",
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-between py-1 px-1 text-xs pointer-events-none">
              <span className="text-right">100</span>
              <span className="text-right">30</span>
              <span className="text-right">10</span>
              <span className="text-right">3</span>
              <span className="text-right">2</span>
              <span className="text-right">1</span>
              <span className="text-right">0.5</span>
              <span className="text-right">0</span>
            </div>
          </div>
          <div className="mt-2 text-center">
            <div className="text-sm font-medium">χ² = </div>
            <div className="w-16 h-8 bg-white border border-gray-300 rounded flex items-center justify-center text-sm font-mono">
              {formatValue(chiSquared)}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center">
          <div className="h-40 w-12 bg-white border border-gray-300 rounded relative overflow-hidden">
            <div
              className="absolute bottom-0 w-full bg-orange-400 rounded-b transition-all duration-300 ease-out"
              style={{
                height: `${rSquaredHeight}%`,
                maxHeight: "100%",
              }}
            />
            <div className="absolute inset-0 flex flex-col justify-between py-1 px-1 text-xs pointer-events-none">
              <span className="text-right">1</span>
              <span className="text-right">0.75</span>
              <span className="text-right">0.5</span>
              <span className="text-right">0.25</span>
              <span className="text-right">0</span>
            </div>
          </div>
          <div className="mt-2 text-center">
            <div className="text-sm font-medium">r² = </div>
            <div className="w-16 h-8 bg-white border border-gray-300 rounded flex items-center justify-center text-sm font-mono">
              {formatValue(rSquared)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
