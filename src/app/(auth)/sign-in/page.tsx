

"use client";
import type { SyntheticEvent } from "react";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import Link from "next/link";

export default function SignUpPage() {
    const onSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data: Record<string, string> = {};

        // Convert FormData to plain object
        formData.forEach((value, key) => {
            data[key] = value.toString();
        });

        alert(`Form submitted with: ${JSON.stringify(data, null, 2)}`);
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

            </div>
        </div>
    );
}