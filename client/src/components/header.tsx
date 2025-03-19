'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import { ModeToggle } from './mode-toggle';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            {/* <Gavel className="h-8 w-8 text-primary" /> */}
            <Image
              src="/logo_martillo.png"
              width={50}
              height={50}
              alt="martillo-logo"
            />
            <span className="text-xl font-bold">Auctions</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-8 md:flex">
            <a href="#auctions" className="text-gray-600 hover:text-gray-900">
              Auctions
            </a>
            <a href="#services" className="text-gray-600 hover:text-gray-900">
              Services
            </a>
            <a href="#contact" className="text-gray-600 hover:text-gray-900">
              Contact
            </a>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
            <ModeToggle />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="space-y-4 py-4 md:hidden">
            <Link
              href="/auctions"
              className="block text-gray-600 hover:text-gray-900"
            >
              Auctions
            </Link>
            <Link
              href="/services"
              className="block text-gray-600 hover:text-gray-900"
            >
              Services
            </Link>
            <Link
              href="/about"
              className="block text-gray-600 hover:text-gray-900"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block text-gray-600 hover:text-gray-900"
            >
              Contact
            </Link>
            <ModeToggle />
            <Button className="w-full">Sell</Button>
          </nav>
        )}
      </div>
    </header>
  );
}
