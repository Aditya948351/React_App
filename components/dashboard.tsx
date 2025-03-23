"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrafficMonitoring } from "@/components/traffic-monitoring"
import { VehicleViolations } from "@/components/vehicle-violations"
import { TrafficSignals } from "@/components/traffic-signals"
import { IncidentReporting } from "@/components/incident-reporting"
import { HistoricalAnalysis } from "@/components/historical-analysis"
import { SystemOverview } from "@/components/system-overview"
import { MapView } from "@/components/map-view"
import { Button } from "@/components/ui/button"
import { PresentationIcon } from "lucide-react"

export default function Dashboard() {
  const [presentationMode, setPresentationMode] = useState(false)

  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Real-Time Traffic Optimization System</h1>
          <p className="text-muted-foreground">AI-powered traffic management for smart cities</p>
        </div>
        <Button
          onClick={() => setPresentationMode(!presentationMode)}
          variant={presentationMode ? "default" : "outline"}
        >
          <PresentationIcon className="mr-2 h-4 w-4" />
          {presentationMode ? "Exit Presentation" : "Presentation Mode"}
        </Button>
      </div>

      {presentationMode ? (
        <SystemOverview />
      ) : (
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid grid-cols-6 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="monitoring">Traffic Monitoring</TabsTrigger>
            <TabsTrigger value="violations">Vehicle Violations</TabsTrigger>
            <TabsTrigger value="signals">Traffic Signals</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="analysis">Historical Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Cameras</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">Across 8 major intersections</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Signals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">16</div>
                  <p className="text-xs text-muted-foreground">12 AI-optimized</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Incidents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">1 high severity</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Traffic Reduction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24%</div>
                  <p className="text-xs text-muted-foreground">Compared to last month</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Traffic Map</CardTitle>
                  <CardDescription>Real-time traffic density across the city</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <MapView />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>System Overview</CardTitle>
                  <CardDescription>How our AI optimizes traffic flow</CardDescription>
                </CardHeader>
                <CardContent>
                  <SystemOverview compact={true} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-4">
            <TrafficMonitoring />
          </TabsContent>

          <TabsContent value="violations" className="space-y-4">
            <VehicleViolations />
          </TabsContent>

          <TabsContent value="signals" className="space-y-4">
            <TrafficSignals />
          </TabsContent>

          <TabsContent value="incidents" className="space-y-4">
            <IncidentReporting />
          </TabsContent>

          <TabsContent value="analysis" className="space-y-4">
            <HistoricalAnalysis />
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

