import { DocumentData } from 'firebase/firestore'
import React from 'react'

type Props = {
    message: DocumentData; // Type definition for Props - message is of type DocumentData (Propsの型定義 - messageはDocumentData型)
};

function Message({ message }: Props) {
    // Check if the message is from ChatGPT (メッセージがChatGPTからのものかどうかを確認)
    const isChatGPT = message.user.name === "ChatGPT";
    // Determine the alignment class for the message (メッセージの配置クラスを決定)
    const alignmentClass = isChatGPT ? "justify-start" : "justify-end";
    // Determine the alignment class for the avatar (アバターの配置クラスを決定)
    const avatarAlignmentClass = isChatGPT ? "ml-0 mr-2" : "mr-0 ml-2";

    return (
        <div className={`py-2 flex items-start md:items-center ${alignmentClass} mb-4`}>
            {/* If the message is from ChatGPT */}
            {isChatGPT && (
                <img src={message.user.avatar} alt="" className={`h-8 w-8 rounded-full ${avatarAlignmentClass}`} />
            )}
            {/* Display the message */}
            <div className={`max-w-[70%] rounded-lg ${isChatGPT ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"} shadow-md p-3 md:p-4`}>
                <p className="text-sm">{message.text}</p>
            </div>
            {/* If the message is not from ChatGPT */}
            {!isChatGPT && (
                <img src={message.user.avatar} alt="" className={`h-8 w-8 rounded-full ${avatarAlignmentClass}`} />
            )}
        </div>
    );
}

export default Message;