
import { ArticleType } from "@/components/mainNews";
import NewsCard from "@/components/newsCard";
export const instant = false;


interface CategoryNewsProps {
    params: Promise<{
        id: string;
    }>;
}

interface SectionType {
    title: string;
    data: ArticleType[];
}

const CategoryNews = async ({ params }: CategoryNewsProps) => {
    const { id } = await params;

    const res = await fetch(`https://news-api-v2.vercel.app/api/category/${id}`, { next: { revalidate: 300 } });
    const section: SectionType = await res.json();
    const data = section.data;
    return (
        <div>

            <div className="w-10/12 mx-auto">
                <p className="border-b-red-600 border-b-2 mb-4 pb-2 mt-8 text-2xl font-bold">{section.title}</p>

                <div className="grid grid-cols-3 gap-4 items-stretch">
                    {
                        data.map(d => <NewsCard key={d.id} a={d}></NewsCard>)
                    }
                </div>
            </div>

        </div>
    );
};

export default CategoryNews;