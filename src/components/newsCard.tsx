import Image from "next/image";
import { ArticleType } from "./mainNews";

interface NewsCardProps {
    a: ArticleType;
}

const NewsCard = ({ a }: NewsCardProps) => {
    return (
        <div className="h-full min-w-0">
            <div className="group flex h-full flex-col overflow-hidden rounded-lg bg-base-100 shadow-sm hover:border-red-200 hover:border hover:text-red-700">

                <figure className="shrink-0 overflow-hidden">
                    <Image
                        src={a.imageUrl}
                        alt={a.imageAlt}
                        width={600}
                        height={600}
                        className="block h-auto w-full transition-transform duration-300 group-hover:scale-105"
                    />
                </figure>


                <div className="flex flex-1 flex-col p-3">
                    <h2 className="mb-1 text-xs font-semibold text-red-700">
                        {a.category}
                    </h2>

                    <h2 className="mb-2 text-[16px] font-semibold">
                        {a.title}
                    </h2>

                    <p className="line-clamp-2 text-gray-600 text-sm ">
                        {a.description}
                    </p>

                    <span className=" pt-3 text-xs text-gray-400">
                        {a.firstPublished
                            ? new Date(a.firstPublished).toLocaleString("bn-BD", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                                timeZone: "Asia/Dhaka",
                            })
                            : ""}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;