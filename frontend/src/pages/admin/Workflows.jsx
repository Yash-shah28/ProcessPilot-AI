import { useContext, useEffect, useState } from "react";
import { EyeIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WorkflowContext } from "@/Context/WorkflowContext";

const Workflows = () => {

  const { workflow, getWorkflow } = useContext(WorkflowContext)


  useEffect(() => {
   getWorkflow()
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
                <Button variant="outline" size="sm" className="hover:bg-blue-100">
                  <EyeIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Workflows;
