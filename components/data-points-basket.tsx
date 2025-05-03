"use client"

import { useDrag } from "react-dnd"

interface DataPointsBasketProps {
  onAddPoint: (x: number, y: number) => void
}

export default function DataPointsBasket({ onAddPoint }: DataPointsBasketProps) {
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "dataPoint",
      item: { isNew: true },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const dropResult = monitor.getDropResult<{ x: number; y: number }>()
        if (item && dropResult) {
          onAddPoint(dropResult.x, dropResult.y)
        }
      },
    }),
    [onAddPoint],
  )

  return (
    <div className="bg-orange-50 rounded-lg p-4 shadow-md">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
        <span className="inline-block w-4 h-4 bg-orange-400 rounded-full mr-2"></span>
        Data Points
      </h3>
      <div className="flex flex-col items-center">
        <div
          ref={drag}
          className={`w-32 h-32 relative cursor-grab transition-transform ${isDragging ? "scale-95 opacity-70" : "hover:scale-105"}`}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-gray-600 rounded-b-full rounded-t-[10%] overflow-hidden flex items-start justify-center transform rotate-180 shadow-lg">
              <div className="w-full h-full relative overflow-hidden">
                <div className="absolute inset-0 flex flex-wrap content-start justify-center pt-1">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="w-3 h-3 rounded-full bg-orange-400 border border-orange-600 m-0.5 shadow-sm"
                      style={{
                        transform: `translateY(${Math.random() * 5}px)`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Drag a point to the graph
          <br />
          or click on the graph
        </p>
      </div>
    </div>
  )
}
