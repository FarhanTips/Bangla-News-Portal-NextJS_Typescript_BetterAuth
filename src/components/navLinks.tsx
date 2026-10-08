import Link from "next/link";

interface CategoryType {
  slug: string;
  title: string;
  topicId: string | null;
  url: string;
  scrapable: boolean;
}

const NavLinksPage = async () => {

    const res = await fetch("https://news-api-v2.vercel.app/api/categories",{next: {revalidate: 3600,},});
    const data = await res.json();
    const catgData: CategoryType[] = data.data;
    const NewCatgData = catgData.filter(catg => catg.scrapable);

    return (
        <div className="flex gap-3 justify-center text-gray-600">
            
            <Link href="/">হোম</Link>

            {
                NewCatgData.map(catg =>  <Link key={catg.title} href={`/${catg.slug}`}>{catg.title}</Link>)
            }
        </div>
    );
};

export default NavLinksPage;
