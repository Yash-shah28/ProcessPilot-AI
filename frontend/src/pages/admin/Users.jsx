import { useEffect, useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, } from "lucide-react";
import { UserContext } from "@/Context/UserContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const Users = () => {
  const { userAuth, getAllUser,deleteUser } = useContext(UserContext);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDelete = (user) => {
    setSelectedUser(user)
    setIsDeleteOpen(true)
  }

const confirmDelete = async () => {
        try {
            await deleteUser(selectedUser._id);
            getAllUser(); // refresh list
            setIsDeleteOpen(false);
        } catch (error) {
            console.error("Error deleting User:", error);
        }
    };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <div className="p-6">
      {/* Header with Add User Button */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        {/* <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add User
        </Button> */}
      </div>

      {/* Users Table */}
      <table className="min-w-full bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {userAuth?.users?.map((u) => (
            <tr
              key={u._id}
              className="border-t hover:bg-gray-50 transition-colors"
            >
              <td className="p-3">{u.name}</td>
              <td className="p-3">{u.email}</td>
              <td className="p-3 capitalize">{u.role}</td>
              <td className="p-3">
                {(() => {
                  const status = u.status?.toLowerCase().trim() || "active";
                  return (
                    <span
                      className={`px-2 py-1 rounded text-sm ${status === "active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                        }`}
                    >
                      {status}
                    </span>
                  );
                })()}
              </td>

              <td className="p-3 space-x-2">
                <Button
                  variant={"outline"}
                  size={"sm"}
                  onClick={() => handleDelete(u)}
                  className="bg-white hover:bg-red-100 text-red-600 border">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* ---- Delete Confirmation Dialog ---- */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to delete the WorkflowUser "{selectedUser?.name}"? This action cannot be undone.</p>
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

export default Users;
