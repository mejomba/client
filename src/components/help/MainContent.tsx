import {HelpPageContentList} from '@/app/types';
import Link from 'next/link';

interface Props {
    content: HelpPageContentList[];
}

// interface Props {
//     content: HelpPageContent[];
// }

// این یک Server Component است
export default function MainContent({ content }: Props) {
    console.log(content)
    const category_name = content[0]?.category_name
    const breadcrumbs = content[0]?.breadcrumb //[ 'cat 1', 'cat 3', 'cat 4 with long long name long longggg name' ]
    const breadcrumb = Object.entries(breadcrumbs)
    return (
        <div className="container max-width-500">
            {content.length > 0 ? (
                <div className="flex-1 p-8">
                    <nav className="mb-4 text-sm text-gray-500">
                        {breadcrumb.map(([title, slug], index) => (
                            <span key={slug}>
                                <Link href={slug} className="hover:underline">
                                  {title}
                                </Link>
                                {index < breadcrumb.length - 1 && ' / '}
                              </span>
                        ))}
                    </nav>

                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        {category_name}
                    </h1>

                    <div className="space-y-3">
                        {content.map((article) => (
                            <div key={article.id} className="flex-1 py-1">
                                {/* لیست مقالات */}
                                <Link
                                    key={article.id}
                                    href={`/help/post/${article.slug}`}
                                    className="block text-black hover:text-blue-600 hover:underline transition-colors"
                                >
                                    {article.title}
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div>
                    No Content
                </div>
            )}
        </div>
    );
}