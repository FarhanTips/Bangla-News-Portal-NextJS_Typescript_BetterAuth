import Image from "next/image";
import Link from "next/link";


export interface ArticleType {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    imageAlt: string;
    category: string;
    firstPublished: string;
    rank?: number;
}

const MainNews = async () => {

    const res = await fetch("https://news-api-v2.vercel.app/api/news/sections", { next: { revalidate: 300 } });
    const sections = await res.json();
    const data = sections.data[0];
    const articles: ArticleType[] = data.articles.slice(0, 5);
    const [firstNews, ...remainingNews] = articles;
    // console.log(articles);

    return (
        <div className="flex gap-5 ">
            <Link href={`/articleDetails/${firstNews.id}`}>
                <div className="card bg-base-100 w-96 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:text-red-700">
                    <figure>
                        <Image
                            src={firstNews.imageUrl}
                            alt={firstNews.imageAlt}
                            width={600} height={600} />
                    </figure>
                    <div className="card-body">
                        <h2 className=" text-red-700 font-semibold text-sm">{firstNews.category}</h2>
                        <h2 className="card-title font-bold text-xl">{firstNews.title}</h2>
                        <p className="text-justify text-gray-600">{firstNews.description}</p>
                        <span className="text-gray-400 text-xs">
                            {
                                new Date(firstNews.firstPublished).toLocaleString("bn-BD", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true,
                                    timeZone: "Asia/Dhaka",
                                })
                            }
                        </span>

                    </div>

                </div>
            </Link>


            <div className="space-y-2.5">
                {
                    remainingNews.map((oNews) => (
                        <Link key={oNews.id} href={`/articleDetails/${oNews.id}`} className="block">
                            <div className="card w-96 card-sm border border-gray-300 bg-base-100 shadow-sm hover:bg-gray-100">
                                <div className="card-body">
                                    <h2 className="text-sm font-semibold text-red-700">
                                        {oNews.category}
                                    </h2>
                                    <p className="text-[16px] font-semibold">
                                        {oNews.title}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
};

export default MainNews;