import { ArrowLeft } from 'lucide-react';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/breadcrumbs';
import Link from 'next/link';
import HighlightForm from './highlightForm';
import { highlightSchema } from '@/shared/types/highlightSchema';

interface PropsInterface {
  updateData?: highlightSchema;
}

const AddPage = ({ updateData }: PropsInterface) => {
  return (
    <div className="flex flex-col gap-3">
      <CardHeader className="p-0">
        <CardTitle className="text-2xl font-bold">Add Highlight</CardTitle>
        <CardDescription>
          Enter highlight credentials to add highlight
        </CardDescription>
      </CardHeader>
      <div className="flex items-center justify-between">
        <Breadcrumbs
          showDashboardIcon={true}
          items={[
            { link: '/dashboard', title: 'Dashboard' },
            { link: '/dashboard/settings/highlight', title: 'highlight' },
            {
              link: '/dashboard/settings/highlight-spotlight/add',
              title: 'Add Highlight'
            }
          ]}
        />
        <Link
          href="/dashboard/settings/highlight-spotlight"
          className="flex scale-90  cursor-pointer items-center gap-1 rounded-full border border-primary px-3 py-1.5 pb-[0.4rem] text-sm text-destructive duration-200 hover:tracking-wide hover:text-foreground dark:hover:bg-primary"
        >
          {' '}
          <ArrowLeft size={16} className="mt-[1px]" /> Highlight list
        </Link>
      </div>
      <HighlightForm updateData={updateData} />
    </div>
  );
};

export default AddPage;
