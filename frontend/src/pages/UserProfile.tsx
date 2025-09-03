"use client"

import { useState, useEffect } from "react"
import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  User,
  Mail,
  Calendar,
  MessageSquare,
  Activity,
  Edit,
  Save,
  X,
  BarChart3,
  Users,
  Plus,
  Trash2,
  Settings,
} from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Pie, PieChart, Cell } from "recharts"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"

interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: string
  lastLogin: string
}

interface Integration {
  id: string
  name: string
  type: "gmail" | "calendar" | "slack" | "group-communication"
  connected: boolean
  lastSync: string
  status: "active" | "error" | "syncing"
  groups?: Group[]
}

interface Group {
  id: string
  name: string
  emails: string[]
  createdAt: string
}

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [integrations, setIntegrations] = useState<Integration[]>([])
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupEmails, setNewGroupEmails] = useState("")
  const [showGroupManagement, setShowGroupManagement] = useState(false)

  // Mock data - replace with actual API calls to your backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace with actual API calls
        // const userResponse = await fetch('/api/user/profile')
        // const integrationsResponse = await fetch('/api/user/integrations')

        // Mock data for demonstration
        setUserProfile({
          id: "user_123",
          name: "Sarah Chen",
          email: "sarah.chen@company.com",
          avatar: "/placeholder.svg?height=80&width=80",
          createdAt: "2024-01-15",
          lastLogin: "2024-01-20T10:30:00Z",
        })

        setIntegrations([
          {
            id: "int_1",
            name: "Gmail",
            type: "gmail",
            connected: true,
            lastSync: "2 minutes ago",
            status: "active",
          },
          {
            id: "int_2",
            name: "Google Calendar",
            type: "calendar",
            connected: true,
            lastSync: "5 minutes ago",
            status: "active",
          },
          {
            id: "int_3",
            name: "Slack",
            type: "slack",
            connected: false,
            lastSync: "Never",
            status: "error",
          },
          {
            id: "int_4",
            name: "Group Communication",
            type: "group-communication",
            connected: true,
            lastSync: "1 minute ago",
            status: "active",
            groups: [
              {
                id: "grp_1",
                name: "Development Team",
                emails: ["dev1@company.com", "dev2@company.com", "dev3@company.com"],
                createdAt: "2024-01-10",
              },
              {
                id: "grp_2",
                name: "Design Team",
                emails: ["designer1@company.com", "designer2@company.com","dev1@company.com"],
                createdAt: "2024-01-12",
              },
              {
                id: "grp_3",
                name: "Hr Team",
                emails: ["hr1@company.com", "hr2@company.com","hr3@company.com"],
                createdAt: "2024-02-16",

              },
            ],
          },
        ])

        setLoading(false)
      } catch (error) {
        console.error("Error fetching user data:", error)
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleSaveProfile = async () => {
    try {
      // Replace with actual API call
      // await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(userProfile)
      // })
      setIsEditing(false)
    } catch (error) {
      console.error("Error saving profile:", error)
    }
  }

  const handleAddGroup = async () => {
    if (!newGroupName.trim() || !newGroupEmails.trim()) return

    const emailList = newGroupEmails
      .split(/[,\n]/)
      .map((email) => email.trim())
      .filter((email) => email && email.includes("@"))

    if (emailList.length === 0) return

    const newGroup: Group = {
      id: `grp_${Date.now()}`,
      name: newGroupName.trim(),
      emails: emailList,
      createdAt: new Date().toISOString(),
    }

    try {
      // Replace with actual API call
      // await fetch('/api/groups', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newGroup)
      // })

      setIntegrations((prev) =>
        prev.map((integration) =>
          integration.type === "group-communication"
            ? {
              ...integration,
              groups: [...(integration.groups || []), newGroup],
            }
            : integration,
        ),
      )

      setNewGroupName("")
      setNewGroupEmails("")
      setIsGroupDialogOpen(false)
    } catch (error) {
      console.error("Error adding group:", error)
    }
  }

  const handleDeleteGroup = async (groupId: string) => {
    try {
      // Replace with actual API call
      // await fetch(`/api/groups/${groupId}`, { method: 'DELETE' })

      setIntegrations((prev) =>
        prev.map((integration) =>
          integration.type === "group-communication"
            ? {
              ...integration,
              groups: integration.groups?.filter((group) => group.id !== groupId) || [],
            }
            : integration,
        ),
      )
    } catch (error) {
      console.error("Error deleting group:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "error":
        return "bg-red-500"
      case "syncing":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getIntegrationIcon = (type: string) => {
    switch (type) {
      case "gmail":
        return <Mail className="h-5 w-5" />
      case "calendar":
        return <Calendar className="h-5 w-5" />
      case "slack":
        return <MessageSquare className="h-5 w-5" />
      case "group-communication":
        return <Mail className="h-5 w-5" />
      default:
        return <Activity className="h-5 w-5" />
    }
  }

  // Data for charts - Updated to include Group Communication
  const connectedServicesData = [
    { name: "Gmail", value: 35, connected: true },
    { name: "Calendar", value: 25, connected: true },
    { name: "Slack", value: 20, connected: false },
    { name: "Group Communication", value: 20, connected: true },
  ]

  const performanceData = [
    { service: "Gmail", performance: 94 },
    { service: "Calendar", performance: 98 },
    { service: "Slack", performance: 0 },
    { service: "Group Communication", performance: 96 },
  ]

  const pieColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  const groupCommunicationIntegration = integrations.find((int) => int.type === "group-communication")

  const currentUserEmail = "dev1@company.com" // Replace with actual user email from auth context

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Unable to load profile data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto space-y-6 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mt-6">My Profile</h1>
            <p className="text-gray-600">Manage your account information and integrations</p>
          </div>
        </div>

        {/* User Info Card */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
              <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? (
                  <>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </>
                )}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-start gap-6">
              <Avatar className="h-20 w-20">
                <AvatarImage src={userProfile.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-lg">
                  {userProfile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                {isEditing ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={userProfile.name}
                        onChange={(e) => setUserProfile({ ...userProfile, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        value={userProfile.email}
                        onChange={(e) => setUserProfile({ ...userProfile, email: e.target.value })}
                      />
                    </div>
                    <div className="col-span-2 flex gap-2">
                      <Button size="sm" onClick={handleSaveProfile}>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{userProfile.name}</h3>
                    <p className="text-gray-600">{userProfile.email}</p>
                    <div className="flex gap-4 text-sm text-gray-500">
                      <span>Member since: {new Date(userProfile.createdAt).toLocaleDateString()}</span>
                      <span>Last login: {new Date(userProfile.lastLogin).toLocaleDateString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Integration Statistics Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">Integration Statistics</h2>
          </div>

          {/* Charts Section - Performance Left, Pie Chart Right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Service Performance Chart - LEFT SIDE */}
            <Card>
              <CardHeader>
                <CardTitle>Service Performance</CardTitle>
                <CardDescription>Overall performance of all services</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    performance: {
                      label: "Performance %",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="service" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar
                        dataKey="performance"
                        fill="var(--color-performance)"
                        name="Performance %"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Connected Services Pie Chart - RIGHT SIDE */}
            <Card>
              <CardHeader>
                <CardTitle>Connected Services</CardTitle>
                <CardDescription>Distribution of your connected integrations</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    gmail: {
                      label: "Gmail",
                      color: "hsl(var(--chart-1))",
                    },
                    calendar: {
                      label: "Calendar",
                      color: "hsl(var(--chart-2))",
                    },
                    slack: {
                      label: "Slack",
                      color: "hsl(var(--chart-3))",
                    },
                    groupCommunication: {
                      label: "Group Communication",
                      color: "hsl(var(--chart-4))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={connectedServicesData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {connectedServicesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Pie>
                      <ChartTooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="integrations" className="space-y-6">
          {/* <TabsList className="grid w-full grid-cols-1">
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
          </TabsList> */}

          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Connected Services</CardTitle>
                <CardDescription>Manage your API integrations for workflow automation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {integrations.map((integration) => (
                  <div key={integration.id} className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {getIntegrationIcon(integration.type)}
                        <div className="flex-1">
                          <h4 className="font-medium">{integration.name}</h4>
                          <p className="text-sm text-gray-500">Last sync: {integration.lastSync}</p>
                          {/* {integration.type === "group-communication" && integration.connected && (
                            <div className="mt-2">
                              <p className="text-sm text-blue-600">
                                {integration.groups?.length || 0} groups configured
                              </p>
                            </div>
                          )} */}
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-2 h-2 rounded-full ${getStatusColor(integration.status)}`}
                          />
                          <span className="text-sm capitalize">{integration.status}</span>
                        </div>

                        {/* Always show Connect / Disconnect */}
                        <Button
                          size="sm"
                          className={`bg-white border text-gray-800 
                             ${integration.status === "active"
                              ? "hover:bg-red-500 hover:text-white"   // Disconnect hover
                              : "hover:bg-green-500 hover:text-white" // Connect hover
                            }`}
                        >
                          {integration.status === "active" ? "Disconnect" : "Connect"}
                        </Button>


                        {/* Show Manage Groups only when active + group-communication */}
                        {integration.type === "group-communication" &&
                          integration.status === "active" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setShowGroupManagement(!showGroupManagement)}
                            >
                              {/* <Settings className="h-4 w-4 mr-2" /> */}
                              Show Groups
                            </Button>
                          )}
                      </div>
                    </div>

                    {/* Group Communication Management - Always show when connected */}
                    {integration.type === "group-communication" && integration.connected && showGroupManagement && (
                      <Card className="ml-8 border-l-4 border-l-blue-500">
                        <CardHeader>
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg flex items-center gap-2">
                              <Users className="h-5 w-5" />
                              Groups
                            </CardTitle>
                            <Dialog open={isGroupDialogOpen} onOpenChange={setIsGroupDialogOpen}>
                              {/* <DialogTrigger asChild>
                                <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                                  <Plus className="h-4 w-4 mr-2" />
                                  Add Group
                                </Button>
                              </DialogTrigger> */}
                              {/* <DialogContent className="sm:max-w-md">
                                <DialogHeader>
                                  <DialogTitle>Add New Group</DialogTitle>
                                  <DialogDescription>Create a new group for email communications</DialogDescription>
                                </DialogHeader>
                                <div className="space-y-6">
                                  <div className="space-y-2">
                                    <Label htmlFor="group-name">Group Name</Label>
                                    <Input
                                      id="group-name"
                                      placeholder="Enter group name"
                                      value={newGroupName}
                                      onChange={(e) => setNewGroupName(e.target.value)}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="group-emails">Email Addresses</Label>
                                    <Textarea
                                      id="group-emails"
                                      placeholder="Enter email addresses (comma or line separated)&#10;example@company.com, user@company.com"
                                      value={newGroupEmails}
                                      onChange={(e) => setNewGroupEmails(e.target.value)}
                                      className="min-h-[100px]"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                      Separate multiple emails with commas or new lines
                                    </p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button onClick={handleAddGroup} className="flex-1 bg-blue-600 hover:bg-blue-700 text-white">
                                      Add Group
                                    </Button>
                                    <Button
                                      variant="outline"
                                      onClick={() => setIsGroupDialogOpen(false)}
                                      className="flex-1 bg-red-500 text-white border-none hover:bg-red-600 hover:text-white"
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent> */}
                            </Dialog>
                          </div>
                          {/* <CardDescription>
                            Manage your email groups and member lists for team communications
                          </CardDescription> */}
                        </CardHeader>
                        <CardContent>
                          {groupCommunicationIntegration?.groups?.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                              <p className="font-medium">No groups created yet</p>
                              {/* <p className="text-sm">Click "Add Group" to create your first group</p> */}
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {groupCommunicationIntegration?.groups?.filter(group => group.emails.includes(currentUserEmail))
                              .map((group) => (
                                <div key={group.id} className="p-4 border rounded-lg bg-gray-50">
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-3">
                                        <Users className="h-4 w-4 text-blue-600" />
                                        <h5 className="font-medium text-lg">{group.name}</h5>
                                        <Badge variant="secondary">{group.emails.length} members</Badge>
                                      </div>
                                      <div className="space-y-2">
                                        <p className="text-sm font-medium text-gray-700">Group Members:</p>
                                        <div className="flex flex-wrap gap-2">
                                          {group.emails.map((email, index) => (
                                            <Badge key={index} variant="outline" className="text-xs">
                                              <Mail className="h-3 w-3 mr-1" />
                                              {email}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                      <p className="text-xs text-gray-500 mt-3">
                                        Created: {new Date(group.createdAt).toLocaleDateString()}
                                      </p>
                                    </div>
                                    {/* <Button
                                      variant="outline"
                                      size="sm"
                                      onClick={() => handleDeleteGroup(group.id)}
                                      className="text-red-600 hover:text-red-700 hover:border-red-300"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button> */}
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  )
}
