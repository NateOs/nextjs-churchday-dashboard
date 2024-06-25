'use client';
import React, { FormEvent } from 'react';
import AcmeLogo from '@/app/ui/acme-logo';
import styles from '@/app/ui/home.module.css';
import { lusitana } from '@/app/ui/fonts';
import Link from 'next/link';
import Image from 'next/image';
import { AtSymbolIcon, KeyIcon, PencilIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '../ui/button';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function reset() {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const email = (event.target as HTMLFormElement).email.value;

      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + '/auth/forgot-password',
        { email },
      );

      if (response.status === 200) {
        toast.success('Password reset request sent successfully');
      } else {
        throw new Error(`Request failed with status ${response.status}`);
      }
    } catch (error) {
      toast.error(`Error: ${error?.message ?? 'An unknown error occurred'}`);
    }
  };

  return (
    <main className="flex flex-col p-6 min-h-screen">
      <ToastContainer />

      <div className="flex items-end bg-blue-500 p-4 rounded-lg h-20 md:h-52 shrink-0">
        {/* <AcmeLogo /> */}
        <p className="text-white"> churchday⛪.</p>
      </div>
      {/* form begins here */}
      <form onSubmit={handleSubmit}>
        <div className="flex md:flex-row flex-col gap-4 mt-4 grow">
          <div className="flex flex-col justify-center gap-6 bg-gray-50 px-6 md:px-20 py-10 rounded-lg md:w-2/5">
            <div className="">
              Enter email address and submit to reset password{' '}
            </div>

            <div className="relative">
              <input
                className="block border-gray-200 py-[9px] pl-10 border rounded-md w-full text-sm placeholder:text-gray-500 outline-2 peer"
                id="email"
                type="email"
                name="email"
                placeholder="Enter email address"
                required
                minLength={6}
              />
              <AtSymbolIcon className="top-1/2 left-3 absolute w-[18px] h-[18px] text-gray-500 peer-focus:text-gray-900 -translate-y-1/2 pointer-events-none" />
            </div>

            <div className="relative"></div>
            <Button type={'submit'}>Reset Password</Button>
          </div>
          <div className="flex justify-center items-center md:px-28 md:py-12 p-6 md:w-3/5">
            {/* Add Hero Images Here */}
            <Image
              src="/hero-desktop.png"
              width={1000}
              height={760}
              className="md:block hidden"
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
      </form>

      {/* form ends here */}
    </main>
  );
}

export default reset;
