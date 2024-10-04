'use client';
import Loading from "@/components/Loading/Loading";
import { createUser } from "@/lib/users.service";
import { useRouter } from "next/navigation";
import React, { Suspense, useState } from "react";
import SignupLoading from "./loading";

const Signup = () => {
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleSubmit = async () => {
        const datas = {
            username: username,
            email: email,
            password: password,
            icon: ''
        };
        try {
            const res = await createUser(datas);
            console.log('res', res);
            router.push('/signIn');
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <Suspense fallback={<SignupLoading />}>
            <div className="w-full flex flex-col items-center justify-center px-4 py-2 gap-y-4">
                <div className="w-full flex flex-col justify-start">
                    <h1 className="text-xl font-medium text-[#22d3ee] mb-2">Sign Up</h1>
                    <span className="text-md font-normal text-gray-500">Please enter your details</span>
                </div>
                <div className="w-full flex flex-col border-b border-gray-500 pb-5 gap-y-4">
                    <div className="w-full flex flex-col justify-start gap-y-2">
                        <label className="text-black text-md font-medium" htmlFor="username">Username</label>
                        <input 
                            onChange={(e) => setUsername(e.target.value)} 
                            value={username} 
                            className="w-full bg-[#E4E4E5] text-gray-500 border-2 border-gray-500 rounded-lg px-2 py-1 focus:outline-blue-500" 
                            type="text" 
                            id="username" 
                            name="username" 
                        />
                    </div>
                    <div className="w-full flex flex-col justify-start gap-y-2">
                        <label className="text-black text-md font-medium" htmlFor="email">Email</label>
                        <input 
                            onChange={(e) => setEmail(e.target.value)} 
                            value={email} 
                            className="w-full bg-[#E4E4E5] text-gray-500 border-2 border-gray-500 rounded-lg px-2 py-1 focus:outline-blue-500" 
                            type="email" 
                            id="email" 
                            name="email" 
                        />
                    </div>
                    <div className="w-full flex flex-col justify-start gap-y-2">
                        <label className="text-black text-md font-medium" htmlFor="password">Password</label>
                        <input 
                            onChange={(e) => setPassword(e.target.value)} 
                            value={password} 
                            className="w-full bg-[#E4E4E5] text-gray-500 border-2 border-gray-500 rounded-lg px-2 py-1 focus:outline-blue-500" 
                            type="password" 
                            id="password" 
                            name="password" 
                        />
                    </div>
                </div>
                <div className="w-full flex justify-start gap-y-3 flex flex-col mt-5">
                    <button 
                        onClick={handleSubmit} 
                        className="w-full bg-[#22d3ee] text-white font-medium text-md px-2 py-1 rounded-lg"
                    >
                        Sign Up
                    </button>
                    <p className="w-full text-center font-normal text-gray-500">Already have an account?</p>
                    <button 
                        onClick={() => router.push('/signIn')} 
                        className="w-full border border-[#22d3ee] text-[#22d3ee] font-medium text-md px-2 py-1 rounded-lg"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </Suspense>
    );
};

export default Signup;
