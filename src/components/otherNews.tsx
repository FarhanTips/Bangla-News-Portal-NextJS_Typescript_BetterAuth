import { ArticleType } from "./mainNews";
import NewsCard from "./newsCard";


interface NewsSectionType {
    title: string;
    curationId: string;
    articles: ArticleType[];
}

const OtherNews = async () => {

    const res = await fetch("https://news-api-v2.vercel.app/api/news/sections", { next: { revalidate: 300 } });
    const sections = await res.json();
    const data: NewsSectionType[] = sections.data.slice(1);
    const filteredData = data.filter(d => d.articles.some(article => article.firstPublished !== null)
    );
    console.log(filteredData);
    return (
        <div>
            {
                filteredData.map(d =>
                    <div key={d.curationId}>
                        <p className="border-b-red-600 border-b-2 mb-4 pb-2 mt-8 text-lg font-bold">{d.title}</p>

                        <div className="grid grid-cols-3 gap-4 items-stretch">
                            {
                                d.articles.slice(0, 6).map(a => <NewsCard key={a.id} a={a}></NewsCard>)
                            }
                        </div>
                    </div>)
            }
        </div>
    );
};

export default OtherNews;