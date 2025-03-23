"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Car, TrafficCone } from "lucide-react"

export function MapView({ trafficData = [], signalData = [], incidentData = [] }) {
  const [showLabels, setShowLabels] = useState(true)

  // This is a placeholder for a real map implementation
  // In a real application, you would use a mapping library like Mapbox, Google Maps, or Leaflet

  const getCongestionColor = (level) => {
    if (!level) return "bg-gray-200"
    switch (level) {
      case "Very High":
        return "bg-red-500"
      case "High":
        return "bg-orange-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-green-500"
      default:
        return "bg-blue-500"
    }
  }

  const getPhaseColor = (phase) => {
    if (!phase) return "bg-gray-200"
    switch (phase) {
      case "Green":
        return "bg-green-500"
      case "Yellow":
        return "bg-yellow-500"
      case "Red":
        return "bg-red-500"
      default:
        return "bg-blue-500"
    }
  }

  const getSeverityColor = (severity) => {
    if (!severity) return "bg-gray-200"
    switch (severity) {
      case "High":
        return "bg-red-500"
      case "Medium":
        return "bg-orange-500"
      case "Low":
        return "bg-yellow-500"
      default:
        return "bg-blue-500"
    }
  }

  return (
    <div className="relative w-full h-[400px] bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden">
      {/* Placeholder for map background */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=800')] bg-cover bg-center opacity-30"></div>

      {/* Map grid lines */}
      <div className="absolute inset-0 grid grid-cols-8 grid-rows-6">
        {Array.from({ length: 48 }).map((_, i) => (
          <div key={i} className="border border-gray-300/20"></div>
        ))}
      </div>

      {/* Traffic cameras */}
      {trafficData.map((item, index) => (
        <div
          key={`traffic-${index}`}
          className="absolute flex flex-col items-center"
          style={{
            left: `${10 + index * 20}%`,
            top: `${20 + index * 10}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className={`w-6 h-6 rounded-full ${getCongestionColor(item.congestionLevel)} flex items-center justify-center text-white text-xs font-bold`}
          >
            <Car className="h-3 w-3" />
          </div>
          {showLabels && (
            <div className="mt-1 px-2 py-0.5 bg-background/80 backdrop-blur-sm rounded text-xs whitespace-nowrap">
              {item.location}
            </div>
          )}
        </div>
      ))}

      {/* Traffic signals */}
      {signalData.map((item, index) => (
        <div
          key={`signal-${index}`}
          className="absolute flex flex-col items-center"
          style={{
            left: `${15 + index * 18}%`,
            top: `${40 + index * 8}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className={`w-6 h-6 rounded-full ${getPhaseColor(item.currentPhase)} flex items-center justify-center text-white text-xs font-bold`}
          >
            <TrafficCone className="h-3 w-3" />
          </div>
          {showLabels && (
            <div className="mt-1 px-2 py-0.5 bg-background/80 backdrop-blur-sm rounded text-xs whitespace-nowrap">
              {item.location}
            </div>
          )}
        </div>
      ))}

      {/* Incidents */}
      {incidentData.map((item, index) => (
        <div
          key={`incident-${index}`}
          className="absolute flex flex-col items-center"
          style={{
            left: `${25 + index * 15}%`,
            top: `${30 + index * 12}%`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className={`w-8 h-8 rounded-full ${getSeverityColor(item.severity)} flex items-center justify-center text-white text-xs font-bold ${!item.resolvedStatus ? "animate-pulse" : ""}`}
          >
            <AlertTriangle className="h-4 w-4" />
          </div>
          {showLabels && (
            <div className="mt-1 px-2 py-0.5 bg-background/80 backdrop-blur-sm rounded text-xs whitespace-nowrap">
              {item.incidentType} - {item.location}
            </div>
          )}
        </div>
      ))}

      {/* Map legend */}
      <div className="absolute bottom-2 left-2 p-2 bg-background/80 backdrop-blur-sm rounded-md text-xs">
        <div className="font-bold mb-1">Map Legend</div>
        <div className="flex items-center gap-2 mb-1">
          <Car className="h-3 w-3" /> Traffic Cameras
        </div>
        <div className="flex items-center gap-2 mb-1">
          <TrafficCone className="h-3 w-3" /> Traffic Signals
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-3 w-3" /> Incidents
        </div>
      </div>

      {/* Map controls */}
      <div className="absolute top-2 right-2 flex gap-1">
        <Badge
          variant="outline"
          className="cursor-pointer bg-background/80 backdrop-blur-sm"
          onClick={() => setShowLabels(!showLabels)}
        >
          {showLabels ? "Hide Labels" : "Show Labels"}
        </Badge>
      </div>

      {/* City areas */}
      <div className="absolute left-[20%] top-[15%] text-xs text-muted-foreground">Downtown</div>
      <div className="absolute left-[70%] top-[25%] text-xs text-muted-foreground">East Side</div>
      <div className="absolute left-[30%] top-[60%] text-xs text-muted-foreground">West Bridge</div>
      <div className="absolute left-[60%] top-[70%] text-xs text-muted-foreground">Highway 1</div>
      <div className="absolute left-[10%] top-[40%] text-xs text-muted-foreground">Main Street</div>
    </div>
  )
}

