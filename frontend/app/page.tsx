'use client';

import { useEffect, useState } from 'react';
import ProductsService from '@/utils/supabase/services/products';
import ToolCardEffect from '@/components/ui/ToolCardEffect/ToolCardEffect';
import { ProductType } from '@/type';
import { createBrowserClient } from '@/utils/supabase/browser';
import CountdownPanel from '@/components/ui/CountDownPanel';
import SkeletonToolCard from '@/components/ui/Skeletons/SkeletonToolCard';

export default function Home() {
  const today = new Date();
  const productService = new ProductsService(createBrowserClient());
  const [launchWeeks, setLaunchWeeks] = useState([]);
  const [weeklyWinners, setWeeklyWinners] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const week = await productService.getWeekNumber(today, 2);
      const [launchWeeks, weeklyWinners] = await Promise.all([
        productService.getPrevLaunchWeeks(today.getFullYear(), 2, week, 10),
        productService.getWeeklyWinners(week),
      ]);
      setLaunchWeeks(launchWeeks as any);
      setWeeklyWinners(weeklyWinners as any);
      setLoading(false);
      console.log(launchWeeks);
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Load the Voiceflow chatbot script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = function() {
      window.voiceflow.chat.load({
        verify: { projectID: '666957700d2fa08301471ad1' },
        url: 'https://general-runtime.voiceflow.com',
        versionID: 'production'
      });
    };
    script.src = "https://cdn.voiceflow.com/widget/bundle.mjs";
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  function weekTools(group) {
    return (
      <>
        <div className="mt-3 text-slate-400 text-sm">
          Explore the Latest startup seeking for fund<b className="text-orange-400">👇</b>
        </div>
        <ul className="mt-3 divide-y divide-slate-800/60">
          {group.products.map((product, idx) => (
            <ToolCardEffect key={idx} tool={product as ProductType} />
          ))}
        </ul>
      </>
    );
  }

  function prevWeekTools(group) {
    return (
      <>
        <div className="border-t border-slate-800 pt-8 mt-8 text-sm text-orange-500">
        </div>
        <ul className="mt-3 divide-y divide-slate-800/60">
          {group.products.slice(0, 3).map((product, idx) => (
            <ToolCardEffect key={idx} tool={product as ProductType} />
          ))}
        </ul>
      </>
    );
  }

  function weekWinnerTools(products) {
    return (
      <>
        {/* Active */}
        <div className="border-t border-slate-800 pt-8 mt-8 text-sm text-orange-500">
          <p className="mt-8">Recent Fund Receivers👑</p>
        </div>
        <ul className="relative mt-3 divide-y divide-slate-800/60">
          {products
            .sort((a, b) => b.votes_count - a.votes_count)
            .map((product, idx) => (
              <ToolCardEffect key={idx} tool={product as ProductType} />
            ))}
          <div className="absolute -inset-x-2 -inset-y-0 -z-20 bg-slate-800/40 rounded-xl sm:-inset-x-3"></div>
        </ul>
      </>
    );
  }

  return (
    <section className="max-w-4xl mt-5 lg:mt-10 mx-auto px-4 md:px-8">
      <CountdownPanel />
      {isLoading ? (
        <div className="mt-14">
          <div>
            <div className="w-24 h-3 rounded-full bg-slate-700 animate-pulse"></div>
            <div className="w-32 h-3 mt-2 rounded-full bg-slate-700 animate-pulse"></div>
          </div>
          <ul className="mt-5 space-y-4">
            {Array(25)
              .fill('')
              .map((item, idx) => (
                <SkeletonToolCard key={idx} />
              ))}
          </ul>
        </div>
      ) : (
        <div className="mt-10 mb-12">
          {launchWeeks.map((group, index) => (index > 0 ? prevWeekTools(group) : weekTools(group)))}
          {weekWinnerTools(weeklyWinners)}
        </div>
      )}
    </section>
  );
}
