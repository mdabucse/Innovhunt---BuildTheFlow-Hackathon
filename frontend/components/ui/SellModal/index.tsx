import { ReactNode, useState } from 'react';
import BlurBackground from '../BlurBackground/BlurBackground';
import mergeTW from '@/utils/mergeTW';
import { createPortal } from 'react-dom';
import Input from '../Input';
import { Button } from '@/components/ui/Button';
import { useContext } from 'react';

import Web3Context from '@/contexts/ContractContext';

type Props = {
  title?: string;
  description?: string;
  icon?: ReactNode;
  children: ReactNode;
  isActive: boolean;
  variant?: 'default' | 'custom';
  className?: string;
  classNameContainer?: string;
  onClose: () => void;  
};

export default ({
  children,
  title,
  description,
  icon,
  isActive,
  variant = 'default',
  className = '',
  classNameContainer,
  onClose, 
}: Props) => {

  const { contractInstance } = useContext(Web3Context);

  const addVote = async() =>{

    const proposal = await contractInstance.getProposalVotes(0,0);
    console.log(proposal[0])
      const tx = await contractInstance.vote(0, 0, true, 1);
      console.log(tx);
  }


  return isActive ? (
    createPortal(
      <>
        <div className="fixed w-full h-full inset-0 z-40 overflow-y-auto">
          <BlurBackground isActive={true}/>
          <div className={mergeTW(`flex items-center min-h-screen px-4 py-8 ${classNameContainer}`)}>
            <div className={mergeTW(`relative flex justify-center z-10 w-[400px] max-w-lg p-4 mx-auto bg-slate-800 rounded-md shadow-xl ${className}`)}>
              {variant == 'default' ? (
                <div className="py-3 sm:flex">
                  <div className="mt-2 text-center sm:ml-4 sm:text-left">
                    <h4 className="font-medium text-slate-50 text-lg">{title}</h4>
                    <p className="mt-2 text-sm leading-relaxed text-slate-300">{description}</p>
                    <Input
                      placeholder="Eg. 1"
                      className="w-full mt-2"
                    />
                    <div className="items-center gap-2 mt-3 sm:flex">
                      <Button
                        onClick={onClose}  // Call onClose to close the modal
                        className="flex-1 block w-full text-white text-sm border border-slate-700 bg-transparent hover:bg-slate-900 mt-2 sm:mt-0"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={addVote}  // Call onClose to close the modal
                        className="flex-1 block w-full text-white text-sm border border-slate-700 bg-transparent hover:bg-slate-900 mt-2 sm:mt-0"
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
              {variant == 'custom' ? children : ''}
            </div>
          </div>
        </div>
      </>,
      document.body,
    )
  ) : (
    <></>
  );
};
