// app/init-cards/page.tsx
"use client";

import { useState } from "react";

export default function InitCardsPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState<string[]>([]);
  const [success, setSuccess] = useState<string[]>([]);

  const handleInit = async () => {
    const names = input
      .split("\n")
      .map((n) => n.trim())
      .filter((n) => n.length > 0);

    if (names.length === 0) return;

    setLoading(true);
    setFailed([]);
    setSuccess([]);

    const failedNames: string[] = [];
    const successNames: string[] = [];

    for (const name of names) {
      try {
        const res = await fetch("/api/card", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ owner: name }),
        });

        if (!res.ok) throw new Error("Request failed");
        successNames.push(name);
      } catch (err) {
        failedNames.push(name);
      }
    }

    setFailed(failedNames);
    setSuccess(successNames);
    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Init Cards</h1>

      <textarea
        className="w-full h-48 border rounded-md p-2 font-mono text-sm"
        placeholder="Enter one name per line..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        onClick={handleInit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Processing..." : "Init"}
      </button>

      {failed.length > 0 && (
        <div className="mt-4 p-3 border border-red-400 rounded bg-red-50">
          <h2 className="font-semibold text-red-600">Failed names:</h2>
          <ul className="list-disc ml-5 text-red-700">
            {failed.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      )}

      {success.length > 0 && (
        <div className="mt-4 p-3 border border-green-400 rounded bg-green-50">
          <h2 className="font-semibold text-green-600">Success:</h2>
          <ul className="list-disc ml-5 text-green-700">
            {success.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
