import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Send,
  RefreshCw,
  X,
  Bot,
  MessageSquareText,
  AlertTriangle,
} from "lucide-react";

interface ChatbotProps {
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen: externalIsOpen, onToggle }) => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // Use external control if provided, otherwise use internal state
  const isChatOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  
  const setIsChatOpen = (open: boolean) => {
    if (onToggle) {
      onToggle(open);
    } else {
      setInternalIsOpen(open);
    }
  };

  useEffect(() => {
    if (isChatOpen) {
      chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages, isChatOpen]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    setMessages((prev) => [...prev, { text: message, sender: "user" }]);
    setUserMessage("");

    try {
      const res = await axios.post("http://localhost:5000/chat", { message });
      setMessages((prev) => [...prev, { text: res.data.reply, sender: "bot" }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { text: "⚠️ Server Error. Please try again later.", sender: "bot" },
      ]);
    }
  };

  const confirmNewChat = () => setShowConfirmReset(true);

  const handleNewChat = () => {
    setMessages([]);
    setShowConfirmReset(false);
  };

  return (
    <div className="fixed bottom-12 right-6 z-50">
      {!isChatOpen ? (
        <button
          onClick={() => setIsChatOpen(true)}
          className="w-14 h-14 rounded-full bg-black text-white flex items-center justify-center shadow-lg hover:bg-grey-800 transition"
          title="Open Chat"
        >
          <MessageSquareText size={24} />
        </button>
      ) : (
        <div className="relative">
          <div className="w-80 h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden border">
            {/* Header */}
            <div className="bg-black text-white flex items-center justify-between px-4 py-3 rounded-t-2xl">
              <div className="flex items-center gap-2 font-semibold">
                <Bot size={20} />
                AI Assistant
              </div>
              <div className="flex gap-2">
                <button onClick={confirmNewChat} title="New Chat">
                  <RefreshCw size={18} />
                </button>
                <button onClick={() => setIsChatOpen(false)} title="Close Chat">
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat messages */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-2 bg-grey-50"
              ref={chatBoxRef}
            >
              {messages.length === 0 ? (
                <div className="text-sm text-grey-500 text-center mt-10">
                  Start a conversation 👋
                </div>
              ) : (
                messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`px-4 py-2 rounded-xl max-w-[75%] text-sm ${
                        msg.sender === "user"
                          ? "bg-red-600 text-white rounded-br-none"
                          : "bg-grey-200 text-black rounded-bl-none"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-grey-200 flex items-center gap-2 bg-white">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage(userMessage)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 rounded-full border bg-grey-100 text-sm focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <button
                onClick={() => sendMessage(userMessage)}
                className="text-black hover:text-grey-600 transition"
                title="Send"
              >
                <Send size={20} />
              </button>
            </div>
          </div>

          {/* Confirm Modal */}
          {showConfirmReset && (
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-center rounded-2xl">
              <div className="bg-white w-full p-4 rounded-t-2xl shadow-lg">
                <div className="flex items-center gap-2 mb-3 text-yellow-700">
                  <AlertTriangle size={18} />
                  <span className="font-semibold text-sm">Start a new chat?</span>
                </div>
                <div className="text-xs text-gray-600 mb-4">
                  This will clear your current conversation.
                </div>
                <div className="flex justify-end gap-2 text-sm">
                  <button
                    onClick={() => setShowConfirmReset(false)}
                    className="px-4 py-1.5 rounded-full bg-grey-200 hover:bg-grey-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleNewChat}
                    className="px-4 py-1.5 rounded-full bg-black text-white hover:bg-grey-800 transition"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Chatbot;
