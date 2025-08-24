import React, { useEffect, useRef, useState } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";

// Message type
type Message = {
  id: string;
  role: "user" | "bot";
  text?: string;
  image?: string;
  time: string;
};

// Payload types for sendToBackend
type Payload =
  | { text: string }
  | { image: true }
  | { location: { latitude: number; longitude: number } };

export default function ZeroHungerChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: crypto.randomUUID(),
      role: "bot",
      text:
        "Hi! I’m the Zero Hunger assistant. Tell me: ‘I have 5kg biryani at Hostel Canteen’ or ask ‘What donations are near me?’",
      time: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [sending, setSending] = useState<boolean>(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  async function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || sending) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      text: trimmed,
      time: new Date().toLocaleTimeString(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setSending(true);

    const botReply = await sendToBackend({ text: trimmed });
    setMessages((m) => [...m, botReply]);
    setSending(false);
  }

  function handleKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  function handleAttachClick() {
    fileRef.current?.click();
  }

  async function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      const imgMsg: Message = {
        id: crypto.randomUUID(),
        role: "user",
        image: base64,
        text: "[Photo attached]",
        time: new Date().toLocaleTimeString(),
      };
      setMessages((m) => [...m, imgMsg]);

      const botReply = await sendToBackend({ image: true });
      setMessages((m) => [...m, botReply]);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function handleShareLocation() {
    if (!navigator.geolocation) {
      setMessages((m) => [
        ...m,
        {
          id: crypto.randomUUID(),
          role: "bot",
          text: "Geolocation not supported in this browser.",
          time: new Date().toLocaleTimeString(),
        },
      ]);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const link = `https://maps.google.com/?q=${latitude},${longitude}`;
        const locMsg: Message = {
          id: crypto.randomUUID(),
          role: "user",
          text: `My location: ${link}`,
          time: new Date().toLocaleTimeString(),
        };
        setMessages((m) => [...m, locMsg]);

        const botReply = await sendToBackend({ location: { latitude, longitude } });
        setMessages((m) => [...m, botReply]);
      },
      () => {
        setMessages((m) => [
          ...m,
          {
            id: crypto.randomUUID(),
            role: "bot",
            text: "Couldn’t get your location. Please allow location access and try again.",
            time: new Date().toLocaleTimeString(),
          },
        ]);
      }
    );
  }

  async function sendToBackend(payload: Payload): Promise<Message> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let text = "I didn’t catch that. Try ‘I have 5kg biryani at Hostel Canteen’.";
        if ("image" in payload) {
          text = "Photo received! I’ll estimate type & quantity and pre-fill the donation form.";
        } else if ("location" in payload) {
          text = "Location saved. I’ll notify nearby NGOs when your donation is posted.";
        } else if ("text" in payload) {
          const t = payload.text.toLowerCase();
          if (t.includes("i have")) {
            text = "Thanks! Creating a donation draft. Please confirm pickup time.";
          } else if (t.includes("near me") || t.includes("available")) {
            text = "Here are nearby donations (demo): 3 trays of rice (1.2 km), bread (2.1 km).";
          }
        }

        resolve({
          id: crypto.randomUUID(),
          role: "bot",
          text,
          time: new Date().toLocaleTimeString(),
        });
      }, 600);
    });
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 flex justify-center items-stretch">
      <div className="flex flex-col w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

        <div className="px-4 py-3 border-b bg-gradient-to-r from-emerald-500 to-lime-500 text-white">
          <div className="flex items-center gap-2">
            <span className="text-xl">🥗</span>
            <div>
              <h1 className="text-lg font-semibold">Zero Hunger Assistant</h1>
              <p className="text-xs opacity-90">Donor/NGO chat • demo</p>
            </div>
          </div>
        </div>


        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((m) => (
            <MessageBubble key={m.id} role={m.role} text={m.text} image={m.image} time={m.time} />
          ))}
        </div>

        <div className="p-3 border-t bg-white">
          <div className="flex items-end gap-2">
            <button
              className="px-3 py-2 rounded-xl border bg-black text-white hover:bg-gray-800"
              title="Attach photo"
              onClick={handleAttachClick}
              disabled={sending}
            >
              📎
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <button
              className="px-3 py-2 rounded-xl border bg-black text-white hover:bg-gray-800"
              title="Share location"
              onClick={handleShareLocation}
              disabled={sending}
            >
              📍
            </button>

            <textarea
              className="flex-1 resize-none rounded-xl border px-3 py-2 h-12 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-black" // 👈 ADD THIS
              placeholder={sending ? "Sending…" : "Type a message"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={sending}
            />

            <button
              onClick={handleSend}
              disabled={sending || !input.trim()}
              className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-medium disabled:opacity-50"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// MessageBubble component with prop types
type MessageBubbleProps = {
  role: "user" | "bot";
  text?: string;
  image?: string;
  time: string;
};

function MessageBubble({ role, text, image, time }: MessageBubbleProps) {
  const isUser = role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-3 py-2 shadow-sm ${isUser
          ? "bg-emerald-500 text-white rounded-br-sm"
          : "bg-gray-100 text-gray-800 border rounded-bl-sm"
          }`}
      >
        {image && (
          <img
            src={image}
            alt="Attachment preview"
            className="rounded-lg mb-2 max-h-40 object-cover"
          />
        )}
        {text && <p className="text-sm whitespace-pre-wrap">{text}</p>}
        <div className={`text-[10px] mt-1 ${isUser ? "text-emerald-50" : "text-gray-500"}`}>{time}</div>
      </div>
    </div>
  );
}
