import {HelpPageContent, HelpPageContentList} from '@/app/types';
import Link from 'next/link';

interface Props {
    content: HelpPageContentList;
}

// این یک Server Component است
export default function MainContentText({content}: Props) {
    // console.log(content)
    // const category_name = content[0]?.breadcrumb
    // const breadcrumbs = [{'path': 'a', 'title': 'help'}, {'path': '#', 'title': category_name}]
    // const breadcrumbs = content.breadcrumb
    return (
        <div className="container w-200">
            {content ? (
                <div className="flex-1 p-8">
                    <nav className="mb-4 text-sm text-gray-500">
                        {content.breadcrumb.map((crumb, index) => (
                            <span key={crumb}>
                <Link href={crumb} className="hover:underline">
                  {crumb}
                </Link>
                                {index < content.breadcrumb.length - 1 && ' / '}
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