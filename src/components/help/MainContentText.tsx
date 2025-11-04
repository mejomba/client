import {HelpPageContent} from '@/app/types';
import Link from 'next/link';

// interface Props {
//     content: HelpPageContentList;
// }

interface Props {
    content: HelpPageContent;
}

// این یک Server Component است
export default function MainContentText({content}: Props) {
    const breadcrumbs = content?.breadcrumb //[ 'cat 1', 'cat 3', 'cat 4 with long long name long longggg name' ]
    const breadcrumb = Object.entries(breadcrumbs)
    return (
        <div className="container w-200">
            {content ? (
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
                        {content.title}
                    </h1>

                    <div className="space-y-3">

                            <div className="flex-1 py-1">
                                {content.content}
                            </div>
                    </div>
                </div>
            ) : (
                <div></div>
            )}
        </div>
    );
}