"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AlertTriangle, Car, Clock } from "lucide-react"

export function VehicleViolations() {
  const [violationData, setViolationData] = useState([
    {
      id: 1,
      trafficId: 1,
      vehicleType: "Car",
      speed: 60,
      licensePlate: "MH12AB1234",
      ruleViolation: "Over-speeding",
      capturedImage: "image1.jpg",
      timestamp: "2025-03-23 14:35:00",
    },
    {
      id: 2,
      trafficId: 1,
      vehicleType: "Truck",
      speed: 45,
      licensePlate: "MH04CD5678",
      ruleViolation: "Lane violation",
      capturedImage: "image2.jpg",
      timestamp: "2025-03-23 14:40:00",
    },
    {
      id: 3,
      trafficId: 2,
      vehicleType: "Motorcycle",
      speed: 70,
      licensePlate: "MH02EF9012",
      ruleViolation: "Over-speeding",
      capturedImage: "image3.jpg",
      timestamp: "2025-03-23 14:42:00",
    },
    {
      id: 4,
      trafficId: 3,
      vehicleType: "Car",
      speed: 30,
      licensePlate: "MH01GH3456",
      ruleViolation: "Red light violation",
      capturedImage: "image4.jpg",
      timestamp: "2025-03-23 14:45:00",
    },
    {
      id: 5,
      trafficId: 2,
      vehicleType: "Bus",
      speed: 50,
      licensePlate: "MH11IJ7890",
      ruleViolation: "Lane violation",
      capturedImage: "image5.jpg",
      timestamp: "2025-03-23 14:50:00",
    },
  ])

  const [chartData, setChartData] = useState([
    { violation: "Over-speeding", count: 2 },
    { violation: "Lane violation", count: 2 },
    { violation: "Red light", count: 1 },
    { violation: "Wrong way", count: 0 },
    { violation: "No helmet", count: 0 },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new violation detection
      if (Math.random() > 0.7) {
        const violations = ["Over-speeding", "Lane violation", "Red light violation", "Wrong way driving", "No helmet"]
        const vehicleTypes = ["Car", "Truck", "Motorcycle", "Bus", "Auto-rickshaw"]

        const newViolation = {
          id: violationData.length + 1,
          trafficId: Math.floor(Math.random() * 3) + 1,
          vehicleType: vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)],
          speed: Math.floor(Math.random() * 50) + 30,
          licensePlate: `MH${String(Math.floor(Math.random() * 20) + 1).padStart(2, "0")}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(
            Math.random() * 10000,
          )
            .toString()
            .padStart(4, "0")}`,
          ruleViolation: violations[Math.floor(Math.random() * violations.length)],
          capturedImage: `image${Math.floor(Math.random() * 10) + 1}.jpg`,
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
        }

        setViolationData((prev) => [newViolation, ...prev].slice(0, 10))

        // Update chart data
        setChartData((prev) => {
          const newData = [...prev]
          const violationIndex = newData.findIndex(
            (item) => item.violation === newViolation.ruleViolation.replace(" violation", ""),
          )

          if (violationIndex >= 0) {
            newData[violationIndex].count += 1
          }

          return newData
        })
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [violationData])

  const getViolationColor = (violation) => {
    if (violation.includes("Over-speeding")) return "bg-red-500 text-white"
    if (violation.includes("Lane")) return "bg-orange-500 text-white"
    if (violation.includes("Red light")) return "bg-purple-500 text-white"
    if (violation.includes("Wrong way")) return "bg-rose-500 text-white"
    return "bg-blue-500 text-white"
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Violations</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{chartData.reduce((acc, item) => acc + item.count, 0)}</div>
            <p className="text-xs text-muted-foreground">
              +{violationData.filter((v) => new Date(v.timestamp) > new Date(Date.now() - 3600000)).length} in the last
              hour
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Common</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{chartData.sort((a, b) => b.count - a.count)[0].violation}</div>
            <p className="text-xs text-muted-foreground">
              {chartData.sort((a, b) => b.count - a.count)[0].count} incidents detected
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Speed</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(violationData.reduce((acc, item) => acc + item.speed, 0) / violationData.length)} km/h
            </div>
            <p className="text-xs text-muted-foreground">For violation incidents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vehicle Types</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {Array.from(new Set(violationData.map((item) => item.vehicleType))).map((type) => (
                <Badge key={type} variant="outline" className="text-xs">
                  {type}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="list">
        <TabsList>
          <TabsTrigger value="list">Violation List</TabsTrigger>
          <TabsTrigger value="stats">Violation Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Recent Traffic Violations</CardTitle>
              <CardDescription>Detected by AI-powered traffic monitoring system</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>License</TableHead>
                    <TableHead>Speed</TableHead>
                    <TableHead>Violation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {violationData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.timestamp.split(" ")[1]}</TableCell>
                      <TableCell>{item.vehicleType}</TableCell>
                      <TableCell>{item.licensePlate}</TableCell>
                      <TableCell>{item.speed} km/h</TableCell>
                      <TableCell>
                        <Badge className={getViolationColor(item.ruleViolation)}>{item.ruleViolation}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats">
          <Card>
            <CardHeader>
              <CardTitle>Violation Distribution</CardTitle>
              <CardDescription>Breakdown by violation type</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  count: {
                    label: "Violations",
                    color: "hsl(var(--primary))",
                  },
                }}
                className="h-[300px]"
              >
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 24 }}>
                  <XAxis dataKey="violation" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                  <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

