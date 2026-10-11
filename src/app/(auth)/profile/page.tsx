
"use client"
import { authClient } from "@/lib/auth-client";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { SyntheticEvent, useState } from "react";
import { toast } from "sonner";


const ProfilePage = () => {

    const [show, setShow] = useState(false);

    const onSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user: Record<string, string> = {};

        // Convert FormData to plain object
        formData.forEach((value, key) => {
            user[key] = value.toString();
        });
        console.log("Data from form", user);

        const { data, error } = await authClient.updateUser({
            name: user.name,
        })
        console.log("After submission", data, error);
        if (error) {
            toast.error(error.message);
            return;
        }
        toast.success("নাম সফলভাবে পরিবর্তন হয়েছে!");
    };

    return (
        <div className="flex flex-col items-center justify-center px-4 py-10">
            <Button className="bg-white hover:border-red-800 rounded text-gray-600 font-bold border hover:border-2 px-8 border-gray-400 mb-10" onClick={() => setShow(!show)}>প্রোফাইল আপডেট করুন</Button>
            {
                show ?
                    <div className="w-full max-w-md rounded-2xl">

                        <h1 className="mb-2 mt-5 text-center text-xl font-bold text-red-700">
                            নাম পরিবর্তন ফর্ম
                        </h1>

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
                                <Label>নতুন নাম</Label>
                                <Input className="border border-gray-300 rounded-sm" placeholder="আপনার নাম" />
                                <FieldError />
                            </TextField>
                            <div className="flex gap-2 pt-2">
                                <Button
                                    type="submit"
                                    className="text-sm w-full rounded-sm bg-red-700 py-3 font-semibold text-white shadow-md shadow-red-700/20 transition-colors hover:bg-red-800"
                                >
                                    সাবমিট করুন
                                </Button>


                            </div>
                        </Form>


                    </div>
                    :
                    <div></div>
            }

        </div>
    );
};

export default ProfilePage;