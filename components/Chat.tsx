"use client";

import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/16/solid";

type Props = {
    chatId: string;
};

function Chat({ chatId }: Props) {
    const { data: session } = useSession();

    const [messages] = useCollection(session && query(
        collection(db, 'users', session?.user?.email!, "chats", chatId, "messages"),
        orderBy("createdAt", "asc")))

    return (
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4">
            {messages?.empty && (
                <div className="flex flex-col items-center justify-center mt-10">
                    <p className="text-center text-gray-600">
                        Type a prompt below to get started!
                    </p>
                    <ArrowDownCircleIcon className="h-10 w-10 mt-3 animate-bounce text-gray-600" />
                </div>
            )}
            {messages?.docs.map((message) => (<Message key={message.id} message={message.data()} />))}
        </div>
    );
}

export default Chat;
