import React from 'react';
import AcmeLogo from '@/app/ui/acme-logo';
import styles from '@/app/ui/home.module.css';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import Image from 'next/image';
import { AtSymbolIcon, KeyIcon, PencilIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../ui/button';
function page() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
        {/* <AcmeLogo /> */}
        <p className="text-white"> churchday⛪.</p>
      </div>
      <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <div className="">
            Go to{' '}
            <Link className="underline hover:bg-cyan-400" href="/register">
              register
            </Link>{' '}
            to create an account or{' '}
            <Link href="/login" className="underline hover:bg-cyan-400">
              login
            </Link>
            , if you already have an account
          </div>

          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="email"
              type="text"
              name="email"
              placeholder="Enter email address"
              required
              minLength={6}
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div className="relative">
            <input
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
              id="password"
              type="password"
              name="password"
              placeholder="Enter password"
              required
              minLength={6}
            />
            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
          </div>
          <div className="relative"></div>
          <Button type={'submit'}>Log in</Button>
          <p>
            Forgot password? <Link href="/reset" className='hover:bg-cyan-400 underline'>Reset</Link>
          </p>
        </div>
        <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
          {/* Add Hero Images Here */}
          <Image
            src="/hero-desktop.png"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
          />
          <Image
            src="/hero-desktop.png"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshots of the dashboard project showing desktop version"
          />
        </div>
      </div>
    </main>
  );
}

export default page;
