
import Link from "next/link";
import { ArticleType } from "./mainNews";

const MostRead = async () => {

    const res = await fetch("https://news-api-v2.vercel.app/api/news/most-read", { next: { revalidate: 300 } }
    );
    const section = await res.json();
    const data: ArticleType[] = section.data;

    return (
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
            <p className="px-4 pt-3.5 text-lg font-bold text-red-700">সর্বাধিক পঠিত</p>
            {
                data.map((d) => (
                    <Link href={`/articleDetails/${d.id}`} key={d.id} className={`flex gap-3 px-4 py-2.5 transition-colors hover:bg-gray-50}`}>

                        <span className="text-lg font-bold text-red-700">
                            {d.rank}
                        </span>

                        <h3 className="cursor-pointer text-gray-800 transition-colors hover:text-red-700 font-bold">
                            {d.title}
                        </h3>
                    </Link>
                ))
            }
        </div>
    );
};

export default MostRead;