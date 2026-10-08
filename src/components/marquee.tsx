
import Link from 'next/link';
import React from 'react';
import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"


interface HeadLineType {
  id: string;
  title: string;
}

const Marquee = async () => {
    const res = await fetch("https://news-api-v2.vercel.app/api/news?limit=10", { next: { revalidate: 60 } });
    const data = await res.json();
    const headLines: HeadLineType[] = data.data;
    return (
        <div className='bg-red-700  text-white mt-4 sticky top-0 z-50'>

            <div className='flex w-11/13 mx-auto items-center'>
                <p className='bg-red-800 px-4 py-2 text-sm font-bold'>সর্বশেষ</p>

                <MarqueeText direction="right" duration={15}>
                    {
                        headLines.map(h => <span key={h.id}>
                            <Link href="" className='py-2 text-sm hover:underline'>{h.title}</Link>
                            <span className='mx-5 text-red-400'>•</span>
                        </span>)
                    }
                </MarqueeText>
            </div>

        </div>
    );
};

export default Marquee;