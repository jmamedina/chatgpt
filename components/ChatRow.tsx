import { db } from "@/firebase";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/solid";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {
    id: string;
};

function ChatRow({ id }: Props) {
    const pathname = usePathname(); // Get the pathname (パスネームを取得)
    const router = useRouter(); // Get the router (ルーターを取得)
    const { data: session } = useSession(); // Get the session (セッションを取得)
    const [active, setActive] = useState(false); // State to manage active state (アクティブ状態を管理するステート)

    // Get the collection of messages (メッセージのコレクションを取得)
    const [messages] = useCollection(
        collection(db, 'users', session?.user?.email!, 'chats', id, 'messages'),
    );

    useEffect(() => {
        // If pathname is not available, exit the function (パスネームが存在しない場合は処理を終了)
        if (!pathname) return;

        // Set the active state based on the pathname (アクティブ状態をパスネームに基づいて設定)
        setActive(pathname.includes(id));
    }, [pathname]);

    // Function to remove the chat (チャットを削除する関数)
    const removeChat = async () => {
        await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id));
        router.replace('/');
    }

    return (
        // Chat link component (チャットリンクコンポーネント)
        <Link
            href={`/chat/${id}`} className={`chatRow justify-center ${active ? "bg-gray-200 text-gray-800" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"}`}>
            <ChatBubbleLeftIcon className="h-5 w-5" /> {/* Chat bubble icon (チャットバブルアイコン) */}
            <p className="flex-1 hidden md:inline-flex truncate">
                {/* Display the latest message (最新のメッセージを表示) */}
                {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"} </p>
            <TrashIcon onClick={removeChat} className="h-5 w-5 text-gray-700 hover:text-red-700" /> {/* Trash icon (ゴミ箱アイコン) */}

        </Link>
    );
};

export default ChatRow;
