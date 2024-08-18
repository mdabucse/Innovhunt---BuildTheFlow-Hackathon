import ProductsService from '@/utils/supabase/services/products';
import ToolCardEffect from '@/components/ui/ToolCardEffect/ToolCardEffect';
import { ProductType } from '@/type';
// import { shuffleToolsBasedOnDate } from '@/utils/helpers';
import { createBrowserClient } from '@/utils/supabase/browser';

const { title, description, ogImage } = {
  title: 'Inno Hunt – The best platform to connect to investors',
  description: 'A launchpad for dev tools, built by developers for developers, open source, and fair.',
  ogImage: '',
};

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    images: [ogImage],
    url: 'https://localhost:3000',
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogImage],
  },
};

export default async function Home() {
  const today = new Date();
  const productService = new ProductsService(createBrowserClient());
  const week = await productService.getWeekNumber(today, 2);
  const launchWeeks = await productService.getNextLaunchWeeks(today.getFullYear(), 2, week, 5);

  return (
    <section className="max-w-4xl mt-20 mx-auto px-4 md:px-8">
      <div>
        <h1 className="text-slate-800 text-3xl font-semibold">The upcoming tools</h1>
        <p className="text-slate-800 mt-3">Browse the upcoming tools, and be in update with the next.</p>
      </div>

      <div className="mt-10 mb-12">
        {launchWeeks.map(group => (
          <>
            <div className="mt-3 text-slate-700 text-sm">
              {group.startDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            <ul className="mt-3 divide-y divide-slate-800/60">
              {/* {shuffleToolsBasedOnDate(group.products).map((product, idx) => (
                <ToolCardEffect key={idx} tool={product as ProductType} />
              ))} */}
              {group.products.map((product, idx) => (
                <ToolCardEffect key={idx} tool={product as ProductType} />
              ))}
            </ul>
          </>
        ))}
      </div>
    </section>
  );
}
