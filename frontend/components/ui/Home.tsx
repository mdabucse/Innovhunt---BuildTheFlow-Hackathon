'use client';


import React from 'react';
import { navLinks } from '@/constants';
import Link from 'next/link';
import Image from 'next/image';


function HomeSection() {
  return (
    <section className="sm:flex-center hidden h-72 flex-col gap-4 rounded-[20px] border bg-banner bg-cover bg-no-repeat p-10 shadow-inner">
        <h1 className="h1-semibold max-w-[500px] flex-wrap text-center text-white shadow-sm">
          Create Social Impact with InnoHunt
        </h1>
        <ul className="flex-center w-full gap-20">
          {navLinks.slice(1, 5).map((link) => (
            <Link
              key={link.route}
              href={link.route}
              className="flex-center flex-col gap-2"
            >
              <li className="flex-center w-fit rounded-full bg-white p-4">
                <Image src={link.icon} alt="image" width={24} height={24} />
              </li>
              <p className="p-14-medium text-center text-white">{link.label}</p>
            </Link>
          ))}
        </ul>
      </section>
  )
}

export default HomeSection;