import { useEffect, useState } from "react";

const Workflows = () => {
  const [workflows, setWorkflows] = useState([]);

  useEffect(() => {
    // Replace with backend API call: /admin/workflows
    setWorkflows([
      { id: 1, name: "Weekly Sales Meeting", owner: "Yash", status: "active", steps: 3 },
      { id: 2, name: "Product Demo Workflow", owner: "Kordia", status: "idle", steps: 2 },
    ]);
  }, []);

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
          {workflows.map((w) => (
            <tr key={w.id} className="border-t">
              <td className="p-3">{w.name}</td>
              <td className="p-3">{w.owner}</td>
              <td className="p-3">{w.status}</td>
              <td className="p-3">{w.steps}</td>
              <td className="p-3 space-x-2">
                <button className="text-blue-600">View</button>
                <button className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Workflows;
