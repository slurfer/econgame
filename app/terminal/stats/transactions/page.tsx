"use client";
import { useEffect, useState } from "react";

export default function SseClient() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/transaction");

    eventSource.onmessage = (event) => {
      setMessages((prev) => [...prev, event.data]);
    };

    eventSource.onerror = (err) => {
      console.error("SSE chyba:", err);
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  return (
    <div>
      <h2>Server-Sent Events</h2>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}
