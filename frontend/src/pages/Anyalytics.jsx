"use client"

import { useContext, useEffect } from "react"
import { WorkflowContext } from "../Context/WorkflowContext.jsx"
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
    
    Edit,
    Play,
    Pause,
    Trash2,
    Activity,
    BarChart3,
    Bell,
    Mail,
    Calendar,
} from "lucide-react"

export default function Analytics() {



    const { workflow, getUserProfile, getUserActivity, getWorkflow } = useContext(WorkflowContext);


    useEffect(() => {
        getUserProfile()
        getUserActivity()
        getWorkflow()
    }, [])

    const toggleWorkflowStatus = async (workflowId, currentStatus) => {
        try {
            const newStatus = currentStatus === "active" ? "paused" : "active"
            // TODO: Call backend API to toggle status
            // await axios.put(`${API_URL}/workflows/${workflowId}/toggle-status`, { status: newStatus })

            // Optimistic update:
            workflow.setWorkflows((prev) =>
                prev.map((wf) => (wf.id === workflowId ? { ...wf, status: newStatus } : wf))
            )
        } catch (error) {
            console.error("Error updating workflow status:", error)
        }
    }

    const getActivityIcon = (type) => {
        switch (type) {
            case "execution": return <Zap className="h-4 w-4" />
            case "email": return <Mail className="h-4 w-4" />
            case "calendar": return <Calendar className="h-4 w-4" />
            case "reminder": return <Bell className="h-4 w-4" />
            default: return <Activity className="h-4 w-4" />
        }
    }

    if (workflow.isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading analytics...</p>
                </div>
            </div>
        )
    }

    if (workflow.error) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600">⚠ {workflow.error}</p>
                </div>
            </div>
        )
    }

    if (!workflow.userprofile) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-600">No analytics data found</p>
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

                    {/* ---- OVERVIEW ---- */}
                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2">
                                        <Zap className="h-4 w-4" />
                                        <span className="text-sm text-gray-600">Total Workflows</span>
                                    </div>
                                    <div className="mt-2 text-2xl font-bold">{workflow.userprofile.totalWorkflows}</div>
                                    <div className="text-sm text-green-500">{workflow.userprofile.activeWorkflows} active</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="h-4 w-4" />
                                        <span className="text-sm text-gray-600">Total Executions</span>
                                    </div>
                                    <div className="mt-2 text-2xl font-bold">{workflow.userprofile.totalExecutions}</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2">
                                        <BarChart3 className="h-4 w-4" />
                                        <span className="text-sm text-gray-600">Success Rate</span>
                                    </div>
                                    <div className="mt-2 text-2xl font-bold">{workflow.userprofile.successRate}%</div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardContent className="p-6">
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        <span className="text-sm text-gray-600">Time Saved</span>
                                    </div>
                                    <div className="mt-2 text-2xl font-bold">24.5h</div>
                                </CardContent>
                            </Card>
                        </div>

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


                    {/* ---- WORKFLOWS ---- */}
                    <TabsContent value="workflows" className="space-y-6">
                        <h3 className="text-lg font-semibold">All Workflows ({workflow.workflow.length})</h3>
                        <div className="grid gap-4">
                            {workflow.workflow.map((workflow) => (
                                <Card key={workflow.id}>
                                    <CardContent className="p-6 flex justify-between">
                                        <div>
                                            <h4 className="font-semibold">{workflow.name}</h4>
                                            <p className="text-gray-600">{workflow.description}</p>
                                            <p className="text-sm text-gray-500">Executions: {workflow.executionCount}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <Button onClick={() => toggleWorkflowStatus(workflow.id, workflow.status)} size="sm">
                                                {workflow.status === "active" ? <Pause /> : <Play />}
                                            </Button>
                                            <Button size="sm"><Edit /></Button>
                                            <Button size="sm"><Trash2 /></Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>

                    {/* ---- ACTIVITY ---- */}
                    <TabsContent value="activity" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Activity</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {workflow.activity.map((act) => (
                                    <div key={act.id} className="flex items-start gap-3 p-3 border rounded-lg">
                                        {getActivityIcon(act.type)}
                                        <div className="flex-1">
                                            <h4 className="font-medium">{act.workflowName}</h4>
                                            <p className="text-sm text-gray-600">{act.details}</p>
                                            <p className="text-xs text-gray-500">{new Date(act.timestamp).toLocaleString()}</p>
                                        </div>
                                        <Badge>{act.status}</Badge>
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
