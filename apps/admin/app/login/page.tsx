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
    <div className="bg-background flex min-h-screen items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-[#FBF5DD] p-8">
        <h1 className="text-text mb-6 text-center text-2xl font-black">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="text-text placeholder-text/50 focus:border-primary w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-base transition-all outline-none"
            autoFocus
          />

          {error && (
            <p className="text-center text-sm font-semibold text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="bg-primary hover:bg-primary/90 w-full rounded-xl py-3 text-lg font-bold text-white transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
