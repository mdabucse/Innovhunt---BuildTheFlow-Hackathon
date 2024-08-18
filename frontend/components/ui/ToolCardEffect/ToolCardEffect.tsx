'use client';

import React, { useState, MouseEvent, useRef } from 'react';
import Logo from '@/components/ui/ToolCard/Tool.Logo';
import Name from '@/components/ui/ToolCard/Tool.Name';
import Tags from '@/components/ui/ToolCard/Tool.Tags';
import Title from '@/components/ui/ToolCard/Tool.Title';
import Votes from '@/components/ui/ToolCard/Tool.Votes';
import ToolCard from '@/components/ui/ToolCard/ToolCard';
import ToolFooter from '@/components/ui/ToolCard/Tool.Footer';
import ToolViews from '@/components/ui/ToolCard/Tool.views';
import AnalyseAiModal from '@/components/ui/analyize/AnalyseAiModal';
import { type ProductType } from '@/type';
import { useInView } from 'framer-motion';
import { createBrowserClient } from '@/utils/supabase/browser';
import ProductsService from '@/utils/supabase/services/products';
import Link from 'next/link';
import { Sparkles, MessagesSquare } from 'lucide-react';
import { Button } from '../Button';

export default ({ tool }: { tool: ProductType }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true });
  const [isModalOpen, setModalOpen] = useState(false);

  if (isInView) {
    new ProductsService(createBrowserClient()).viewed(tool.id); // track views
  }
  
  function preventDefault(e: MouseEvent) {
    e.preventDefault();
  }

  function openModal() {
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
  }

  return (
    <li ref={cardRef} className="py-3">
      <ToolCard tool={tool} href={'/tool/' + tool.slug}>
        <div className="w-full flex items-center gap-x-4">
          <Link onClick={preventDefault} href={'/tool/' + tool.slug} className="flex-none">
            <Logo src={tool.logo_url || ''} alt={tool.name} />
          </Link>
          <div className="w-full space-y-1 text-white">
            <Name href={tool.demo_url  as string} className='text-white'>{tool.name}</Name>
            <Link onClick={preventDefault} href={'/tool/' + tool.slug}>
              <Title className="line-clamp-2">{tool.slogan}</Title>
            </Link>
            <ToolFooter>
              <Tags items={[tool.product_pricing_types?.title ?? 'Free', ...(tool.product_categories || []).map(c => c.name)]} />
              <ToolViews count={tool.views_count} />
              <Button size="sm" variant="premium" className="bg-orange-400 rounded">
                Analyse AI
                <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
              </Button>
              <Button size="sm" className="bg-orange-400 rounded" onClick={openModal}>Recommendation</Button>
              <Button size="sm" variant="premium" className="bg-orange-400 rounded">
                Chat with Founder
                <MessagesSquare className="h-4 w-4 fill-white text-white ml-2" />
              </Button>
            </ToolFooter>
          </div>
        </div>
        <div
          className={`flex-1 self-center flex justify-end duration-1000 delay-150 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Votes count={tool.votes_count} productId={tool?.id} launchDate={tool.launch_date} launchEnd={tool.launch_end as string} />
        </div>
      </ToolCard>
      <AnalyseAiModal isOpen={isModalOpen} onClose={closeModal} toolName={tool.name}/>
    </li>
  );
};
