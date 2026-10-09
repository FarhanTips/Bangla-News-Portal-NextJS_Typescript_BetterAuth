"use client";

import { useEffect, useState } from "react";

export default function CurrentDate() {
    const [date, setDate] = useState("");

    useEffect(() => {
        const frameId = requestAnimationFrame(() => {
            setDate(
                new Date().toLocaleDateString("bn-BD", {
                    dateStyle: "full",
                })
            );
        });

        return () => cancelAnimationFrame(frameId);
    }, []);

    return <p className="text-[13px] text-gray-600">{date}</p>;
}
