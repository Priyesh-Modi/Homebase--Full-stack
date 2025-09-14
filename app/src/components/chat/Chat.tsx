import React, { useContext, useEffect, useRef, useState } from "react";
import "./chat.scss";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { format } from "timeago.js";
import { SocketContext } from "../../context/SocketContext";
import { useNotificationStore } from "../../lib/notificationStore";

interface Chat {
  id: string;
  seenBy: string[];
  receiver: {
    id: string;
    avatar: string;
    username: string;
  };
  messages: Message[];
  lastMessage?: string;  // Adding `lastMessage` if it is needed
}

interface Message {
  id: string;
  userId: string;
  text: string;
  createdAt: string;
  chatId: string; // Ensure chatId exists in Message
}

interface ChatProps {
  chats: Chat[];
}

function Chat({ chats }: ChatProps): JSX.Element {
  const [chat, setChat] = useState<Chat | null>(null);
  const { currentUser } = useContext(AuthContext);
  const { socket } = useContext(SocketContext); // socket could be null here

  const messageEndRef = useRef<HTMLDivElement>(null);
  const decrease = useNotificationStore((state) => state.decrease);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleOpenChat = async (id: string, receiver: Chat["receiver"]) => {
    try {
      const res = await apiRequest.get<Chat>(`/chats/${id}`);
      if (currentUser && !res.data.seenBy.includes(currentUser.id)) {
        decrease();
      }
      setChat({ ...res.data, receiver });
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const text = formData.get("text") as string;
    if (!text || !chat) return; // Ensure text is a string and chat exists

    try {
      const res = await apiRequest.post<Message>(`/messages/${chat.id}`, { text });
      setChat((prev) => prev ? ({ ...prev, messages: [...prev.messages, res.data] }) : null);
      e.currentTarget.reset();
      if (socket) {
        socket.emit("sendMessage", {
          receiverId: chat.receiver.id,
          data: res.data,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const read = async () => {
      if (!chat) return; // Ensure chat is not null
      try {
        await apiRequest.put(`/chats/read/${chat.id}`);
      } catch (err) {
        console.log(err);
      }
    };

    if (chat && socket) {
      socket.on("getMessage", (data: Message) => {
        if (chat.id === data.chatId) {
          setChat((prev) => prev ? ({ ...prev, messages: [...prev.messages, data] }) : null);
          read();
        }
      });
    }
    return () => {
      socket?.off("getMessage");
    };
  }, [socket, chat]);

  return (
      <div className="chat">
        <div className="messages">
          <h1>Messages</h1>
          {chats.map((c) => (
              <div
                  className="message"
                  key={c.id}
                  style={{
                    backgroundColor:
                        currentUser && chat && (c.seenBy.includes(currentUser.id) || chat.id === c.id)
                            ? "white"
                            : "#fecd514e",
                  }}
                  onClick={() => handleOpenChat(c.id, c.receiver)}
              >
                <img src={c.receiver.avatar || "/noavatar.jpg"} alt="" />
                <span>{c.receiver.username}</span>
                <p>{c.lastMessage || ""}</p> {/* Check for `lastMessage` */}
              </div>
          ))}
        </div>
        {chat && (
            <div className="chatBox">
              <div className="top">
                <div className="user">
                  <img src={chat.receiver.avatar || "noavatar.jpg"} alt="" />
                  {chat.receiver.username}
                </div>
                <span className="close" onClick={() => setChat(null)}>
                  X
                </span>
              </div>
              <div className="center">
                {chat.messages.map((message) => (
                    <div
                        className="chatMessage"
                        style={{
                          alignSelf:
                              message.userId === currentUser?.id ? "flex-end" : "flex-start",
                          textAlign: message.userId === currentUser?.id ? "right" : "left",
                        }}
                        key={message.id}
                    >
                      <p>{message.text}</p>
                      <span>{format(message.createdAt)}</span>
                    </div>
                ))}
                <div ref={messageEndRef}></div>
              </div>
              <form onSubmit={handleSubmit} className="bottom">
                <textarea name="text"></textarea>
                <button>Send</button>
              </form>
            </div>
        )}
      </div>
  );
}

export default Chat;
