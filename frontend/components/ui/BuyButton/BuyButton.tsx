import { useState, useRef, useContext, MouseEventHandler, useEffect } from 'react';
import { useSupabase } from '@/components/supabase/provider';
import ProductsService from '@/utils/supabase/services/products';
import { createBrowserClient } from '@/utils/supabase/browser';
import { useRouter } from 'next/navigation';
import VotingModal from '../VotingModal';
import customDateFromNow from '@/utils/customDateFromNow';
import { IconInformationCircle } from '@/components/Icons';
import LinkItem from '../Link/LinkItem';
import ProfileService from '@/utils/supabase/services/profile';
import Web3Context from '@/contexts/ContractContext';
import { Button } from '@/components/ui/Button';
import { IconVote, IconDownVote } from '@/components/Icons';
import BuyModal from '../BuyModal';

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  count: number;
  className?: string;
  productId?: number;
  launchDate: string | number;
  launchEnd: string | number;
}

export default ({ count, productId, className = '', launchDate = '', launchEnd = '', ...props }: Props) => {
  const { session } = useSupabase();
  const productsService = new ProductsService(createBrowserClient());
  const profileService = new ProfileService(createBrowserClient());
  const router = useRouter();
  const [votesCount, setVotesCount] = useState(count);

  const [upVoteCount, setUpVoteCount] = useState(0);
  const [downVoteCount, setdownVoteCount] = useState(0);

  const [isUpvoted, setUpvoted] = useState(false);
  const [isModalActive, setModalActive] = useState(false);

  const { contractInstance } = useContext(Web3Context);

  const shadowElRef = useRef<HTMLDivElement>(null);
  const voteCountRef = useRef<HTMLSpanElement>(null);

  const isLaunchStarted = new Date(launchDate).getTime() <= Date.now();

  const toggleVote = async () => {
    setModalActive(true);
  };

  const getVote = async()=>{
    let tx = await contractInstance.getProposalVotes(0,0);
    console.log(tx[0]);
    setUpVoteCount(parseInt(tx[0]));
    setdownVoteCount(parseInt(tx[1]));
  }


  useEffect(() => {
    session && session.user
      ? productsService.getUserVoteById(session.user.id, productId as number).then(data => {
          if ((data as { user_id: string })?.user_id) setUpvoted(true);
          else setUpvoted(false);
        })
      : null;
  }, []);

  const handleHoverEffect: MouseEventHandler<HTMLButtonElement> = e => {
    const button = e.currentTarget;
    const shadowEl = shadowElRef.current as HTMLElement;

    const rect = button.getBoundingClientRect();
    const x = e.pageX - rect.left;
    const y = e.pageY - rect.top;

    shadowEl.style.top = `${y}px`;
    shadowEl.style.left = `${x}px`;
    shadowEl.style.transform = 'translate(-50%, -50%)';
  };

  const voteCountEffect = () => {
    const voteCountEl = voteCountRef.current as HTMLSpanElement;
    voteCountEl.style.transform = `translateY(${isUpvoted ? '' : '-'}50px)`;
    setTimeout(() => {
      voteCountEl.style.transform = 'translateY(0px)';
    }, 300);
  };

  return (
    <>

    <div className="flex justify-around">
      <Button
        onClick={toggleVote}
        {...props}
        onMouseMove={handleHoverEffect}
        className={`flex items-center gap-x-3 hover:scale-[1.02] active:scale-100 ring-offset-1 ring-orange-500 focus:ring-2 bg-transparent overflow-hidden relative duration-200 group ${
          isUpvoted
            ? 'focus:ring-offset-0 focus:ring-0 border border-orange-500 text-orange-500'
            : 'bg-orange-500 hover:bg-orange-600 active:bg-orange-600'
        } ${className}`}
      >
        {isUpvoted ? 'Upvoted' : 'Buy Shares'}
        <div
          ref={shadowElRef}
          className={`absolute top-0 left-0 w-9 h-9 bg-gradient-to-tr blur-[20px] opacity-0 group-hover:opacity-100 duration-150 ${
            isUpvoted ? 'from-slate-300 to-slate-500' : 'from-slate-50 to-slate-100'
          }`}
        ></div>
      </Button>
      </div>

      <BuyModal
        isActive={isModalActive}
        onClose={() => setModalActive(false)}  // Pass setModalActive to close the modal
        icon={<IconInformationCircle className="text-blue-500 w-6 h-6" />}
        title={"Upvote for this proposal"}
        description={"Enter the amount of Vote(i.e No.of ERC20)"}
      >
        {/* Modal Content */}
      </BuyModal>
    </>
  );
};
