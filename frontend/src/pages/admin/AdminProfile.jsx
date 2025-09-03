"use client";

import { useContext, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { User, Edit, XCircleIcon } from "lucide-react";
import { UserContext } from "@/Context/UserContext";

export default function AdminProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  const { userAuth, getProfile, updateProfile } = useContext(UserContext);

  useEffect(() => {
    // Fetch profile when component mounts
    getProfile();
  }, []);

  useEffect(() => {
    // Sync formData with userAuth.user once it's available
    if (userAuth.user) {
      setFormData({
        name: userAuth.user.name || "",
        email: userAuth.user.email || "",
      });
    }
  }, [userAuth.user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData.email, formData.name); // update via context
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile", error);
    }
  };

  if (!userAuth.user) {
    return (
      <div className="p-6 text-center text-gray-500">Loading profile...</div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      {/* Profile Info Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-4">
            <User className="h-6 w-6 text-gray-600" />
            <CardTitle className="text-lg font-semibold">
              Profile Information
            </CardTitle>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? (
              <div className="flex items-center gap-1">
                <XCircleIcon className="h-4 w-4" />
                <span>Close</span>
              </div>
            ) : (
              <>
                <Edit className="h-4 w-4" />
                <span>Edit Profile</span>
              </>
            )}
          </Button>
        </CardHeader>

        <CardContent className="flex items-center gap-6">
          <Avatar className="h-14 w-14">
            {userAuth.user.avatar ? (
              <AvatarImage src={userAuth.user.avatar} alt={userAuth.user.name} />
            ) : (
              <AvatarFallback>
                {userAuth.user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            )}
          </Avatar>

          <div>
            <h3 className="text-lg font-semibold">{userAuth.user.name}</h3>
            <p className="text-gray-600">{userAuth.user.email}</p>
            <p className="text-sm text-gray-500 mt-1">
              Member since:{" "}
              {userAuth.user.createdAt
                ? new Date(userAuth.user.createdAt).toLocaleDateString()
                : "N/A"}{" "}
              &nbsp; | &nbsp; Last login:{" "}
              {userAuth.user.lastLogin
                ? new Date(userAuth.user.lastLogin).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Animated Edit Form Card */}
      <AnimatePresence>
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
                <CardDescription>
                  Update your profile information below
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-end gap-3">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button
                    className="bg-blue-600 text-white hover:bg-blue-700"
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
