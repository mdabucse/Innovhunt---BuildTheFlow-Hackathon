import mergeTW from '@/utils/mergeTW'

export const IconDownVote = ({ className = '' }: { className?: string }) => (
    <svg className={mergeTW(`w-5 h-5 ${className}`)} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21.2381 5.0001H3.2381C3.05587 5.00073 2.87722 5.05091 2.72142 5.14551C2.56561 5.24012 2.43858 5.3754 2.35389 5.5368C2.26921 5.6982 2.2301 5.87969 2.24092 6.06161C2.25175 6.24352 2.31197 6.41904 2.41508 6.56934L11.4151 19.5693C11.7881 20.1083 12.6861 20.1083 13.0601 19.5693L22.0601 6.56934C22.1643 6.41939 22.2254 6.2437 22.2367 6.06152C22.2481 5.87934 22.2093 5.69741 22.1246 5.53572C22.0399 5.37403 21.9125 5.23848 21.7562 5.14409C21.5999 5.0497 21.4207 4.99986 21.2381 5.0001Z"
        fill="currentColor"
      />
      <defs>
        <linearGradient
          id="paint0_linear_2861_8661"
          x1="12.761"
          y1="20.9733"
          x2="12.9998"
          y2="-21.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CBD5E1" />
          <stop offset="1" stopColor="#CBD5E1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )