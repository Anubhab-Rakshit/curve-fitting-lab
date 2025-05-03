export interface DataPoint {
  id: string
  x: number
  y: number
}

export interface CurveFitResult {
  coefficients: number[]
  rSquared: number
  chiSquared: number
  equation: string
}

export type CurveType = "linear" | "quadratic" | "cubic"
