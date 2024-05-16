"use client";

// Import Firebase-related libraries
import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import ModelSelection from "./ModelSelection";

// Define Props type
type Props = {
    chatId: string
}

// Definition of the ChatInput component
function ChatInput({ chatId }: Props) {
    // State to manage the prompt
    const [prompt, setPrompt] = useState("");
    // Get the user session
    const { data: session } = useSession();

    // Define the model to be used
    const model = "gpt-3.5-turbo-instruct";

    // Function to send messages
    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!prompt) return;

        // Trim the input
        const input = prompt.trim();
        setPrompt("");

        // Construct the message object
        const message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name}`
            }
        }

        // Add the message to Firestore
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

        // Send the prompt to the backend for processing
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

    // Rendering of the ChatInput component
    return (
        <div className="bg-white/50 text-gray-800 rounded-lg text-sm shadow-md">
            <form onSubmit={sendMessage} className="p-4 space-x-4 flex items-center">
                <input
                    className="bg-transparent focus:outline-none flex-1 text-gray-800"
                    disabled={!session}
                    value={prompt}
                    onChange={e => setPrompt(e.target.value)}
                    type="text"
                    placeholder="Type your message here..." // ここにメッセージを入力してください...
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

// Export the ChatInput component
export default ChatInput
