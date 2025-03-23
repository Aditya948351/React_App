"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapView } from "@/components/map-view"
import { AlertTriangle, CheckCircle, Clock } from "lucide-react"

export function IncidentReporting() {
  const [incidentData, setIncidentData] = useState([
    {
      id: 1,
      cameraId: "",
      location: "Highway 1",
      incidentType: "Accident",
      severity: "High",
      capturedImage: "image2.jpg",
      resolvedStatus: false,
      timestamp: "2025-03-23 14:45:00",
      description: "Multi-vehicle collision, emergency services dispatched",
    },
    {
      id: 2,
      cameraId: "CAM_103",
      location: "Downtown Junction",
      incidentType: "Roadblock",
      severity: "Medium",
      capturedImage: "image3.jpg",
      resolvedStatus: false,
      timestamp: "2025-03-23 14:50:00",
      description: "Construction causing lane closure, traffic diverted",
    },
    {
      id: 3,
      cameraId: "CAM2",
      location: "Amrutdham",
      incidentType: "Stalled Vehicle",
      severity: "Low",
      capturedImage: "image4.jpg",
      resolvedStatus: true,
      timestamp: "2025-03-23 14:30:00",
      description: "Vehicle moved to shoulder, minimal traffic impact",
    },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate incident resolution or new incidents
      if (Math.random() > 0.8) {
        // Either resolve an existing incident or add a new one
        if (incidentData.filter((i) => !i.resolvedStatus).length > 0 && Math.random() > 0.5) {
          // Resolve a random unresolved incident
          setIncidentData((prev) =>
            prev.map((incident) => {
              if (!incident.resolvedStatus && Math.random() > 0.5) {
                return { ...incident, resolvedStatus: true }
              }
              return incident
            }),
          )
        } else {
          // Add a new incident
          const incidentTypes = ["Accident", "Roadblock", "Stalled Vehicle", "Debris on Road", "Flooding"]
          const locations = ["Main Street", "Highway 1", "Downtown Junction", "East Avenue", "West Bridge"]
          const severities = ["High", "Medium", "Low"]
          const cameraIds = ["CAM_101", "CAM_102", "CAM_103", "CAM_104", "CAM_105"]

          const newIncident = {
            id: Math.max(...incidentData.map((i) => i.id)) + 1,
            cameraId: cameraIds[Math.floor(Math.random() * cameraIds.length)],
            location: locations[Math.floor(Math.random() * locations.length)],
            incidentType: incidentTypes[Math.floor(Math.random() * incidentTypes.length)],
            severity: severities[Math.floor(Math.random() * severities.length)],
            capturedImage: `image${Math.floor(Math.random() * 5) + 1}.jpg`,
            resolvedStatus: false,
            timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
            description: "Incident detected by AI, details pending",
          }

          setIncidentData((prev) => [newIncident, ...prev])
        }
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [incidentData])

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "High":
        return "bg-red-500 text-white"
      case "Medium":
        return "bg-orange-500 text-white"
      case "Low":
        return "bg-yellow-500"
      default:
        return "bg-blue-500 text-white"
    }
  }

  const getIncidentTypeColor = (type) => {
    switch (type) {
      case "Accident":
        return "bg-red-500 text-white"
      case "Roadblock":
        return "bg-orange-500 text-white"
      case "Stalled Vehicle":
        return "bg-yellow-500"
      case "Debris on Road":
        return "bg-blue-500 text-white"
      case "Flooding":
        return "bg-purple-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const handleResolveIncident = (id) => {
    setIncidentData((prev) =>
      prev.map((incident) => (incident.id === id ? { ...incident, resolvedStatus: true } : incident)),
    )
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Incidents</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{incidentData.filter((i) => !i.resolvedStatus).length}</div>
            <p className="text-xs text-muted-foreground">
              {incidentData.filter((i) => !i.resolvedStatus && i.severity === "High").length} high severity
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved Today</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{incidentData.filter((i) => i.resolvedStatus).length}</div>
            <p className="text-xs text-muted-foreground">Average resolution time: 45 min</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Recent</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-md font-bold">
              {incidentData.length > 0
                ? incidentData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0]
                    .incidentType
                : "None"}
            </div>
            <p className="text-xs text-muted-foreground">
              {incidentData.length > 0
                ? incidentData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0]
                    .location
                : ""}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incident Types</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1">
              {Array.from(new Set(incidentData.map((item) => item.incidentType))).map((type) => (
                <Badge key={type} className={getIncidentTypeColor(type)}>
                  {type}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active">
        <TabsList>
          <TabsTrigger value="active">Active Incidents</TabsTrigger>
          <TabsTrigger value="resolved">Resolved Incidents</TabsTrigger>
          <TabsTrigger value="map">Incident Map</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Incidents</CardTitle>
              <CardDescription>Incidents requiring attention</CardDescription>
            </CardHeader>
            <CardContent>
              {incidentData.filter((i) => !i.resolvedStatus).length === 0 ? (
                <div className="text-center py-6">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
                  <h3 className="text-lg font-medium">No Active Incidents</h3>
                  <p className="text-muted-foreground">All incidents have been resolved</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Time</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {incidentData
                      .filter((i) => !i.resolvedStatus)
                      .map((item) => (
                        <TableRow key={item.id}>
                          <TableCell className="font-medium">{item.timestamp.split(" ")[1]}</TableCell>
                          <TableCell>{item.location}</TableCell>
                          <TableCell>
                            <Badge className={getIncidentTypeColor(item.incidentType)}>{item.incidentType}</Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={getSeverityColor(item.severity)}>{item.severity}</Badge>
                          </TableCell>
                          <TableCell>
                            <Button variant="outline" size="sm" onClick={() => handleResolveIncident(item.id)}>
                              Mark Resolved
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved">
          <Card>
            <CardHeader>
              <CardTitle>Resolved Incidents</CardTitle>
              <CardDescription>Recently resolved incidents</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Time</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Severity</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {incidentData
                    .filter((i) => i.resolvedStatus)
                    .map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.timestamp.split(" ")[1]}</TableCell>
                        <TableCell>{item.location}</TableCell>
                        <TableCell>
                          <Badge className={getIncidentTypeColor(item.incidentType)}>{item.incidentType}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getSeverityColor(item.severity)}>{item.severity}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-green-500/10 text-green-500">
                            Resolved
                          </Badge>
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
              <CardTitle>Incident Map</CardTitle>
              <CardDescription>Geographic view of all incidents</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <MapView incidentData={incidentData} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

