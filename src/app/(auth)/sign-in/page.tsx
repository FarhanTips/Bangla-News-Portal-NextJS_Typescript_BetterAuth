

"use client";
import type { SyntheticEvent } from "react";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";



export default function SignUpPage() {

    const router = useRouter();

    const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user: Record<string, string> = {};

        // Convert FormData to plain object
        formData.forEach((value, key) => {
            user[key] = value.toString();
        });
        console.log("Data from form", user);

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
            // callbackURL: "/"  // Callback redirect করলে page navigation-এর কারণে toast একদম অল্প সময়ের জন্য দেখা যায়, তাই toast.success-এর পর router.push() দিয়ে redirect করছি।
        });

        console.log("After form submission", data, error);
        if (error) {
            toast.error(error.message);
            return;
        }
        toast.success("সাইন ইন সফল হয়েছে!");
        router.push("/"); // Client-side event handler থেকে navigate করছি, তাই router.push ব্যবহার করেছি।
    };

    const handleGoogleSignIn = async () => {
        const { error } = await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
            // errorCallbackURL: "/sign-in",
        });

        if (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className=" flex justify-center px-4 py-10">
            <div className="w-full max-w-md rounded-2xl">

                <h1 className="mb-2 text-center text-2xl font-bold text-red-700">
                    সাইন ইন
                </h1>

                <p className="mb-8 text-center text-sm text-gray-500">
                    আপনার অ্যাকাউন্টে প্রবেশ করুন
                </p>

                <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "অনুগ্রহ করে সঠিক ইমেইল ঠিকানা লিখুন";
                            }

                            return null;
                        }}
                    >
                        <Label>ইমেইল</Label>
                        <Input className="border border-gray-300 rounded-sm" placeholder="ইমেইল লিখুন" />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        name="password"
                        type="password">
                        <Label>পাসওয়ার্ড</Label>
                        <Input className="border border-gray-300 rounded-sm" placeholder="পাসওয়ার্ড লিখুন" />
                        <FieldError />
                    </TextField>

                    <div className="flex gap-2 pt-2">
                        <Button
                            type="submit"
                            className="text-sm w-full rounded-sm bg-red-700 py-3 font-semibold text-white shadow-md shadow-red-700/20 transition-colors hover:bg-red-800"
                        >
                            সাইন ইন করুন
                        </Button>


                    </div>
                </Form>
                <div className="mt-5 text-center text-sm text-gray-500">
                    <p>অ্যাকাউন্ট নেই? <Link href="/sign-up" className="text-red-700 hover:underline font-semibold">সাইন আপ করুন</Link></p>
                </div>
                
                <div className="mt-5 text-center text-sm">
                    <p className="text-gray-500 text-base">------------ অথবা ------------</p>
                    <Button onClick={handleGoogleSignIn} className={"w-full border border-gray-400 p-2 rounded-md bg-white hover:bg-red-700 text-black hover:text-white mt-3"}>Google দিয়ে সাইন ইন করুন</Button>
                </div>

            </div>
        </div>
    );
}