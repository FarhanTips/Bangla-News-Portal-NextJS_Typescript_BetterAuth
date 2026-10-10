

"use client";
import type { SyntheticEvent } from "react";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { redirect } from "next/navigation";

export default function SignUpPage() {

    const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user: Record<string, string> = {};

        // Convert FormData to plain object
        formData.forEach((value, key) => {
            user[key] = value.toString();
        });
        console.log("Data from form", user);

        const { data, error } = await authClient.signUp.email({
            name: user.name,
            email: user.email,
            password: user.password,
        });

        console.log("After form submission", data, error);
        if (error) {
            toast.error(error.message);
            // তোমার signup form-এ onSubmit handler-এর মধ্যে toast call করেছিলে। সেটা user-এর submit event-এর response-এ চলে, component rendering-এর মধ্যে নয়। তাই সেখানে এই নির্দিষ্ট সমস্যাটি হয় না।
            return;
        }
        toast.success("আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! সাইন ইন করুন");
        redirect("/sign-in"); // Client-side event handler থেকে navigate করছি, তাই router.push ব্যবহার উচিৎ। কিন্তু redirect এখানে এমনি ব্যবহার করে পরিক্ষা করছি।
    };

    return (
        <div className=" flex justify-center px-4 py-10">
            <div className="w-full max-w-md rounded-2xl">

                <h1 className="mb-2 text-center text-2xl font-bold text-red-700">
                    সাইন আপ
                </h1>

                <p className="mb-8 text-center text-sm text-gray-500">
                    নতুন অ্যাকাউন্ট তৈরি করতে নিচের তথ্যগুলো পূরণ করুন
                </p>

                <Form className="flex w-full flex-col gap-5" onSubmit={onSubmit}>
                    <TextField
                        isRequired
                        name="name"
                        validate={(value) => {
                            if (value.length < 3) {
                                return "নামে অন্তত ৩টি অক্ষর থাকতে হবে";
                            }
                            return null;
                        }}
                    >
                        <Label>নাম</Label>
                        <Input className="border border-gray-300 rounded-sm" placeholder="আপনার নাম" />
                        <FieldError />
                    </TextField>
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
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "পাসওয়ার্ডে অন্তত ১ টি বড় হাতের ইংরেজি অক্ষর থাকতে হবে";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "পাসওয়ার্ডে অন্তত ১ টি সংখ্যা থাকতে হবে";
                            }

                            return null;
                        }}
                    >
                        <Label>পাসওয়ার্ড</Label>
                        <Input className="border border-gray-300 rounded-sm" placeholder="পাসওয়ার্ড লিখুন" />
                        <Description>
                            কমপক্ষে ৮ অক্ষর, যার মধ্যে অন্তত ১টি বড় হাতের অক্ষর ও ১টি সংখ্যা থাকতে হবে
                        </Description>
                        <FieldError />
                    </TextField>

                    <div className="flex gap-2 pt-2">
                        <Button
                            type="submit"
                            className="text-sm w-full rounded-sm bg-red-700 py-3 font-semibold text-white shadow-md shadow-red-700/20 transition-colors hover:bg-red-800"
                        >
                            সাইন আপ করুন
                        </Button>
                    </div>
                </Form>
                <div className="mt-5 text-center text-sm text-gray-500">
                    <p>অ্যাকাউন্ট আছে? <Link href="/sign-in" className="text-red-700 hover:underline font-semibold">সাইন ইন করুন</Link></p>
                </div>

            </div>
        </div>
    );
}