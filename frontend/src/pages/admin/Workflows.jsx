import { useContext, useEffect, useState } from "react";
import { EyeIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowContext } from "@/Context/WorkflowContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Workflows = () => {

  const { workflow, getAllWorkflow,deleteWorkflow,getWorkflowById } = useContext(WorkflowContext)

  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)

const handleDelete = (workflow) => {
        setSelectedWorkflow(workflow)
        setIsDeleteOpen(true)
    }

     const confirmDelete = async () => {
        try {
            await deleteWorkflow(selectedWorkflow._id);
            getAllWorkflow(); // refresh list
            setIsDeleteOpen(false);
        } catch (error) {
            console.error("Error deleting workflow:", error);
        }
    };

       const handleView = async (workflow) => {
        try {
            const wf = await getWorkflowById(workflow._id);
            setSelectedWorkflow(wf);
            setIsViewOpen(true);
        } catch (error) {
            console.error("Error fetching workflow:", error);
        }
    };

  useEffect(() => {
    getAllWorkflow()
  }, []);

  console.log(workflow.workflow)
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Workflows</h1>
      <table className="min-w-full bg-white rounded-lg shadow">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Owner</th>
            <th className="p-3">Status</th>
            <th className="p-3">Steps</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {workflow?.workflow?.map((w) => (
            <tr key={w.id} className="border-t">
              <td className="p-3">{w.name}</td>
              <td className="p-3">{w.userId.name}</td>
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-sm ${w.status === "active"
                    ? "bg-green-100 text-green-600"
                    : w.status === "idle"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                    }`}
                >
                  {w.status}
                </span>
              </td>
              <td className="p-3">{w.steps.length}</td>
              <td className="p-3 space-x-2">
                <Button
                  onClick={() => handleView(w)}
                  variant="outline"
                  size="sm"
                  className="hover:bg-blue-100">
                  <EyeIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDelete(w)}
                  className="hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* ---- View Dialog ---- */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Workflow Details</DialogTitle>
          </DialogHeader>
          {selectedWorkflow && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{selectedWorkflow.name}</h3>
                <p className="text-gray-600">{selectedWorkflow.description}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Owner: {selectedWorkflow.userId.name || "Current User"}</h4>
                <h4 className="font-medium">Steps: {selectedWorkflow.executionCount}</h4>
                <h4 className="font-medium">Last Modified: {new Date(selectedWorkflow.updatedAt).toLocaleDateString()}</h4>
              </div>
              <div className="flex justify-end">
                <Button variant="outline"
                  className=" bg-gray-100 text-black hover:bg-red-600 hover:text-white"
                  onClick={() => setIsViewOpen(false)}>Close</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      {/* ---- Delete Confirmation Dialog ---- */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to delete the Workflow "{selectedWorkflow?.name}"? This action cannot be undone.</p>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>Delete</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Workflows;
