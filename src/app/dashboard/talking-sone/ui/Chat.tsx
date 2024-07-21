"use client";
import { useState, useEffect, useRef } from "react";
import { useActions } from "ai/rsc";
import { ClientMessage } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { generateId } from "ai";
import KaiMessage from "./Messages/KaiMessage";
import UserMessage from "./Messages/UserMessage";
import "animate.css";
import Image from "next/image";

interface ChatProps {
  initialMessages: ClientMessage[];
}

export default function Chat({ initialMessages = [] }: ChatProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ClientMessage[]>(initialMessages);
  const { submitMessage } = useActions();

  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmission = async () => {
    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: generateId(10),
        isKaiMessage: false,
        text: input,
      },
    ]);
    const response = await submitMessage(input);

    setMessages((currentMessages) => [...currentMessages, response]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-full md:h-[calc(100vh-150px)]">
      <div className="flex-grow p-4 overflow-y-scroll">
        <div className="pb-5">
          <KaiMessage text="Hola Mi nombre es Kai, este es un espacio seguro en el que puedes decir todo lo que quieras y yo trataré de brindarte consuelo" />
        </div>
        <Image
          src="/koala_message.jpg"
          className="md:ml-[72px] rounded-xl"
          alt="koala_message"
          height={250}
          width={250}
        />
        {messages.map((message) =>
          message.isKaiMessage ? (
            <KaiMessage key={message.id} text={message.text} />
          ) : (
            <UserMessage key={message.id} text={message.text} />
          )
        )}
      </div>
      <div ref={messagesEndRef} />
      <div className="sticky bottom-0 w-full bg-white dark:bg-[#181a1b] p-4 border-t dark:border-[#363b3d]">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Type your feelings..."
            className="flex-grow dark:bg-[#27272a] bg-white text-black"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmission();
              }
            }}
          />
          <Button variant="dark" onClick={handleSubmission}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
