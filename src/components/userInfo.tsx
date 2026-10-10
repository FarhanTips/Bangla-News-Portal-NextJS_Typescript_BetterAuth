"use client";

import { authClient } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import Link from 'next/link';
import { useRouter } from "next/navigation";

const UserInfo = () => {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();
    console.log(session);

    if (isPending) {
        return (
            <div>
                Loading
            </div>
        );
    }
    
    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/sign-in"); // redirect to login page. // Client-side event handler থেকে navigate করছি, তাই router.push ব্যবহার করেছি।
                },
            },
        });
    };

    return (

        <div className="ml-auto">
            {
                session?.user ?
                    <div className='flex items-center justify-end gap-3'>
                        <p className='font-semibold'>Welcome! <span className='text-red-700'>{session.user?.name}</span></p>
                        <Button onClick={handleSignOut} className="px-3.5 py-1.5 rounded-sm bg-white text-black border hover:bg-red-700 hover:text-white">সাইন আউট</Button>
                    </div>
                    :
                    <div className='flex items-center justify-end gap-3'>
                        <Link
                            href="/sign-in"
                            className="px-4 py-2 rounded-md border border-gray-300 hover:text-red-700 border-none"
                        >
                            সাইন ইন
                        </Link>

                        <Link
                            href="/sign-up"
                            className="px-3.5 py-1.5 rounded-md bg-red-700 text-white hover:bg-red-800"
                        >
                            সাইন আপ
                        </Link>
                    </div>
            }
        </div>

    );
};

export default UserInfo;