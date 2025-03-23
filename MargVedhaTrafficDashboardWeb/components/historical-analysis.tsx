"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function HistoricalAnalysis() {
  const dailyData = [
    { date: "Mar 17", vehicleCount: 5200, congestion: 65, incidents: 4 },
    { date: "Mar 18", vehicleCount: 5500, congestion: 70, incidents: 5 },
    { date: "Mar 19", vehicleCount: 5300, congestion: 68, incidents: 3 },
    { date: "Mar 20", vehicleCount: 5100, congestion: 62, incidents: 2 },
    { date: "Mar 21", vehicleCount: 4800, congestion: 55, incidents: 1 },
    { date: "Mar 22", vehicleCount: 5000, congestion: 60, incidents: 3 },
    { date: "Todays data", vehicleCount: 5200, congestion: 45, incidents: 2 },
  ]

  const hourlyData = [
    { hour: "00:00", vehicleCount: 120, congestion: 20 },
    { hour: "02:00", vehicleCount: 80, congestion: 15 },
    { hour: "04:00", vehicleCount: 60, congestion: 10 },
    { hour: "06:00", vehicleCount: 180, congestion: 30 },
    { hour: "08:00", vehicleCount: 350, congestion: 75 },
    { hour: "10:00", vehicleCount: 280, congestion: 60 },
    { hour: "12:00", vehicleCount: 320, congestion: 65 },
    { hour: "14:00", vehicleCount: 290, congestion: 62 },
    { hour: "16:00", vehicleCount: 380, congestion: 80 },
    { hour: "18:00", vehicleCount: 400, congestion: 85 },
    { hour: "20:00", vehicleCount: 250, congestion: 55 },
    { hour: "22:00", vehicleCount: 180, congestion: 40 },
  ]

  const locationData = [
    { location: "Main Street", vehicleCount: 250, congestion: 80 },
    { location: "Highway 1", vehicleCount: 180, congestion: 65 },
    { location: "Downtown", vehicleCount: 320, congestion: 90 },
    { location: "East Avenue", vehicleCount: 120, congestion: 40 },
    { location: "West Bridge", vehicleCount: 210, congestion: 75 },
  ]

  const weatherData = [
    { condition: "Clear", avgCongestion: 65, incidents: 2 },
    { condition: "Cloudy", avgCongestion: 70, incidents: 3 },
    { condition: "Rain", avgCongestion: 85, incidents: 7 },
    { condition: "Fog", avgCongestion: 80, incidents: 5 },
    { condition: "Snow", avgCongestion: 90, incidents: 9 },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Historical Traffic Analysis</h2>
        <div className="flex items-center gap-2">
          <Select defaultValue="7days">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24hours">Last 24 Hours</SelectItem>
              <SelectItem value="7days">Last 7 Days</SelectItem>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="trends">
        <TabsList>
          <TabsTrigger value="trends">Traffic Trends</TabsTrigger>
          <TabsTrigger value="hourly">Hourly Patterns</TabsTrigger>
          <TabsTrigger value="location">Location Analysis</TabsTrigger>
          <TabsTrigger value="weather">Weather Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="trends">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Daily Traffic Volume</CardTitle>
                <CardDescription>Total vehicle count per day</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    vehicleCount: {
                      label: "Vehicles",
                      color: "hsl(var(--primary))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <AreaChart data={dailyData} margin={{ top: 10, right: 10, left: 10, bottom: 24 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <Area
                      type="monotone"
                      dataKey="vehicleCount"
                      stroke="hsl(var(--primary))"
                      fill="hsl(var(--primary))"
                      fillOpacity={0.2}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Congestion Levels</CardTitle>
                <CardDescription>Average congestion percentage per day</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    congestion: {
                      label: "Congestion %",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <LineChart data={dailyData} margin={{ top: 10, right: 10, left: 10, bottom: 24 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <Line
                      type="monotone"
                      dataKey="congestion"
                      stroke="hsl(var(--chart-2))"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Traffic Incidents</CardTitle>
                <CardDescription>Number of incidents detected per day</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    incidents: {
                      label: "Incidents",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <BarChart data={dailyData} margin={{ top: 10, right: 10, left: 10, bottom: 24 }}>
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} />
                    <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                    <Bar dataKey="incidents" fill="hsl(var(--chart-3))" radius={4} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hourly">
          <Card>
            <CardHeader>
              <CardTitle>Hourly Traffic Patterns</CardTitle>
              <CardDescription>Traffic volume and congestion by hour of day</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  vehicleCount: {
                    label: "Vehicles",
                    color: "hsl(var(--primary))",
                  },
                  congestion: {
                    label: "Congestion %",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[400px]"
              >
                <LineChart data={hourlyData} margin={{ top: 10, right: 10, left: 10, bottom: 24 }}>
                  <CartesianGrid vertical={false} strokeDasharray="3 3" />
                  <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis yAxisId="left" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} tickMargin={8} />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="vehicleCount"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="congestion"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </LineChart>
              </ChartContainer>

              <div className="mt-4 text-sm text-muted-foreground">
                <p>Key Insights:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Peak morning traffic occurs between 8:00-9:00 AM</li>
                  <li>Peak evening traffic occurs between 5:00-6:00 PM</li>
                  <li>Lowest traffic volume is between 2:00-4:00 AM</li>
                  <li>Congestion levels closely follow traffic volume patterns</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location">
          <Card>
            <CardHeader>
              <CardTitle>Traffic by Location</CardTitle>
              <CardDescription>Comparison of traffic metrics across different locations</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  vehicleCount: {
                    label: "Vehicles",
                    color: "hsl(var(--primary))",
                  },
                  congestion: {
                    label: "Congestion %",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[400px]"
              >
                <BarChart data={locationData} margin={{ top: 10, right: 10, left: 10, bottom: 24 }} layout="vertical">
                  <CartesianGrid horizontal={true} vertical={false} />
                  <XAxis type="number" />
                  <YAxis dataKey="location" type="category" tickLine={false} axisLine={false} />
                  <Bar dataKey="vehicleCount" fill="hsl(var(--primary))" name="Vehicle Count" radius={4} />
                  <Bar dataKey="congestion" fill="hsl(var(--chart-2))" name="Congestion %" radius={4} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ChartContainer>

              <div className="mt-4 text-sm text-muted-foreground">
                <p>Key Insights:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Downtown has the highest traffic volume and congestion</li>
                  <li>East Avenue has the lowest traffic volume and congestion</li>
                  <li>Main Street and West Bridge have similar congestion levels despite different vehicle counts</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weather">
          <Card>
            <CardHeader>
              <CardTitle>Weather Impact Analysis</CardTitle>
              <CardDescription>How different weather conditions affect traffic</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  avgCongestion: {
                    label: "Avg. Congestion %",
                    color: "hsl(var(--chart-2))",
                  },
                  incidents: {
                    label: "Avg. Incidents",
                    color: "hsl(var(--chart-3))",
                  },
                }}
                className="h-[400px]"
              >
                <BarChart data={weatherData} margin={{ top: 10, right: 10, left: 10, bottom: 24 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="condition" tickLine={false} axisLine={false} />
                  <YAxis yAxisId="left" tickLine={false} axisLine={false} />
                  <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} />
                  <Bar
                    yAxisId="left"
                    dataKey="avgCongestion"
                    fill="hsl(var(--chart-2))"
                    name="Avg. Congestion %"
                    radius={4}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="incidents"
                    fill="hsl(var(--chart-3))"
                    name="Avg. Incidents"
                    radius={4}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                </BarChart>
              </ChartContainer>

              <div className="mt-4 text-sm text-muted-foreground">
                <p>Key Insights:</p>
                <ul className="list-disc pl-5 mt-2 space-y-1">
                  <li>Snow conditions lead to highest congestion and incident rates</li>
                  <li>Clear weather has the lowest congestion and incident rates</li>
                  <li>Rain increases incidents by 250% compared to clear weather</li>
                  <li>Fog reduces visibility leading to slower traffic and more incidents</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

