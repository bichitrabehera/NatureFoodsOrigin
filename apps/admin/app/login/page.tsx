"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/orders");
    } else {
      setError("Invalid password");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm rounded-2xl border-2 border-text bg-[#FBF5DD] p-8">
        <h1 className="mb-6 text-center text-3xl font-black text-text">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border-2 border-text bg-white px-4 py-3 text-base text-text placeholder-text/50 outline-none transition-all focus:border-primary"
            autoFocus
          />

          {error && (
            <p className="text-center text-sm font-semibold text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-3 text-lg font-bold text-white transition-all hover:bg-primary/90"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
