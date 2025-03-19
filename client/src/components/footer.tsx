import Link from 'next/link';
import { Gavel } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="mb-4 flex items-center space-x-2">
              <Gavel className="h-8 w-8" />
              <span className="text-xl font-bold">ProAuctions</span>
            </Link>
            <p className="mb-4 text-gray-400">
              The premier marketplace for professional service auctions. Connect
              with top talent and grow your business.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/auctions" className="">
                  Browse Auctions
                </Link>
              </li>
              <li>
                <Link href="/services" className="">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} ProAuctions. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
