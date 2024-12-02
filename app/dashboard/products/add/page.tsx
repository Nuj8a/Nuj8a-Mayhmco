import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AddForm from './AddForm';
import { Breadcrumbs } from '@/components/breadcrumbs';
// import { Separator } from '@/components/ui/separator';

export default function AddProductPage() {
  return (
    <div>
      <div className="relative h-full w-full">
        <CardHeader className="!px-0 !py-0">
          <CardTitle className="text-left text-2xl font-bold">
            Add New Product
          </CardTitle>
          <CardDescription>
            You can see all sales analysis results more clearly and completely
          </CardDescription>
        </CardHeader>
        <div className="mb-5 mt-3">
          <Breadcrumbs
            items={[
              { title: 'Dashboard', link: '/dashboard' },
              { title: 'All Products', link: '/dashboard/products/all' },
              { title: 'Add Product', link: '' }
            ]}
            showDashboardIcon={true}
          />
        </div>
        {/* <Separator /> */}
        <AddForm />
      </div>
    </div>
  );
}
