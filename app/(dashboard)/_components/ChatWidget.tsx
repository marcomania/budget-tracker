"use client";

import { useEffect, useRef, useState } from "react";

type ChatWidgetConfig = {
  webhook: {
    url: string;
    route: string;
  };
  style: {
    primaryColor: string;
    secondaryColor: string;
    position: "left" | "right";
    backgroundColor: string;
    fontColor: string;
  };
};

const chatWidgetConfig: ChatWidgetConfig = {
  webhook: {
    url: "https://marcochatbot.app.n8n.cloud/webhook/e2a7ef83-74a0-4aa5-a735-2e5d4a7f43af/chat",
    route: "general",
  },
  style: {
    primaryColor: "#854fff",
    secondaryColor: "#6b3fd4",
    position: "right",
    backgroundColor: "#ffffff",
    fontColor: "#333333",
  },
};

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatIdRef = useRef<string>("");

  useEffect(() => {
    let chatId = sessionStorage.getItem("chatId");
    if (!chatId) {
      chatId = "chat_" + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem("chatId", chatId);
    }
    chatIdRef.current = chatId;
  }, []);

  const sendMessage = async () => {
    const message = inputRef.current?.value.trim();
    if (!message) return;

    setMessages((prev) => [...prev, message]);

    inputRef.current!.value = "";

    try {
      const res = await fetch(chatWidgetConfig.webhook.url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: chatIdRef.current,
          message,
          route: chatWidgetConfig.webhook.route,
        }),
      });

      const data = await res.json();
      const botReply = data.output || "Sorry, I couldn't understand that.";
      setMessages((prev) => [...prev, `🤖 ${botReply}`]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, "⚠️ Error sending message."]);
    }
  };

  return (
    <>
      {/* Bubble Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: "20px",
            [chatWidgetConfig.style.position]: "20px",
            backgroundColor: chatWidgetConfig.style.primaryColor,
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            fontSize: "24px",
            cursor: "pointer",
            zIndex: 1000,
          }}
        >
          💬
        </button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            [chatWidgetConfig.style.position]: "20px",
            width: "300px",
            height: "400px",
            backgroundColor: chatWidgetConfig.style.backgroundColor,
            color: chatWidgetConfig.style.fontColor,
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "10px",
              backgroundColor: chatWidgetConfig.style.secondaryColor,
              color: "#fff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <span>Chat</span>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              ✖
            </button>
          </div>

          {/* Body */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
            }}
          >
            <p>
              <strong>Hi 👋, how can we help?</strong>
            </p>
            {messages.map((msg, idx) => (
              <p key={idx} style={{ margin: "8px 0" }}>
                {msg}
              </p>
            ))}
          </div>

          {/* Footer */}
          <div
            style={{
              padding: "10px",
              borderTop: "1px solid #ddd",
              display: "flex",
              gap: "8px",
            }}
          >
            <input
              type="text"
              ref={inputRef}
              placeholder="Type your message..."
              style={{ flex: 1, padding: "8px" }}
              onKeyDown={(e) => {
                if (e.key === "Enter") sendMessage();
              }}
            />
            <button onClick={sendMessage} style={{ padding: "8px" }}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
