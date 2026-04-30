import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const send = async () => {
    if (!input) return;

    setMessages([...messages, { text: input, me: true }]);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { text: data.reply, me: false },
    ]);

    setInput("");
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 20 }}>
      <h2>AI English Coach 🚀</h2>

      {messages.map((m, i) => (
        <div key={i} style={{ textAlign: m.me ? "right" : "left" }}>
          {m.text}
        </div>
      ))}

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Hindi me likho..."
      />
      <button onClick={send}>Send</button>
    </div>
  );
}