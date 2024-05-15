'use client'

import { useSession, signOut } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import NewChat from "./NewChat";
import { collection } from "firebase/firestore";
import { db } from "@/firebase";

function Sidebar() {
    const { data: session } = useSession();

    const [chats, loading, error] = useCollection(
        session && collection(db, 'users', session.user?.email!, 'chats')
    );

    console.log(chats);

    return <div className="p-2 flex flex-col h-screen">
        <div className="flex-1">
            <div>
                {/*newchat */}
                <NewChat />
                <div>
                    { /*modal selection */}
                </div>
                {/*map through chat rowss */}
            </div>
        </div>
        {session &&
            (<img onClick={() => signOut()}
                src={session.user?.image!}
                className="h-12 w-12 rounded-full cursor-pointer mx-auto hover:opacity-50" />
            )
        }
    </div>;
}

export default Sidebar