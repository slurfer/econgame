"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.error) setError("Invalid credentials");
    else router.push("/terminal");
  };

  return (
    <>
      <Header
        blueText="Login"
        showBackButton={true}
        showUserInfo={false}
        backButtonLink="/"
      />
      <div className="flex flex-col items-center justify-center h-screen absolute top-0 left-0 w-full bg-white">
        <form
          onSubmit={handleSubmit}
          className="border p-6 rounded-md shadow-md w-80 space-y-3"
        >
          <h1 className="text-2xl font-bold text-center">Login</h1>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border p-2 rounded-md"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded-md"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700"
          >
            Sign in
          </button>
        </form>
      </div>
    </>
  );
}
