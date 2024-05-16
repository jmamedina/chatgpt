'use client'

import { signIn } from "next-auth/react";
import Image from "next/image";

function Login() {
    return (
        <div className="bg-[#bddae5] h-screen flex flex-col items-center justify-center text-center">
            <Image src={'/assets/images/Jose.png'} width={300} height={300} alt="logo" />
            <button onClick={() => signIn('google')} className="text-gray-700 font-bold text-3xl animate-pulse"> Sign In to Use JoseGPT </button>
        </div>
    )
}

export default Login