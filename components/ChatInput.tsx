"use client";
import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import ModelSelection from "./ModelSelection";

type Props = {
    chatId: string
}

function ChatInput({ chatId }: Props) {
    const [prompt, setPrompt] = useState("");
    const { data: session } = useSession();

    const model = "gpt-3.5-turbo-instruct";

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!prompt) return;

        const input = prompt.trim();
        setPrompt("");

        const message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name}`
            }
        }

        await addDoc(collection(db,
            'users',
            session?.user?.email!,
            'chats',
            chatId,
            'messages'),
            message
        )

        //Toast notification
        const notification = toast.loading("Jose is thinking...");

        await fetch('/api/askQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input,
                chatId,
                model,
                session
            })
        }).then(() => {
            //Toast notification to say successful
            toast.success("ChatGPT has responded!", {
                id: notification,
            })
        });
    };


    return (
        <div className="bg-white/50 text-gray-800 rounded-lg text-sm shadow-md">
            <form onSubmit={sendMessage} className="p-4 space-x-4 flex items-center">
                <input
                    className="bg-transparent focus:outline-none flex-1 text-gray-800"
                    disabled={!session}
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    type="text"
                    placeholder="Type your message here..."
                />

                <button
                    disabled={!prompt || !session}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                    type="submit">
                    <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
                </button>
            </form>

            <div className="md:hidden">
                <ModelSelection />
            </div>
        </div>
    )
}

export default ChatInput
