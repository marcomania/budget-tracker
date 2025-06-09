"use client";

import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, MessageCircle } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatIdRef = useRef<string>("");

  const [isBotTyping, setIsBotTyping] = useState(false);
  

  const webhookUrl =
    "https://marcochatbot.app.n8n.cloud/webhook/e2a7ef83-74a0-4aa5-a735-2e5d4a7f43af/chat";
  const route = "general";

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
    setIsBotTyping(true);

    try {
      const res = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatId: chatIdRef.current,
          message,
          route,
        }),
      });

      const data = await res.json();
      const botReply = data.output || "Lo siento, no entendí eso.";
      setMessages((prev) => [...prev, `🤖 ${botReply}`]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, "⚠️ Error al enviar el mensaje."]);
    }
    finally {
      setIsBotTyping(false);
    }
  };

  return (
    <>
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-5 right-5 rounded-full w-14 h-14 p-0 bg-[#8b0000] hover:bg-[#a60000] text-white shadow-lg z-[1000]"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {isOpen && (
        <div className="fixed bottom-5 right-5 w-80 h-96 bg-white dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-xl shadow-xl flex flex-col z-[1000]">
          {/* Header */}
          <div className="bg-[#b22222] text-white p-3 rounded-t-xl flex justify-between items-center">
            <span className="font-semibold">Asistente FISI</span>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-[#a50000]/30"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Body */}
          <div className="flex-1 p-3 overflow-y-auto text-sm space-y-2">
            <div className="text-gray-800 dark:text-gray-100">
              <div className="bg-gray-100 dark:bg-zinc-800 p-2 rounded-lg w-fit max-w-[85%]">
                Hola 👋, ¿Cómo puedo ayudarte?
              </div>
            </div>
            {messages.map((msg, idx) => {
              const isBot = msg.startsWith("🤖 ");
              const cleanMsg = isBot ? msg.replace("🤖 ", "") : msg;

              return (
                <div
                  key={idx}
                  className={`flex ${
                    isBot ? "justify-end" : "justify-start"
                  } text-sm`}
                >
                  <div
                    className={`px-3 py-2 rounded-lg max-w-[85%] break-words ${
                      isBot
                        ? "bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-gray-100"
                        : "bg-[#3f6cb5]  text-white dark:bg-[#274a8d] dark:text-gray-100"
                    }`}
                  >
                    {cleanMsg}
                  </div>
                </div>
              );
            })}
            {isBotTyping && (
              <div className="flex justify-end text-sm">
                <div className="px-3 py-2 rounded-lg max-w-[85%] bg-gray-100 text-gray-500 dark:bg-zinc-800 dark:text-gray-400 italic animate-pulse">
                  Escribiendo...
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <form
            className="p-3 border-t border-gray-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <Input
              type="text"
              ref={inputRef}
              placeholder="Escriba su mensaje..."
              className="text-sm bg-white dark:bg-zinc-800 dark:text-white"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <Button
              type="submit"
              className="bg-[#8b0000] hover:bg-[#a60000] text-white"
            >
              Enviar
            </Button>
          </form>
        </div>
      )}
    </>
  );
}
