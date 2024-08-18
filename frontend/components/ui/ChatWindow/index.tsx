'use client';

import { IconChatBubbleLeft } from '@/components/Icons';
import LinkItem from '../Link/LinkItem';
import { IconChatBubbleOvalLeftEllipsis } from '@/components/Icons';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { XMarkIcon } from '@heroicons/react/24/solid';
import * as Popover from '@radix-ui/react-popover';

function TwitterLink() {
  return (
    <a
      className="fixed bottom-0 right-0 bg-base-100 py-1 px-2 z-10 cursor-pointer rounded-tl-xl border-t border-l border-slate-600 border-dashed text-sm font-semibold hover:bg-base-200 duration-200 group"
      href="https://x.com/"
      target="_blank"
    >
      
    </a>
  );
}

export default () => {
  const [isPopupActive, setPopupActive] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setPopupActive(false);
    }, 6000);
  }, []);

  return (
    <TwitterLink/>
  );
};
