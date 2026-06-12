"use client";

import { Check } from "@gravity-ui/icons";
import Link from "next/link";
import {
    Button,
    Description,
    FieldError,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();

    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirect') || '/';


    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        const { data: userData, error } = await authClient.signIn.email({
            email: data.email,
            password: data.password
        });

        if (!error) {
            toast.success("Login successful! Welcome back.");
            router.push(redirectTo);
        } else {
            toast.error("Login failed. Please check your credentials.");
        }
    };

    // 👉 Google login handler (connect later)
    const handleGoogleLogin = () => {
        // console.log("Google login clicked");
    };

    return (
        <div className="w-full md:w-100 mx-auto flex items-center justify-center
         bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#2a2a2a] rounded-2xl px-4 mt-10">

            <Form
                className="w-full md:w-96 mx-auto flex flex-col gap-5 
        bg-white/5 backdrop-blur-xl 
        border border-white/10 
        text-white 
        p-6 rounded-2xl shadow-xl"
                onSubmit={onSubmit}
            >

                {/* Title */}
                <h1 className="text-2xl font-semibold text-center">
                    Login to Your Account
                </h1>

                {/* Email */}
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                        ) {
                            return "Please enter a valid email";
                        }
                        return null;
                    }}
                >
                    <Label className="text-gray-300">Email</Label>
                    <Input className="bg-white/5 border-white/10 text-white" placeholder="john@example.com" />
                    <FieldError />
                </TextField>

                {/* Password */}
                <TextField
                    isRequired
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Must include at least 1 uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Must include at least 1 number";
                        }
                        return null;
                    }}
                >
                    <Label className="text-gray-300">Password</Label>
                    <Input className="bg-white/5 border-white/10 text-white" placeholder="Enter your password" />
                    <FieldError />
                </TextField>
                {/* Buttons */}
                <div className="flex gap-3">
                    <Button
                        type="submit"
                        className="w-full bg-white text-black hover:bg-gray-200"
                    >
                        Login
                    </Button>

                    <Button
                        type="reset"
                        variant="secondary"
                        className="w-full border border-white/20 text-white hover:bg-white/10"
                    >
                        Reset
                    </Button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 text-gray-400">
                    <div className="flex-1 h-px bg-white/10" />
                    OR
                    <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Google Login */}
                <Button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full bg-white text-black hover:bg-gray-200"
                >
                    Continue with Google
                </Button>

                {/* Login Redirect */}
                <p className="text-center text-sm text-gray-400">
                    Don't have an account?{" "}
                    <Link
                        href={`/auth/register?redirect=${redirectTo}`}
                        className="text-indigo-400 hover:text-indigo-300"
                    >
                        Register
                    </Link>
                </p>
            </Form>
        </div>
    );
}