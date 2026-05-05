import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#126936] to-[#0f4d28] text-white mt-auto">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Responsive grid: stack on mobile, 4 columns on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center md:text-left">
          
          {/* Logo (hidden on small screens) */}
          <div className="hidden md:flex flex-col items-center md:items-start">
            <Image
              src="/GiddySportsLogoWithoutBg.png"
              alt="Giddy Sports Hub Logo"
              width={100}
              height={100}
              className="rounded-lg md:w-[140px] md:h-[140px]"
            />
          </div>

          {/* Quicklinks */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-3 hover:text-[#f4821f]">Quicklinks</h3>
            <ul className="space-y-2 text-sm text-left">
              <li><Link href="/privacy" className="text-gray-200 hover:text-[#f4821f]">Privacy Policy</Link></li>
              <li><Link href="/cookies" className="text-gray-200 hover:text-[#f4821f]">Cookies Policy</Link></li>
              <li><Link href="/best-sellers" className="text-gray-200 hover:text-[#f4821f]">Best Sellers</Link></li>
              <li><Link href="/sale" className="text-gray-200 hover:text-[#f4821f]">Sale</Link></li>
            </ul>
          </div>

          {/* About */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold mb-3 hover:text-[#f4821f]">Giddy Sports Hub</h3>
            <ul className="space-y-2 text-sm text-left">
              <li><Link href="/about" className="text-gray-200 hover:text-[#f4821f]">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-200 hover:text-[#f4821f]">Contact</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="font-semibold mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/giddysportshub.co.ke/" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-[#f4821f]"><FaFacebook className="h-5 w-5" /></a>
              <a href="https://twitter.com/giddysportshub" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-[#f4821f]"><FaTwitter className="h-5 w-5" /></a>
              <a href="https://www.instagram.com/giddysports_hub/" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-[#f4821f]"><FaInstagram className="h-5 w-5" /></a>
              <a href="https://www.youtube.com/watch?v=wYXpnywbB8A" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-[#f4821f]"><FaYoutube className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bottom */}
      <div className="bg-white border-t border-gray-300 text-center text-xs md:text-sm text-gray-600 w-full py-2">
        <p className="hover:text-[#f4821f] transition-colors">
          &copy; {new Date().getFullYear()} Giddy Sports Hub. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

// import Link from "next/link";
// import Image from "next/image";
// import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

// export default function Footer() {
//   return (
//     <footer className="bg-gradient-to-br from-[#126936] to-[#0f4d28] text-white mt-auto">
//       <div className="container mx-auto px-4 py-6 md:py-8">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8">
//           {/* Logo */}
//           <div>
//             <div className="flex items-center space-x-2 mb-4">
//               <Image
//                 src="/GiddySportsLogoWithoutBg.png"
//                 alt="Giddy Sports Hub Logo"
//                 width={120}
//                 height={120}
//                 className="rounded-lg md:w-[140px] md:h-[140px]"
//               />
//             </div>
//           </div>

//           {/* Quicklinks */}
//           <div>
//             <h3 className="font-semibold mb-3 hover:text-[#f4821f]">Quicklinks</h3>
//             <ul className="space-y-2 text-sm">
//               <li><Link href="/products" className="text-gray-200 hover:text-[#f4821f]">Privacy Policy</Link></li>
//               <li><Link href="/new" className="text-gray-200 hover:text-[#f4821f]">Cookies Policy</Link></li>
//               <li><Link href="/best-sellers" className="text-gray-200 hover:text-[#f4821f]">Best Sellers</Link></li>
//               <li><Link href="/sale" className="text-gray-200 hover:text-[#f4821f]">Sale</Link></li>
//             </ul>
//           </div>

//           {/* About */}
//           <div>
//             <h3 className="font-semibold mb-3 hover:text-[#f4821f]">Giddy Sports Hub</h3>
//             <ul className="space-y-2 text-sm">
//               <li><Link href="/about" className="text-gray-200 hover:text-[#f4821f]">About Us</Link></li>
//               <li><Link href="/contact" className="text-gray-200 hover:text-[#f4821f]">Contact</Link></li>
//             </ul>
//           </div>

//           {/* Social */}
//           <div className="text-left md:text-right">
//             <h3 className="font-semibold mb-3">Follow Us</h3>
//             <div className="flex md:justify-end space-x-4">
//               <a href="https://www.facebook.com/giddysportshub.co.ke/" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-[#f4821f]"><FaFacebook className="h-5 w-5" /></a>
//               <a href="https://twitter.com/giddysportshub" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-[#f4821f]"><FaTwitter className="h-5 w-5" /></a>
//               <a href="https://www.instagram.com/giddysports_hub/" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-[#f4821f]"><FaInstagram className="h-5 w-5" /></a>
//               <a href="https://www.youtube.com/watch?v=wYXpnywbB8A" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-[#f4821f]"><FaYoutube className="h-5 w-5" /></a>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Footer bottom with full-width white background */}
//       <div className="bg-white border-t border-gray-300 pt-0 text-center text-xs md:text-sm text-gray-600 w-full">
//         <p className="hover:text-[#f4821f] transition-colors">
//           &copy; {new Date().getFullYear()} Giddy Sports Hub. All rights reserved.
//         </p>
//       </div>
//     </footer>
//   );
// }
