"use client";

import { useState } from "react";
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

export default function RegisterPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirect") || "/";

    // role state (UI control এর জন্য)
    const [role, setRole] = useState("seeker");

    const plan = role === 'seeker' ? 'seeker_free' : 'recruiter_free';

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        // console.log("Form Data:", data); // এখানে role থাকবে
        // console.log("Role State:", role);

        const { data: userData, error } = await authClient.signUp.email({
            email: data.email,
            password: data.password,
            name: data.name,
            role: data.role, // ✅ directly form থেকে
            image: data.image,
            plan,
        });

        // console.log("User Data:", userData);

        if (!error) {
            toast.success("Registration successful!");
            router.push(redirectTo);
        } else {
            console.error(error);
            toast.error("Registration failed");
        }
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
                <h1 className="text-2xl font-semibold text-center">
                    Create Account
                </h1>

                {/* Name */}
                <TextField isRequired name="name">
                    <Label className="text-gray-300">Full Name</Label>
                    <Input placeholder="John Doe" />
                    <FieldError />
                </TextField>

                {/* Email */}
                <TextField isRequired name="email" type="email">
                    <Label className="text-gray-300">Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>

                {/* Image */}
                <TextField name="image">
                    <Label className="text-gray-300">Image URL</Label>
                    <Input placeholder="https://example.com/avatar.png" />
                    <Description className="text-gray-400">
                        Optional profile picture
                    </Description>
                    <FieldError />
                </TextField>

                {/* Password */}
                <TextField isRequired name="password" type="password">
                    <Label className="text-gray-300">Password</Label>
                    <Input placeholder="Enter your password" />
                    <FieldError />
                </TextField>

                {/* ✅ ROLE (100% WORKING) */}
                <div className="flex flex-col gap-2">
                    <Label className="text-gray-300">Select Role</Label>

                    <div className="flex gap-6 text-white">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="role"
                                value="seeker"
                                checked={role === "seeker"}
                                onChange={() => setRole("seeker")}
                            />
                            Job Seeker
                        </label>

                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="role"
                                value="recruiter"
                                checked={role === "recruiter"}
                                onChange={() => setRole("recruiter")}
                            />
                            Recruiter
                        </label>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <Button type="submit" className="w-full bg-white text-black">
                        <Check />
                        Register
                    </Button>

                    <Button type="reset" variant="secondary" className="w-full">
                        Reset
                    </Button>
                </div>

                {/* Divider */}
                <div className="flex items-center gap-3 text-gray-400">
                    <div className="flex-1 h-px bg-white/10" />
                    OR
                    <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Google */}
                <Button type="button" className="w-full bg-white text-black">
                    Continue with Google
                </Button>

                {/* Login */}
                <p className="text-center text-sm text-gray-400">
                    Already have an account?{" "}
                    <Link
                        href={`/auth/login?redirect=${redirectTo}`}
                        className="text-indigo-400"
                    >
                        Login
                    </Link>
                </p>
            </Form>
        </div>
    );
}