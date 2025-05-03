"use client"

import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ControlPanelProps {
  selectedDegree: number
  onChangeDegree: (degree: number) => void
  onClearPoints: () => void
}

export default function ControlPanel({ selectedDegree, onChangeDegree, onClearPoints }: ControlPanelProps) {
  return (
    <div className="bg-orange-50 rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Controls</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Polynomial Degree</label>
          <Select value={selectedDegree.toString()} onValueChange={(value) => onChangeDegree(Number.parseInt(value))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select degree" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Linear (1)</SelectItem>
              <SelectItem value="2">Quadratic (2)</SelectItem>
              <SelectItem value="3">Cubic (3)</SelectItem>
              <SelectItem value="4">Quartic (4)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="destructive" onClick={onClearPoints} className="w-full">
          Clear All Points
        </Button>
      </div>
    </div>
  )
}
