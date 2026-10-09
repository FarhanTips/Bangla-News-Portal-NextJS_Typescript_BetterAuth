import Image from "next/image";

export const instant = false;

interface ArticleDetailsPageProps {
    params: Promise<{
        slug: string;
    }>;
}

interface ArticleData {
    title: string;
    topics: {
        name: string;
    }[];

    description: {
        blocks: {
            type: string;
            model?: {
                blocks: {
                    model?: {
                        text?: string;
                    };
                }[];
            };
        }[];
    };

    byline: {
        name?: string;
    }[];

    firstPublished: string;

    body?: {
        type: "image" | "subheading" | "text";
        url?: string;
        altText?: string;
        caption?: string;
        copyrightHolder?: string;
        text?: string;
    }[];

    tags: (string | { name: string })[];
}

const ArticleDetailsPage = async ({ params }: ArticleDetailsPageProps) => {
    const { slug } = await params;

    const res = await fetch(`https://news-api-v2.vercel.app/api/article/${slug}`, { next: { revalidate: 300 } });
    const section = await res.json();

    if (!section?.success || !section?.data) {
        return (
            <main className="mx-auto max-w-4xl px-4 py-16 text-center">
                <h1 className="text-2xl font-bold text-gray-900">
                    সংবাদটি পাওয়া যায়নি
                </h1>
            </main>
        );
    }

    const data: ArticleData = section.data;

    return (
        <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
            <article>
                {/* Category */}
                <div className="mb-4">
                    <span className="text-sm font-bold text-red-700">
                        {data.topics?.[0]?.name || "সংবাদ"}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl">
                    {data.title}
                </h1>

                {/* Description */}
                {data.description?.blocks?.map((block, index) =>
                    block.type === "text" ? (
                        <p
                            key={index}
                            className="text-justify mt-5 text-lg leading-8 text-gray-600"
                        >
                            {block.model?.blocks
                                ?.map((item) => item.model?.text || "")
                                .join("")}
                        </p>
                    ) : null
                )}

                {/* Author and publication date */}
                <div className="mt-6 border-b border-gray-200 pb-5 text-sm text-gray-500">
                    {data.byline?.[0]?.name && (
                        <p className="font-semibold text-gray-800">
                            {data.byline[0].name}
                        </p>
                    )}

                    {data.firstPublished && (
                        <time dateTime={data.firstPublished}>
                            {new Date(data.firstPublished).toLocaleDateString("bn-BD", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </time>
                    )}
                </div>

                {/* Article body */}
                <div className="mt-8 space-y-6">
                    {data.body?.map((block, index) => {
                        switch (block.type) {
                            case "image":
                                return (
                                    <figure key={index}>
                                        <Image
                                        height={400}
                                        width={400}
                                            src={block.url as string}
                                            alt={block.altText || data.title}
                                            className="h-100 w-full rounded-lg object-cover"
                                            loading="lazy"
                                        />

                                        {(block.caption || block.copyrightHolder) && (
                                            <figcaption className="mt-2 text-sm text-gray-500">
                                                {block.caption}
                                                {block.copyrightHolder &&
                                                    ` | ছবি: ${block.copyrightHolder}`}
                                            </figcaption>
                                        )}
                                    </figure>
                                );

                            case "subheading":
                                return (
                                    <h2
                                        key={index}
                                        className="pt-3 text-2xl font-bold text-gray-900"
                                    >
                                        {block.text}
                                    </h2>
                                );

                            case "text":
                                return (
                                    <p
                                        key={index}
                                        className="text-justify text-lg leading-8 text-gray-800"
                                    >
                                        {block.text}
                                    </p>
                                );

                            default:
                                return null;
                        }
                    })}
                </div>

                {/* Tags */}
                {data.tags?.length > 0 && (
                    <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-200 pt-6">
                        {data.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
                            >
                                {typeof tag === "string" ? tag : tag.name}
                            </span>
                        ))}
                    </div>
                )}
            </article>
        </main>
    );
};

export default ArticleDetailsPage;
