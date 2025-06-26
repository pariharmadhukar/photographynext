"use client";

import { useState } from "react";
import {
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { FirebaseError } from "firebase/app"; // ✅ Import FirebaseError

export default function AdminProfile() {
  const user = auth.currentUser;

  const [currentPassword, setCurrentPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const reauthenticate = async () => {
    if (!user || !user.email) return;
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
  };

  const handleUpdateEmail = async () => {
    try {
      await reauthenticate();
      await updateEmail(user!, newEmail);
      setMessage("✅ Email updated successfully");
    } catch (err: unknown) {
      const error = err as FirebaseError;
      setMessage(`❌ Email update failed: ${error.message}`);
    }
  };

  const handleUpdatePassword = async () => {
    try {
      await reauthenticate();
      await updatePassword(user!, newPassword);
      setMessage("✅ Password updated successfully");
    } catch (err: unknown) {
      const error = err as FirebaseError;
      setMessage(`❌ Password update failed: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">🔐 Update Admin Credentials</h2>

      <input
        type="password"
        placeholder="Current Password"
        className="w-full mb-3 px-4 py-2 border rounded"
        value={currentPassword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)}
      />

      <input
        type="email"
        placeholder="New Email"
        className="w-full mb-3 px-4 py-2 border rounded"
        value={newEmail}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewEmail(e.target.value)}
      />
      <button
        className="w-full mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleUpdateEmail}
      >
        Update Email
      </button>

      <input
        type="password"
        placeholder="New Password"
        className="w-full mb-3 px-4 py-2 border rounded"
        value={newPassword}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
      />
      <button
        className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        onClick={handleUpdatePassword}
      >
        Update Password
      </button>

      {message && <p className="mt-4 text-sm text-center">{message}</p>}
    </div>
  );
}
