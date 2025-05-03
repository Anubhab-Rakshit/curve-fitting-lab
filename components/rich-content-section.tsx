"use client"

import EducationalContent from "./educational-content"
import DiscussionForum from "./discussion-forum"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Lightbulb, ArrowRight } from "lucide-react"

export default function RichContentSection() {
  return (
    <div className="mt-8 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="bg-gradient-to-r from-orange-100 to-amber-100">
            <CardTitle className="flex items-center">
              <Lightbulb className="mr-2 h-5 w-5 text-amber-500" />
              Did You Know?
            </CardTitle>
            <CardDescription>Interesting facts about curve fitting</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3">
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 mr-2 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  The method of least squares was independently developed by Carl Friedrich Gauss and Adrien-Marie
                  Legendre in the early 19th century.
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 mr-2 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  Polynomial regression is a special case of multiple linear regression, where the variables are powers
                  of a single variable.
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 mr-2 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  The famous "hockey stick" graph showing global temperature changes over time is an example of curve
                  fitting applied to climate data.
                </span>
              </li>
              <li className="flex items-start">
                <ArrowRight className="h-5 w-5 mr-2 text-amber-500 shrink-0 mt-0.5" />
                <span>
                  Overfitting occurs when a model fits the existing data too closely but fails to predict future
                  observations reliably.
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100">
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5 text-blue-500" />
              Further Reading
            </CardTitle>
            <CardDescription>Resources to deepen your understanding</CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="space-y-3">
              <li className="border-b pb-2">
                <a href="#" className="text-blue-600 hover:underline font-medium">
                  "Numerical Methods for Least Squares Problems" by Åke Björck
                </a>
                <p className="text-sm text-gray-600 mt-1">
                  A comprehensive reference on computational aspects of least squares methods.
                </p>
              </li>
              <li className="border-b pb-2">
                <a href="#" className="text-blue-600 hover:underline font-medium">
                  "Introduction to Linear Regression Analysis" by Montgomery, Peck, and Vining
                </a>
                <p className="text-sm text-gray-600 mt-1">
                  Covers the theoretical foundations and practical applications of regression analysis.
                </p>
              </li>
              <li>
                <a href="#" className="text-blue-600 hover:underline font-medium">
                  "Data Analysis: A Bayesian Tutorial" by Sivia and Skilling
                </a>
                <p className="text-sm text-gray-600 mt-1">
                  Introduces Bayesian approaches to curve fitting and parameter estimation.
                </p>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <EducationalContent />
      <DiscussionForum />
    </div>
  )
}
