import { useState } from "react";

const GoogleGroups = () => {
  const [groups, setGroups] = useState([
    { id: 1, name: "Sales Team", emails: ["sales@company.com"], description: "Handles sales operations" },
    { id: 2, name: "HR Team", emails: ["hr@company.com"], description: "Human resources management" },
  ]);

  const [newGroup, setNewGroup] = useState({ name: "", emailInput: "", emails: [], description: "" });

  // Add one email to the temporary emails list
  const handleAddEmail = () => {
    if (!newGroup.emailInput.trim()) return;

    setNewGroup({
      ...newGroup,
      emails: [...newGroup.emails, newGroup.emailInput.trim()],
      emailInput: "",
    });
  };

  // Remove an email from the list before creating group
  const handleRemoveEmail = (email) => {
    setNewGroup({
      ...newGroup,
      emails: newGroup.emails.filter((e) => e !== email),
    });
  };

  // Create a new group
  const handleCreate = () => {
    if (!newGroup.name || newGroup.emails.length === 0) {
      alert("Please provide group name and at least one email.");
      return;
    }

    const newEntry = {
      id: Date.now(),
      name: newGroup.name,
      emails: newGroup.emails,
      description: newGroup.description,
    };

    setGroups([...groups, newEntry]);
    setNewGroup({ name: "", emailInput: "", emails: [], description: "" });
  };

  const handleDelete = (id) => {
    setGroups(groups.filter((g) => g.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Google Groups Management</h1>

      {/* Create Group Form */}
      <div className="bg-white shadow rounded p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Create Group</h2>
        <input
          type="text"
          placeholder="Group Name"
          value={newGroup.name}
          onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
          className="border p-2 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newGroup.description}
          onChange={(e) => setNewGroup({ ...newGroup, description: e.target.value })}
          className="border p-2 rounded mr-2"
        />
        <div className="mt-2">
          <input
            type="email"
            placeholder="Enter email"
            value={newGroup.emailInput}
            onChange={(e) => setNewGroup({ ...newGroup, emailInput: e.target.value })}
            className="border p-2 rounded mr-2"
          />
          <button
            onClick={handleAddEmail}
            className="bg-green-600 text-white px-3 py-1 rounded"
          >
            Add Email
          </button>
        </div>

        {/* Display added emails before creating */}
        <div className="mt-2">
          {newGroup.emails.map((email, idx) => (
            <span
              key={idx}
              className="inline-flex items-center bg-gray-200 rounded px-2 py-1 text-sm mr-2 mb-2"
            >
              {email}
              <button
                onClick={() => handleRemoveEmail(email)}
                className="ml-2 text-red-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>

        <button
          onClick={handleCreate}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Create Group
        </button>
      </div>

      {/* Groups List */}
      {groups.length === 0 ? (
        <p className="text-gray-500">No groups found.</p>
      ) : (
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Emails</th>
              <th className="p-3">Description</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.map((g) => (
              <tr key={g.id} className="border-t">
                <td className="p-3">{g.name}</td>
                <td className="p-3">
                  {g.emails.map((e, i) => (
                    <span
                      key={i}
                      className="inline-block bg-gray-100 px-2 py-1 rounded text-sm mr-1"
                    >
                      {e}
                    </span>
                  ))}
                </td>
                <td className="p-3">{g.description}</td>
                <td className="p-3">
                  <button
                    onClick={() => handleDelete(g.id)}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default GoogleGroups;
