import mergeTW from '@/utils/mergeTW';
import Image from 'next/image';

export default ({ className = '', w = '124', h = '35' }: { className?: string; w?: string; h?: string }) => (
  <div className="flex items-center space-x-0"> {/* Flex container to display items horizontally with space between */}
    <div> {/* Container for the logo */}
      <Image
        src="/boost.svg"
        alt="Split logo"
        width={50}
        height={50}
        priority
      />
    </div>
    <div>
      <Image
        src="/innohunt.png"
        alt="text"
        width={100}
        height={100}
        priority
      />
    </div>
  </div>
);
