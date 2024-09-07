'use client'
import { Suspense, useState } from "react";
import { loginUser } from "@/lib/users.service";
import { useRouter } from "next/navigation";
import Loading from "@/components/Loading/Loading";
import SignInLoading from "./loading";

const SignIn = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const router = useRouter();

    const handleSignIn = async () => {
      const datas = {
          email: email,
          password: password,
      }
        try {
            const res = await loginUser(datas)
            console.log('res', res)
            if(res){
              router.push('/') 
            }
        } catch (e) {
            console.log(e)
        }
    }
    console.log('email', email, 'password', password)
  return (
    <Suspense fallback={<SignInLoading />}>
      <div
        className="w-full flex flex-col items-center justify-center px-4 py-2 text-black gap-y-4"
      >
        <div className="w-full flex flex-col justify-start">
                  <h1 className="text-xl font-medium text-[#22d3ee] mb-2">Sign In</h1>
                  <span className="text-md font-normal text-gray-500">Please enter your details</span>
              </div>
        <div className="w-full flex flex-col justify-start gap-y-2">
          <label className="text-black text-md font-medium" htmlFor="email">Email</label>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className="w-full bg-[#E4E4E5] text-gray-500 border-2 border-gray-500 rounded-lg px-2 py-1 focus:outline-blue-500" type="email" id="email" name="email" />
        </div>
        <div className="w-full flex flex-col justify-start gap-y-2">
          <label className="text-black text-md font-medium" htmlFor="password">Password</label>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className="w-full bg-[#E4E4E5] text-gray-500 border-2 border-gray-500 rounded-lg px-2 py-1 focus:outline-blue-500" type="password" id="password" name="password" />
        </div>
        <button onClick={handleSignIn} className="w-full bg-[#22d3ee] text-white font-medium text-md px-2 py-1 rounded-lg">Sign In</button>

      </div>
    </Suspense>
  )
}
export default SignIn