"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp, BookOpen, Lightbulb, Zap, BarChart4, Calculator } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function EducationalContent() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
      <div
        className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white flex justify-between items-center cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <BookOpen className="mr-2 h-5 w-5" />
          <h2 className="text-xl font-bold">Learning Resources & Notes</h2>
        </div>
        <div>{isExpanded ? <ChevronUp /> : <ChevronDown />}</div>
      </div>

      {isExpanded && (
        <div className="p-4">
          <Tabs defaultValue="concepts">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="concepts">Key Concepts</TabsTrigger>
              <TabsTrigger value="mathematics">Mathematics</TabsTrigger>
              <TabsTrigger value="applications">Applications</TabsTrigger>
              <TabsTrigger value="tips">Tips & Tricks</TabsTrigger>
            </TabsList>

            <TabsContent value="concepts" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
                    Understanding Curve Fitting
                  </CardTitle>
                  <CardDescription>The fundamental concepts behind fitting curves to data points</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>What is Curve Fitting?</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">
                          Curve fitting is the process of constructing a mathematical function that has the best fit to
                          a series of data points. It helps us understand the relationship between variables and make
                          predictions based on that relationship.
                        </p>
                        <p>
                          In this lab, we're using the method of least squares to find the polynomial function that
                          minimizes the sum of squared differences between observed and predicted values.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger>Types of Curve Fitting</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">
                          <strong>Linear Fitting:</strong> Fits a straight line (y = mx + b) to data points. Useful for
                          data with a constant rate of change.
                        </p>
                        <p className="mb-2">
                          <strong>Quadratic Fitting:</strong> Fits a parabola (y = ax² + bx + c) to data points. Good
                          for data with one change in direction.
                        </p>
                        <p className="mb-2">
                          <strong>Cubic Fitting:</strong> Fits a cubic curve (y = ax³ + bx² + cx + d) to data points.
                          Can model more complex relationships with multiple changes in direction.
                        </p>
                        <p>
                          Other types include exponential, logarithmic, and sinusoidal fits, each appropriate for
                          different types of data relationships.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger>Goodness of Fit Measures</AccordionTrigger>
                      <AccordionContent>
                        <p className="mb-2">
                          <strong>R-squared (r²):</strong> Measures the proportion of variance in the dependent variable
                          that is predictable from the independent variable(s). Values range from 0 to 1, with higher
                          values indicating a better fit.
                        </p>
                        <p>
                          <strong>Chi-squared (χ²):</strong> Measures the sum of squared differences between observed
                          and expected values, normalized by the expected values. Lower values indicate a better fit.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mathematics" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="mr-2 h-5 w-5 text-green-500" />
                    Mathematical Background
                  </CardTitle>
                  <CardDescription>The mathematical principles behind polynomial regression</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Polynomial Regression</h3>
                      <p className="mb-2">
                        Polynomial regression fits a polynomial of degree n to a set of data points. The general form
                        is:
                      </p>
                      <div className="bg-gray-100 p-3 rounded-md font-mono text-center my-2">
                        y = a₀ + a₁x + a₂x² + a₃x³ + ... + aₙxⁿ
                      </div>
                      <p>
                        The coefficients (a₀, a₁, ..., aₙ) are determined using the method of least squares, which
                        minimizes the sum of squared residuals.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">Method of Least Squares</h3>
                      <p className="mb-2">
                        The least squares method finds the coefficients that minimize the sum of squared differences
                        between observed values and the values predicted by the model:
                      </p>
                      <div className="bg-gray-100 p-3 rounded-md font-mono text-center my-2">
                        minimize: Σ(yᵢ - f(xᵢ))²
                      </div>
                      <p>
                        This leads to a system of linear equations (normal equations) that can be solved to find the
                        optimal coefficients.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-2">R-squared Calculation</h3>
                      <p className="mb-2">R-squared is calculated as:</p>
                      <div className="bg-gray-100 p-3 rounded-md font-mono text-center my-2">
                        R² = 1 - (SSres / SStot)
                      </div>
                      <p>
                        Where SSres is the sum of squared residuals and SStot is the total sum of squares (proportional
                        to the variance of the data).
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="applications" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="mr-2 h-5 w-5 text-amber-500" />
                    Real-World Applications
                  </CardTitle>
                  <CardDescription>How curve fitting is used in various fields</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-2">Physics & Engineering</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Analyzing experimental data and validating theoretical models</li>
                        <li>Determining physical constants from experimental measurements</li>
                        <li>Calibrating instruments and sensors</li>
                        <li>Modeling stress-strain relationships in materials</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-2">Economics & Finance</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Forecasting economic trends and market behavior</li>
                        <li>Analyzing supply and demand relationships</li>
                        <li>Modeling price elasticity</li>
                        <li>Risk assessment and portfolio optimization</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-2">Biology & Medicine</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Modeling growth curves of organisms</li>
                        <li>Analyzing dose-response relationships in pharmacology</li>
                        <li>Studying enzyme kinetics</li>
                        <li>Epidemiological modeling of disease spread</li>
                      </ul>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h3 className="text-lg font-medium mb-2">Computer Science & AI</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Machine learning model training and validation</li>
                        <li>Computer vision for object recognition</li>
                        <li>Natural language processing</li>
                        <li>Predictive analytics and forecasting</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tips" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart4 className="mr-2 h-5 w-5 text-blue-500" />
                    Tips & Best Practices
                  </CardTitle>
                  <CardDescription>How to get the most out of curve fitting</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                      <h3 className="text-lg font-medium mb-2 text-blue-700">Choosing the Right Model</h3>
                      <p>
                        Start with the simplest model that might explain your data (often linear). Only move to more
                        complex models if the simpler ones don't fit well. Remember that higher-degree polynomials can
                        overfit the data, capturing noise rather than the underlying trend.
                      </p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <h3 className="text-lg font-medium mb-2 text-green-700">Interpreting R-squared</h3>
                      <p>
                        A high R-squared doesn't always mean a good model. It's possible to have a high R-squared with a
                        biased model or with overfitting. Always consider the context of your data and the simplicity of
                        your model alongside the R-squared value.
                      </p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <h3 className="text-lg font-medium mb-2 text-purple-700">Handling Outliers</h3>
                      <p>
                        Outliers can significantly affect curve fitting. Consider whether outliers represent measurement
                        errors (which should be removed) or important phenomena (which should be kept). Robust fitting
                        methods can help reduce the influence of outliers.
                      </p>
                    </div>

                    <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                      <h3 className="text-lg font-medium mb-2 text-amber-700">Data Visualization</h3>
                      <p>
                        Always visualize your data and the fitted curve. Visual inspection can reveal patterns that
                        statistics might miss, such as clusters, non-uniform residuals, or the need for data
                        transformation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  )
}
