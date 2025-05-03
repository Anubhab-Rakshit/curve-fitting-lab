import type { DataPoint, CurveFitResult } from "@/types/curve-fitting"

/**
 * Evaluates a polynomial at a given x value
 * @param coefficients Array of coefficients [a0, a1, a2, ...] for a0 + a1*x + a2*x^2 + ...
 * @param x The x value to evaluate at
 * @returns The y value of the polynomial at x
 */
export function evaluatePolynomial(coefficients: number[], x: number): number {
  return coefficients.reduce((sum, coef, i) => sum + coef * Math.pow(x, i), 0)
}

/**
 * Fits a polynomial curve to the given data points
 * @param dataPoints Array of data points
 * @param degree Degree of the polynomial to fit
 * @returns The curve fit result with coefficients and statistics
 */
export function fitCurve(dataPoints: DataPoint[], degree: number): CurveFitResult {
  if (dataPoints.length < 2) {
    throw new Error("At least 2 data points are required for curve fitting")
  }

  if (degree < 1) {
    throw new Error("Polynomial degree must be at least 1")
  }

  if (degree >= dataPoints.length) {
    degree = dataPoints.length - 1
  }

  // Extract x and y values
  const xValues = dataPoints.map((p) => p.x)
  const yValues = dataPoints.map((p) => p.y)

  // Perform polynomial regression using normal equations
  const coefficients = polynomialRegression(xValues, yValues, degree)

  // Calculate statistics
  const { rSquared, chiSquared } = calculateStatistics(xValues, yValues, coefficients)

  // Generate equation string
  const equation = generateEquationString(coefficients)

  return {
    coefficients,
    rSquared,
    chiSquared,
    equation,
  }
}

/**
 * Performs polynomial regression using normal equations
 * @param xValues Array of x values
 * @param yValues Array of y values
 * @param degree Degree of the polynomial
 * @returns Array of coefficients
 */
function polynomialRegression(xValues: number[], yValues: number[], degree: number): number[] {
  const n = xValues.length
  const augmentedMatrix = []

  // Create the augmented matrix for the normal equations
  for (let i = 0; i <= degree; i++) {
    const row = []
    for (let j = 0; j <= degree; j++) {
      let sum = 0
      for (let k = 0; k < n; k++) {
        sum += Math.pow(xValues[k], i + j)
      }
      row.push(sum)
    }

    let sum = 0
    for (let k = 0; k < n; k++) {
      sum += yValues[k] * Math.pow(xValues[k], i)
    }
    row.push(sum)

    augmentedMatrix.push(row)
  }

  // Solve the system of linear equations using Gaussian elimination
  return gaussianElimination(augmentedMatrix)
}

/**
 * Solves a system of linear equations using Gaussian elimination
 * @param augmentedMatrix The augmented matrix representing the system
 * @returns Array of solutions
 */
function gaussianElimination(augmentedMatrix: number[][]): number[] {
  const n = augmentedMatrix.length

  // Forward elimination
  for (let i = 0; i < n; i++) {
    // Find pivot
    let maxRow = i
    for (let j = i + 1; j < n; j++) {
      if (Math.abs(augmentedMatrix[j][i]) > Math.abs(augmentedMatrix[maxRow][i])) {
        maxRow = j
      }
    }
    // Swap rows
    ;[augmentedMatrix[i], augmentedMatrix[maxRow]] = [augmentedMatrix[maxRow], augmentedMatrix[i]]

    // Eliminate below
    for (let j = i + 1; j < n; j++) {
      const factor = augmentedMatrix[j][i] / augmentedMatrix[i][i]

      for (let k = i; k <= n; k++) {
        augmentedMatrix[j][k] -= factor * augmentedMatrix[i][k]
      }
    }
  }

  // Back substitution
  const solution = new Array(n).fill(0)
  for (let i = n - 1; i >= 0; i--) {
    solution[i] = augmentedMatrix[i][n]

    for (let j = i + 1; j < n; j++) {
      solution[i] -= augmentedMatrix[i][j] * solution[j]
    }

    solution[i] /= augmentedMatrix[i][i]
  }

  return solution
}

/**
 * Calculates statistics for the curve fit
 * @param xValues Array of x values
 * @param yValues Array of y values
 * @param coefficients Array of coefficients
 * @returns Object with r-squared and chi-squared values
 */
function calculateStatistics(
  xValues: number[],
  yValues: number[],
  coefficients: number[],
): { rSquared: number; chiSquared: number } {
  const n = xValues.length

  // Calculate predicted y values
  const yPredicted = xValues.map((x) => evaluatePolynomial(coefficients, x))

  // Calculate mean of observed y values
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
    rSquared: Math.max(0, Math.min(1, rSquared)), // Clamp between 0 and 1
    chiSquared,
  }
}

/**
 * Generates a string representation of the polynomial equation
 * @param coefficients Array of coefficients
 * @returns String representation of the equation
 */
function generateEquationString(coefficients: number[]): string {
  if (coefficients.length === 0) return "0"

  const terms = coefficients
    .map((coef, i) => {
      if (coef === 0) return null

      const value = Math.abs(coef).toFixed(3)
      let term = ""

      if (i === 0) {
        term = value
      } else if (i === 1) {
        term = `${value}x`
      } else {
        term = `${value}x^${i}`
      }

      return { term, coef }
    })
    .filter(Boolean)

  if (terms.length === 0) return "0"

  return terms
    .map((term, i) => {
      if (i === 0) {
        return term!.coef < 0 ? `-${term!.term}` : term!.term
      } else {
        return term!.coef < 0 ? ` - ${term!.term}` : ` + ${term!.term}`
      }
    })
    .join("")
}
