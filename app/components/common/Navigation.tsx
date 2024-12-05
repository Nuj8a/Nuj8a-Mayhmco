'use client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import Logo from '@/assets/logo.png';
import { FaShoppingBag, FaUser } from 'react-icons/fa';
import { IoSearch } from 'react-icons/io5';
// import { NavigationLink } from './NavigationLink';

const Navigation = () => {
  const path = usePathname();

  // Hide navbar on specific paths
  if (
    String(path).includes('/sign-in') ||
    String(path).includes('/dashboard')
  ) {
    return null;
  }

  return (
    <header className="z-[99999999] h-[50px] lg:h-[60px] w-full bg-[#FFEBB1] shadow-md">
      <div className="relative mx-auto flex h-full w-full items-center justify-between px-5 lg:px-10">
        {/* Logo Section */}
        <div className="z-50 flex items-center gap-3">
          <Image
            className="h-[60px] lg:h-[70px] w-auto object-contain"
            src={Logo}
            alt="Mayhm.co logo"
            height={500}
            width={500}
          />
          <h1 className="hidden text-xl md:flex lg:flex font-medium text-gray-800">Mayhm.co</h1>
        </div>

        {/* Navigation Links */}
        <nav className="hidden items-center gap-10  text-[#313131] lg:flex">
          <div className="group">
            <Link
              href="/sunglasses"
              className="cursor-pointer  py-4 text-sm font-medium hover:text-gray-600"
            >
              Sunglasses
            </Link>
            <div className="hidden group-hover:block">
              <div className="absolute left-0 right-0 top-12 z-10 mx-auto flex w-full justify-center gap-[10%] bg-white px-5 py-8 shadow ">
                <div>
                  <h3 className="text-lg font-semibold text-red-600">
                    Shop For
                  </h3>
                  <ul className="mt-2 flex flex-col gap-1 text-gray-800">
                    <li>All sunglasses</li>
                    <li>Men</li>
                    <li>Women</li>
                    <li>Kids</li>
                    <li>Accessories</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-600">Lenses</h3>
                  <ul className="mt-2 flex flex-col gap-1 text-gray-800">
                    <li>Prescription</li>
                    <li>Polarized</li>
                    <li>Chromance</li>
                    <li>Transitions</li>
                    <li>Lens technology</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-red-600">
                    Featured
                  </h3>
                  <ul className="mt-2 flex flex-col gap-1 text-gray-800">
                    <li>New arrivals</li>
                    <li>Icons</li>
                    <li>Custom sunglasses</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/eyeglasses"
            className="text-sm font-medium hover:text-gray-600"
          >
            Eyeglasses
          </Link>
          <Link
            href="/contact-lens"
            className="text-sm font-medium hover:text-gray-600"
          >
            Contact Lens
          </Link>
        </nav>

        {/* Right Section */}
        <div className="hidden lg:flex items-center gap-5">
          {/* Search Bar */}
          <div className="relative flex items-center">
            <input
              placeholder="Search..."
              className="w-[150px] border-b-2 border-gray-800 bg-transparent px-2 py-1 pr-8 text-sm text-gray-800 placeholder-gray-500 outline-none sm:w-[200px]"
            />
            <IoSearch
              className="absolute right-2 text-lg text-gray-600"
              aria-label="Search"
            />
          </div>

          {/* User Icon */}
          <Link href="/profile" aria-label="User Profile">
            <FaUser className="text-lg text-gray-800 hover:text-gray-600" />
          </Link>

          {/* Shopping Bag */}
          <Link href="/cart" aria-label="Shopping Cart">
            <FaShoppingBag className="text-lg text-gray-800 hover:text-gray-600" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
