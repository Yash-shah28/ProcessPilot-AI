"use client"

import { useState, useEffect } from "react"
import Footer from "@/components/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  Zap,
  CheckCircle,
  Clock,
  TrendingUp,
  Eye,
  Edit,
  Play,
  Pause,
  Trash2,
  Activity,
  BarChart3,
  Plus,
  Bell,
  Mail,
  Calendar,
} from "lucide-react"

interface UserProfile {
  totalWorkflows: number
  activeWorkflows: number
  totalExecutions: number
  successRate: number
}

interface Workflow {
  id: string
  name: string
  description: string
  status: "active" | "paused" | "draft"
  createdAt: string
  lastRun: string
  executionCount: number
  successRate: number
  triggers: string[]
  actions: string[]
}

interface ActivityLog {
  id: string
  workflowId: string
  workflowName: string
  type: "execution" | "created" | "updated" | "paused"
  status: "success" | "failed" | "pending"
  timestamp: string
  details: string
}

export default function Analytics() {
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([])

  // Mock data - replace with actual API calls to your backend
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // Replace with actual API calls
        // const userResponse = await fetch('/api/user/profile')
        // const workflowsResponse = await fetch('/api/user/workflows')
        // const activityResponse = await fetch('/api/user/activity')

        // Mock data for demonstration
        setUserProfile({
          totalWorkflows: 8,
          activeWorkflows: 5,
          totalExecutions: 342,
          successRate: 94.2,
        })

        setWorkflows([
          {
            id: "wf_1",
            name: "Daily Email Digest",
            description: "Automatically compile and send daily email summaries",
            status: "active",
            createdAt: "2024-01-10",
            lastRun: "2024-01-20T09:00:00Z",
            executionCount: 45,
            successRate: 97.8,
            triggers: ["Schedule: Daily 9 AM"],
            actions: ["Gmail: Send Email", "AI: Generate Summary"],
          },
          {
            id: "wf_2",
            name: "Meeting Follow-up",
            description: "Send follow-up emails after calendar meetings",
            status: "active",
            createdAt: "2024-01-12",
            lastRun: "2024-01-19T15:30:00Z",
            executionCount: 23,
            successRate: 91.3,
            triggers: ["Calendar: Meeting End"],
            actions: ["AI: Draft Email", "Gmail: Send Email"],
          },
          {
            id: "wf_3",
            name: "Task Reminder System",
            description: "Smart reminders based on task priority",
            status: "paused",
            createdAt: "2024-01-08",
            lastRun: "2024-01-18T12:00:00Z",
            executionCount: 67,
            successRate: 89.6,
            triggers: ["AI: Priority Detection"],
            actions: ["Slack: Send Message", "Calendar: Create Event"],
          },
        ])

        setActivityLogs([
          {
            id: "log_1",
            workflowId: "wf_1",
            workflowName: "Daily Email Digest",
            type: "execution",
            status: "success",
            timestamp: "2024-01-20T09:00:00Z",
            details: "Email digest sent to 15 recipients",
          },
          {
            id: "log_2",
            workflowId: "wf_2",
            workflowName: "Meeting Follow-up",
            type: "execution",
            status: "success",
            timestamp: "2024-01-19T15:30:00Z",
            details: "Follow-up email sent after team meeting",
          },
          {
            id: "log_3",
            workflowId: "wf_3",
            workflowName: "Task Reminder System",
            type: "paused",
            status: "pending",
            timestamp: "2024-01-19T10:15:00Z",
            details: "Workflow paused by user",
          },
          {
            id: "log_4",
            workflowId: "wf_2",
            workflowName: "Meeting Follow-up",
            type: "execution",
            status: "failed",
            timestamp: "2024-01-18T16:45:00Z",
            details: "Failed to send follow-up email - API timeout",
          },
        ])

        setLoading(false)
      } catch (error) {
        console.error("Error fetching analytics data:", error)
        setLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [])

  const toggleWorkflowStatus = async (workflowId: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === "active" ? "paused" : "active"
      // Replace with actual API call
      // await fetch(`/api/workflows/${workflowId}/status`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status: newStatus })
      // })

      setWorkflows((prev) => prev.map((wf) => (wf.id === workflowId ? { ...wf, status: newStatus as any } : wf)))
    } catch (error) {
      console.error("Error updating workflow status:", error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "paused":
        return "bg-yellow-500"
      case "draft":
        return "bg-gray-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "workflow":
        return <Zap className="h-4 w-4" />
      case "email":
        return <Mail className="h-4 w-4" />
      case "calendar":
        return <Calendar className="h-4 w-4" />
      case "reminder":
        return <Bell className="h-4 w-4" />
      default:
        return <Activity className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Unable to load analytics data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Monitor your workflow performance and activity</p>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="workflows">My Workflows</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Workflow Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      <span className="text-sm font-medium text-gray-600">Total Workflows</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-bold">{userProfile.totalWorkflows}</div>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-green-500">{userProfile.activeWorkflows} active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium text-gray-600">Total Executions</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-bold">{userProfile.totalExecutions}</div>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-green-500">+23 this week</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4" />
                      <span className="text-sm font-medium text-gray-600">Success Rate</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-bold">{userProfile.successRate}%</div>
                    <div className="flex items-center gap-1 text-sm">
                      <TrendingUp className="h-3 w-3 text-green-500" />
                      <span className="text-green-500">+2.1% this week</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm font-medium text-gray-600">Time Saved</span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-2xl font-bold">24.5h</div>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-gray-500">this month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Agent Status */}
            <Card>
              <CardHeader>
                <CardTitle>AI Agent Performance</CardTitle>
                <CardDescription>Current status of your AI automation agents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Email Drafting Agent</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                  <Progress value={92} className="h-2" />
                  <p className="text-xs text-gray-500">92% accuracy in email tone matching</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Task Classification Agent</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Active
                    </Badge>
                  </div>
                  <Progress value={87} className="h-2" />
                  <p className="text-xs text-gray-500">87% accuracy in task categorization</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Smart Reminder Agent</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                      Learning
                    </Badge>
                  </div>
                  <Progress value={73} className="h-2" />
                  <p className="text-xs text-gray-500">73% accuracy in priority detection</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="workflows" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">All Workflows ({workflows.length})</h3>
            </div>

            <div className="grid gap-4">
              {workflows.map((workflow) => (
                <Card key={workflow.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-3 h-3 rounded-full ${workflow.status === "active"  ? "bg-green-500" : workflow.status === "paused" ? "bg-yellow-500":"bg-red-500"}`} />
                          <h4 className="font-semibold text-lg">{workflow.name}</h4>
                          <Badge variant={workflow.status as "active" | "paused" | "inactive"}>
                            {workflow.status}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{workflow.description}</p>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <p className="text-sm font-medium text-gray-500">Triggers</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {workflow.triggers.map((trigger, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {trigger}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-500">Actions</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {workflow.actions.map((action, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {action}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Created: {new Date(workflow.createdAt).toLocaleDateString()}</span>
                          <span>Executions: {workflow.executionCount}</span>
                          <span>Success Rate: {workflow.successRate}%</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => toggleWorkflowStatus(workflow.id, workflow.status)}
                        >
                          {workflow.status === "active" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest workflow executions and AI agent actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityLogs.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-3 p-3 border rounded-lg">
                      <div className="mt-1">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{activity.workflowName}</h4>
                        <p className="text-sm text-gray-600">{activity.details}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(activity.timestamp).toLocaleString()}</p>
                      </div>
                      <Badge
                        variant={
                          activity.status === "success"
                            ? "active"
                            : activity.status === "pending"
                              ? "paused"
                              : "inactive"
                        }
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <Footer/>
    </div>
  )
}
