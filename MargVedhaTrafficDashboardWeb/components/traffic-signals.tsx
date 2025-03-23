"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapView } from "@/components/map-view"

export function TrafficSignals() {
  const [signalData, setSignalData] = useState([
    {
      id: 1,
      signalId: "TS_001",
      location: "Intersection A",
      currentPhase: "Green",
      phaseDuration: 45,
      adjustedByAI: true,
      timestamp: "2025-03-23 14:40:00",
      timeRemaining: 25,
    },
    {
      id: 2,
      signalId: "TS_002",
      location: "Intersection B",
      currentPhase: "Red",
      phaseDuration: 30,
      adjustedByAI: true,
      timestamp: "2025-03-23 14:40:00",
      timeRemaining: 15,
    },
    {
      id: 3,
      signalId: "TS_003",
      location: "Intersection C",
      currentPhase: "Yellow",
      phaseDuration: 5,
      adjustedByAI: false,
      timestamp: "2025-03-23 14:40:00",
      timeRemaining: 2,
    },
    {
      id: 4,
      signalId: "TS_004",
      location: "Intersection D",
      currentPhase: "Red",
      phaseDuration: 40,
      adjustedByAI: true,
      timestamp: "2025-03-23 14:40:00",
      timeRemaining: 30,
    },
    {
      id: 5,
      signalId: "TS_005",
      location: "Intersection E",
      currentPhase: "Green",
      phaseDuration: 35,
      adjustedByAI: true,
      timestamp: "2025-03-23 14:40:00",
      timeRemaining: 20,
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate signal phase changes
      setSignalData((prev) =>
        prev.map((signal) => {
          let timeRemaining = signal.timeRemaining - 1
          let currentPhase = signal.currentPhase
          let phaseDuration = signal.phaseDuration

          // If time is up, change the phase
          if (timeRemaining <= 0) {
            if (currentPhase === "Green") {
              currentPhase = "Yellow"
              phaseDuration = 5
              timeRemaining = 5
            } else if (currentPhase === "Yellow") {
              currentPhase = "Red"
              phaseDuration = Math.floor(Math.random() * 20) + 25
              timeRemaining = phaseDuration
            } else if (currentPhase === "Red") {
              currentPhase = "Green"

              // AI might adjust the green phase duration based on traffic
              if (signal.adjustedByAI && Math.random() > 0.5) {
                phaseDuration = Math.floor(Math.random() * 20) + 30
              } else {
                phaseDuration = 35
              }

              timeRemaining = phaseDuration
            }
          }

          return {
            ...signal,
            currentPhase,
            phaseDuration,
            timeRemaining,
            timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
          }
        }),
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const getPhaseColor = (phase) => {
    switch (phase) {
      case "Green":
        return "bg-green-500 text-white"
      case "Yellow":
        return "bg-yellow-500"
      case "Red":
        return "bg-red-500 text-white"
      default:
        return "bg-blue-500 text-white"
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Traffic Signals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{signalData.length}</div>
            <p className="text-xs text-muted-foreground">
              {signalData.filter((s) => s.adjustedByAI).length} AI-optimized
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Current Signal Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="flex flex-col items-center">
                <Badge className="bg-green-500 text-white mb-1">Green</Badge>
                <span className="text-xl font-bold">{signalData.filter((s) => s.currentPhase === "Green").length}</span>
              </div>
              <div className="flex flex-col items-center">
                <Badge className="bg-yellow-500 mb-1">Yellow</Badge>
                <span className="text-xl font-bold">
                  {signalData.filter((s) => s.currentPhase === "Yellow").length}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <Badge className="bg-red-500 text-white mb-1">Red</Badge>
                <span className="text-xl font-bold">{signalData.filter((s) => s.currentPhase === "Red").length}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Green Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                signalData
                  .filter((s) => s.currentPhase === "Green")
                  .reduce((acc, item) => acc + item.phaseDuration, 0) /
                  Math.max(1, signalData.filter((s) => s.currentPhase === "Green").length),
              )}{" "}
              sec
            </div>
            <p className="text-xs text-muted-foreground">Optimized for current traffic conditions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">AI Optimization</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round((signalData.filter((s) => s.adjustedByAI).length / signalData.length) * 100)}%
            </div>
            <p className="text-xs text-muted-foreground">Of signals using AI optimization</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Signal Status</TabsTrigger>
          <TabsTrigger value="map">Signal Map</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Signal Status</CardTitle>
              <CardDescription>Real-time status of all traffic signals</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Signal ID</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Phase</TableHead>
                    <TableHead>Time Remaining</TableHead>
                    <TableHead>AI Adjusted</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {signalData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.signalId}</TableCell>
                      <TableCell>{item.location}</TableCell>
                      <TableCell>
                        <Badge className={getPhaseColor(item.currentPhase)}>{item.currentPhase}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={(item.timeRemaining / item.phaseDuration) * 100} className="h-2" />
                          <span className="text-sm">{item.timeRemaining}s</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {item.adjustedByAI ? (
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            Yes
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-muted text-muted-foreground">
                            No
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="map">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Signal Map</CardTitle>
              <CardDescription>Geographic view of all traffic signals</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <MapView signalData={signalData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

