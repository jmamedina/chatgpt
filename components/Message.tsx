import { DocumentData } from 'firebase/firestore'
import React from 'react'



type Props = {
    message: DocumentData;
};


function Message({ message }: Props) {
    const isChatGPT = message.user.name === "ChatGPT";
    const alignmentClass = isChatGPT ? "justify-start" : "justify-end";
    const avatarAlignmentClass = isChatGPT ? "ml-0 mr-2" : "mr-0 ml-2";

    return (
        <div className={`py-2 flex items-start md:items-center ${alignmentClass} mb-4`}>
            {isChatGPT && (
                <img src={message.user.avatar} alt="" className={`h-8 w-8 rounded-full ${avatarAlignmentClass}`} />
            )}
            <div className={`max-w-[70%] rounded-lg ${isChatGPT ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"} shadow-md p-3 md:p-4`}>
                <p className="text-sm">{message.text}</p>
            </div>
            {!isChatGPT && (
                <img src={message.user.avatar} alt="" className={`h-8 w-8 rounded-full ${avatarAlignmentClass}`} />
            )}
        </div>
    );
}



export default Message