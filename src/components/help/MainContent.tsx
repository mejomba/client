import {HelpPageContent, HelpPageContentList} from '@/app/types';
import Link from 'next/link';

interface Props {
    content: HelpPageContentList[];
}

// این یک Server Component است
export default function MainContent({content}: Props) {
    const category_name = content[0]?.breadcrumb
    // const breadcrumbs = [{'path': '/help', 'title': 'help'}, {'path': '#', 'title': category_name}] // وقتی صفحه help داشتیم بعدا
    // const breadcrumbs = [{'path': '#', 'title': category_name}]
    const breadcrumbs = category_name

    return (
        <div className="container max-width-500">
            {content.length > 0 ? (
                <div className="flex-1 p-8">
                    <nav className="mb-4 text-sm text-gray-500">
                        {breadcrumbs.map((crumb, index) => (
                            <span key={crumb}>
                <Link href="" className="hover:underline">
                  {crumb}
                </Link>
                                {index < breadcrumbs.length - 1 && ' / '}
              </span>
                        ))}
                    </nav>

                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        {category_name}
                    </h1>

                    <div className="space-y-3">
                        {content.map((article) => (
                            <div className="flex-1 py-1">
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