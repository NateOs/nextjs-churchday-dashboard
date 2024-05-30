'use client';
import Link from 'next/link';
import Image from 'next/image';
import { AtSymbolIcon, KeyIcon, PencilIcon } from '@heroicons/react/24/outline';
import { Button } from '../ui/button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';
import axios from 'axios';
import { useState } from 'react';
import { Toast } from 'flowbite-react';
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi';

// Define the validation schema using Zod
const schema = zod
  .object({
    name: zod.string().min(6, 'Name must be at least 6 characters long'),
    email: zod.string().email('Invalid email address'),
    password: zod
      .string()
      .min(6, 'Password must be at least 6 characters long')
      .nullable(),
    confirmPassword: zod
      .string()
      .min(6, 'Confirm password must be at least 6 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormInput = zod.infer<typeof schema>;

export default function Register() {
  const [data, setData] = useState({});
  const [isToast, setIsToast] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    if (data) {
      axios
        .post(process.env.NEXT_PUBLIC_BACKEND_URL + '/auth/register', data)
        .then(function (response) {
          setData(response.data);

          //           data
          // :
          // msg
          // :
          // "user created successfully, check email to verify account"
          // verificationToken
          // :
          // "b6ffe8633c06c9f5da2b1bc61df15d7a9ffa72f8af7f4c08a3373caeb2ec72ffd7af46bf1597b7e
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col p-6">
      {isToast && (
        <Toast className="pointer-events-none absolute right-0 top-4 flex items-center justify-center">
          <div className="pointer-events-auto inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="pointer-events-auto ml-3 text-sm font-normal">
            Item moved successfully.
          </div>
          <Toast.Toggle className="pointer-events-auto" />
        </Toast>
      )}
      {/* form starts here */}

      <form onSubmit={handleSubmit(onSubmit)}>
        {' '}
        <div className="flex h-20 shrink-0 items-end rounded-lg bg-blue-500 p-4 md:h-52">
          {/* <AcmeLogo /> */}
          <p className="text-white"> churchday⛪.</p>
        </div>
        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
          <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
            <p className="underline hover:bg-cyan-400">
              <Link href="/">Go back</Link>
            </p>{' '}
            <div className="">
              Enter details to register account, if you already have an account,
              you can{' '}
              <Link href="/login" className="underline hover:bg-cyan-400">
                login
              </Link>
            </div>
            <div className="relative">
              <input
                className={`peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500 ${errors.name ? 'border-red-500' : ''}`}
                id="name"
                type="text"
                placeholder="Enter name..."
                required
                minLength={6}
                {...register('name')}
              />
              <PencilIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              {errors.name && (
                <p className="text-xs text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="text"
                placeholder="Enter email address"
                required
                minLength={6}
                {...register('email')}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                placeholder="Enter password"
                {...register('password')}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                placeholder="Confirm password"
                {...register('confirmPassword')}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            <Button type={'submit'}>Create account</Button>
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
      </form>
      {/* form ends here */}
    </main>
  );
}

// TODO make auth request with axios and interceptor
// TODO add status toasts
