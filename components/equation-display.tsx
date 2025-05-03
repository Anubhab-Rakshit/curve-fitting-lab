"use client"

import type { CurveType } from "@/types/curve-fitting"

interface EquationDisplayProps {
  coefficients: number[]
  curveType: CurveType
  useManualFit: boolean
}

export default function EquationDisplay({ coefficients, curveType, useManualFit }: EquationDisplayProps) {
  if (!coefficients || coefficients.length === 0) {
    return null
  }

  // Format a coefficient for display
  const formatCoef = (value: number, index: number, isFirst: boolean) => {
    if (value === 0 && index > 0) return null // Allow zero for constant term

    const absValue = Math.abs(value).toFixed(3)
    const sign = value < 0 ? "-" : isFirst ? "" : "+"

    // For constant term (no x)
    if (index === 0) {
      return `${sign} ${absValue}`
    }

    // For x term
    if (index === 1) {
      return `${sign} ${absValue}x`
    }

    // For higher power terms
    return `${sign} ${absValue}x^${index}`
  }

  // Build the equation string based on curve type
  const buildEquation = () => {
    let equation = "y = "
    let hasTerms = false

    // Get the number of terms based on curve type
    const numTerms = curveType === "linear" ? 2 : curveType === "quadratic" ? 3 : 4

    // Process coefficients in reverse order (highest power first)
    for (let i = Math.min(coefficients.length, numTerms) - 1; i >= 0; i--) {
      const term = formatCoef(coefficients[i], i, !hasTerms)
      if (term) {
        equation += term + " "
        hasTerms = true
      }
    }

    return hasTerms ? equation : "y = 0"
  }

  return (
    <div className="bg-white rounded-lg p-3 shadow-md mb-2 flex items-center">
      <div className="w-6 h-6 bg-orange-400 rounded-sm flex items-center justify-center mr-2">
        <span className="text-white font-bold">f</span>
      </div>
      <div className="font-mono text-lg overflow-x-auto whitespace-nowrap py-1 px-2">{buildEquation()}</div>
    </div>
  )
}
