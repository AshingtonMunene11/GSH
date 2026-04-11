import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#126936] to-[#0f4d28] text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/GiddySportsLogoWithoutBg.png"
                alt="Giddy Sports Hub Logo"
                width={200}
                height={200}
                className="rounded-lg"
              />
              <span className="font-bold text-2xl hover:text-[#f4821f]">Giddy Sports Hub</span>
            </div>
            <p className="text-gray-200 text-sm">
              Your trusted destination for sports gear and accessories.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4 hover:text-[#f4821f]">Quicklinks</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-gray-200 hover:text-[#f4821f] text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/new" className="text-gray-200 hover:text-[#f4821f] text-sm transition-colors">
                  Cookies Policy
                </Link>
              </li>
              <li>
                <Link href="/best-sellers" className="text-gray-200 hover:text-[#f4821f] text-sm transition-colors">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-gray-200 hover:text-[#f4821f] text-sm transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 hover:text-[#f4821f]">Giddy Sports Hub</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-200 hover:text-[#f4821f] text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-200 hover:text-[#f4821f] text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="text-right">
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex justify-end space-x-4">
              <a 
                href="https://www.facebook.com/giddysportshub.co.ke/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-200 hover:text-[#f4821f] transition-colors"
              >
                <FaFacebook className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com/giddysportshub" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-200 hover:text-[#f4821f] transition-colors"
              >
                <FaTwitter className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/giddysports_hub/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-200 hover:text-[#f4821f] transition-colors"
              >
                <FaInstagram className="h-5 w-5" />
              </a>
              <a 
                href="https://www.youtube.com/watch?v=wYXpnywbB8A" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-200 hover:text-[#f4821f] transition-colors"
              >
                <FaYoutube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-200">
          <p className="hover:text-[#f4821f] transition-colors">
            &copy; {new Date().getFullYear()} Giddy Sports Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

