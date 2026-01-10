"use client";

import { useEffect, useState } from "react";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Fetch all users
  const fetchUsers = async () => {
    const res = await fetch("http://localhost:4000/users");
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Create a user
  const addUser = async () => {
    if (!name || !email) return alert("Enter name and email");

    const res = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    if (res.ok) {
      setName("");
      setEmail("");
      fetchUsers();
    }
  };

  // Delete a user
  const deleteUser = async (id: string) => {
    await fetch(`http://localhost:4000/users/${id}`, {
      method: "DELETE",
    });
    fetchUsers();
  };

  // Update a user
  const updateUser = async (id: string) => {
    const newName = prompt("New name?");
    const newEmail = prompt("New email?");
    if (!newName || !newEmail) return;

    await fetch(`http://localhost:4000/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName, email: newEmail }),
    });

    fetchUsers();
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="font-medium text-4xl text-yellow-500 mb-6">User CRUD</h1>

      {/* Form to add user */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Name"
          className="border px-2 py-1 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="border px-2 py-1 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={addUser}
          className="bg-yellow-500 text-white px-4 rounded"
        >
          Add
        </button>
      </div>

      {/* List users */}
      <ul className="space-y-3">
        {users.map((user) => (
          <li
            key={user.id}
            className="flex justify-between items-center border p-3 rounded"
          >
            <div>
              <p className="font-semibold">{user.name}</p>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => updateUser(user.id)}
                className="bg-blue-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteUser(user.id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
