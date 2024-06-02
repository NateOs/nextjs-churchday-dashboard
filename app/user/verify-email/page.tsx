'use client';

import React, { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaRegHourglass } from 'react-icons/fa';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import'react-toastify/dist/ReactToastify.css';

function page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  // make request to verify email
  axios
    .post(process.env.NEXT_PUBLIC_API_URL + '/auth/verify-email', {
      verificationToken: token,
      email,
    })
    .then(function (response: AxiosResponse<any>) {
      toast.success('Verified email, redirecting to login');
      router.push('/login');
    })
    .catch((error: any) => {
      toast.error(error.response?.data?.msg);
      console.log(error);
    });

  return (
    <div>
      <ToastContainer />
      <main className="flex h-screen items-center justify-center">
        <div>
          <h1 className="text-blue-500">Verifying your account...</h1>
          <div className="animate-spin text-blue-500">
            <FaRegHourglass />
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
