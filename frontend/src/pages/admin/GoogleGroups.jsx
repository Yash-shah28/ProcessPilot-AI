import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Users, Plus, Trash2, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, } from "@/components/ui/dialog"
/**
 * @typedef {Object} Integration
 * @property {string} id
 * @property {string} name
 * @property {"gmail"|"calendar"|"slack"|"group-communication"} type
 * @property {boolean} connected
 * @property {string} lastSync
 * @property {"active"|"error"|"syncing"} status
 * @property {Group[]=} groups
 */
/**
 * @typedef {Object} Group
 * @property {string} id
 * @property {string} name
 * @property {string[]} emails
 * @property {string} createdAt
 */

export default function GoogleGroupsPage() {
  const [integrations, setIntegrations] = useState([])
  const [isGroupDialogOpen, setIsGroupDialogOpen] = useState(false)
  const [newGroupName, setNewGroupName] = useState("")
  const [newGroupDescription, setNewGroupDescription] = useState("")
  const [newGroupEmails, setNewGroupEmails] = useState("")
  const [showGroupManagement] = useState(true)
  const [setLoading] = useState(true)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Replace with actual API calls
        // const userResponse = await fetch('/api/user/profile')
        // const integrationsResponse = await fetch('/api/user/integrations')
        // Mock data for demonstration
        setIntegrations([
          {
            id: "1",
            name: "Google Workspace",
            type: "group-communication",
            connected: true,
            lastSync: "2024-10-01T12:00:00Z",
            status: "active",
            groups: [
              {
                id: "g1",
                name: "Sales Team",
                emails: ["sales@company.com", "Abc@employee.com", "dev@team.com"],
                description: "Handles sales operations",
                createdAt: "2024-09-15T10:00:00Z"
              },
              {
                id: "g2",
                name: "HR Team",
                emails: ["hr@company.com", "pqr@gmail.com", "sl@company.com"],
                description: "Human resources management",
                createdAt: "2024-09-20T14:30:00Z"
              },
            ]
          }
        ])
        setLoading(false)
      } catch (error) {
        console.error("Error fetching user data:", error)
        setLoading(false)
      }
    }
    fetchUserData()
  }, [])
  // const GoogleGroups = () => {
  //   const [groups, setGroups] = useState([
  //     { id: 1, name: "Sales Team", emails: ["sales@company.com"], description: "Handles sales operations" },
  //     { id: 2, name: "HR Team", emails: ["hr@company.com"], description: "Human resources management" },
  //   ]);
  // const [newGroup, setNewGroup] = useState({ name: "", emailInput: "", emails: [], description: "" });
  // Add one email to the temporary emails list
  // const handleAddEmail = () => {
  //   if (!newGroup.emailInput.trim()) return;

  //   setNewGroup({
  //     ...newGroup,
  //     emails: [...newGroup.emails, newGroup.emailInput.trim()],
  //     emailInput: "",
  //   });
  // };

  // // Remove an email from the list before creating group
  // const handleRemoveEmail = (email) => {
  //   setNewGroup({
  //     ...newGroup,
  //     emails: newGroup.emails.filter((e) => e !== email),
  //   });
  // };

  // // Create a new group
  // const handleCreate = () => {
  //   if (!newGroup.name || newGroup.emails.length === 0) {
  //     alert("Please provide group name and at least one email.");
  //     return;
  //   }

  //   const newEntry = {
  //     id: Date.now(),
  //     name: newGroup.name,
  //     emails: newGroup.emails,
  //     description: newGroup.description,
  //   };

  //   setGroups([...groups, newEntry]);
  //   setNewGroup({ name: "", emailInput: "", emails: [], description: "" });
  // };

  // const handleDelete = (id) => {
  //   setGroups(groups.filter((g) => g.id !== id));
  // };
  const handleAddGroup = async () => {
    if (!newGroupName.trim() || !newGroupEmails.trim() || !newGroupDescription.trim()) {
      alert("Please provide group name, description, and at least one email.");
      return;
    }

    const emailList = newGroupEmails
      .split(/[,\n]/)
      .map((email) => email.trim())
      .filter((email) => email && email.includes("@"))

    if (emailList.length === 0) return

    const newGroup = {
      id: `grp_${Date.now()}`,
      name: newGroupName.trim(),
      description: newGroupDescription.trim(),
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
      setNewGroupDescription("")
      setIsGroupDialogOpen(false)
    } catch (error) {
      console.error("Error adding group:", error)
    }
  };

  const handleDeleteGroup = async (groupId) => {
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
  };

  const groupCommunicationIntegration = integrations.find((int) => int.type === "group-communication");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Google Groups Management</h1>
      {groupCommunicationIntegration?.type === "group-communication" && groupCommunicationIntegration?.connected && showGroupManagement && (
        <Card className="ml-8 border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Group Management
              </CardTitle>
              <Dialog open={isGroupDialogOpen} onOpenChange={setIsGroupDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Group
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
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
                    {/* Group Description */}
                    <div className="space-y-2">
                      <Label htmlFor="group-description">Description</Label>
                      <Textarea
                        id="group-description"
                        placeholder="Enter group description"
                        value={newGroupDescription}
                        onChange={(e) => setNewGroupDescription(e.target.value)}
                        className="min-h-[80px]"
                      />
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
                </DialogContent>
              </Dialog>
            </div>
            <CardDescription>
              Manage your email groups and member lists for team communications
            </CardDescription>
          </CardHeader>
          <CardContent>
            {groupCommunicationIntegration?.groups?.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p className="font-medium">No groups created yet</p>
                <p className="text-sm">Click "Add Group" to create your first group</p>
              </div>
            ) : (
              <div className="space-y-4">
                {groupCommunicationIntegration?.groups?.map((group) => (
                  <div key={group.id} className="p-4 border rounded-lg bg-gray-50">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <Users className="h-4 w-4 text-blue-600" />
                          <h5 className="font-medium text-lg">{group.name}</h5>
                          <Badge variant="secondary">{group.emails.length} members</Badge>
                        </div>
                        {/* Group Description */}
                        {group.description && (
                          <p className="text-sm text-gray-600 mb-3">{group.description}</p>
                        )}
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteGroup(group.id)}
                        className="text-red-600 hover:text-red-700 hover:border-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}


