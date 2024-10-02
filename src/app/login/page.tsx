'use client'
import { Suspense, useState } from "react";
import { loginUser } from "@/lib/users.service";
import { useRouter } from "next/navigation";
import LoginLoading from "./loading";
import Image from "next/image";
import back from "@/assets/caret_whtie.svg"

interface StepOneProps {
    email: string;
    setEmail: (email: string) => void;    
    emailError: string;
    setEmailError: (emailError: string) => void
    nextStep: () => void;
}

interface StepTwoProps {
    email: string;
    password: string;
    setPassword: (password: string) => void;
    passwordError: string;
    handleSignIn: () => void;
}

const StepOne: React.FC<StepOneProps> = ({ email, setEmail, emailError, setEmailError, nextStep }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);

        if (!emailRegex.test(value)) {
            setEmailError("Invalid email address");
        } else {
            setEmailError("");
        }
    };

    return (
        <div className="w-full flex flex-col justify-start gap-y-2">
            <input
                onChange={handleEmailChange}
                value={email}
                className={`w-full bg-[#E4E4E5] text-gray-500 border-2  rounded-lg px-2 py-1 focus:outline-none ${emailError ? 'border-red-500' : 'border-[#0ea5e9]'}`}
                type="email"
                id="email"
                name="email"
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

            <button
                onClick={nextStep}
                className={`w-full text-white font-medium text-md px-2 py-1 rounded-lg mt-2 ${!emailError && email ? 'bg-[#22d3ee]' : 'bg-gray-400 cursor-not-allowed'}`}
                disabled={!!emailError || !email}
            >
                Next
            </button>
        </div>
    );
};

const StepTwo: React.FC<StepTwoProps> = ({ email, password, setPassword, passwordError, handleSignIn }) => {
    return (
        <div className="w-full flex flex-col justify-start gap-y-2">
            <div className="text-md text-gray-700">
                Signing in as <strong>{email}</strong>
            </div>

            <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className={`w-full bg-[#E4E4E5] text-gray-500 border-2 rounded-lg px-2 py-1 focus:outline-none ${passwordError ? 'border-red-500' : 'border-[#0ea5e9]'}`}
                type="password"
                id="password"
                name="password"
            />

            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

            <button
                onClick={handleSignIn}
                className="w-full bg-[#22d3ee] text-white font-medium text-md px-2 py-1 rounded-lg mt-2"
            >
                Sign In
            </button>
        </div>
    );
};

const Login = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [step, setStep] = useState<number>(1);
    const [emailError, setEmailError] = useState<string>(''); 
    const [passwordError, setPasswordError] = useState<string>('');

    const router = useRouter();

    const handleBack = () => {
        setPassword('')
        setStep(1)
    }

    const handleSignIn = async () => {
        const datas = {
            email: email,
            password: password,
        };
        try {
            const res = await loginUser(datas);
            console.log('res', res);
            if (res.success) {
                router.push('/home');
            } else {
                setPasswordError(res.error)
            }
        } catch (e) {                
            console.log('error', e);
        }
    };
    return (
        <Suspense fallback={<LoginLoading />}>
            <div
                className="w-full h-screen flex flex-col items-center justify-start px-4 py-2 text-black gap-y-3"
            >
                <div className={`w-full md:w-[50%] bg-[#cbd5e1] flex flex-col justify-start mt-[100px] p-8 border-2 ${emailError || passwordError ? 'border-red-500' : 'border-[#0ea5e9]'} rounded-lg`}>
                    <h1 className={`text-xl font-medium mb-1 ${emailError || passwordError ? 'text-red-500' : 'text-[#0ea5e9]'}`}>Sign In</h1>
                    <span className="text-md font-normal text-gray-500 mb-4">Please enter your {step === 1 ? 'email' : 'password'}</span>

                    {step === 1 && (
                        <StepOne 
                            email={email} 
                            setEmail={setEmail} 
                            emailError={emailError}
                            setEmailError={setEmailError}
                            nextStep={() => setStep(2)} 
                        />
                    )}

                    {step === 2 && (
                        <StepTwo 
                            email={email} 
                            password={password} 
                            setPassword={setPassword} 
                            passwordError={passwordError}
                            handleSignIn={handleSignIn} 
                        />
                    )}
                </div>
                {step === 2 && 
                    <button onClick={handleBack} className="flex items-center py-1 px-2 rounded-lg text-white bg-[#22d3ee]">                    
                        <Image src={back} alt="back" />
                        <p>Back to Email ?</p>
                    </button>
                }

            </div>
        </Suspense>
    );
};

export default Login;
