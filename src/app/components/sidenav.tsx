import React from "react";
import Link from "next/link";
import Image from "next/image";

const SideNav = () => {
  return (
    <nav className="h-full bg-gray-800 text-white">
      <ul className="space-y-4 p-4">
        <li className="flex justify-center mb-4">
          <Image src="/logo.png" alt="Logo" width={90} height={30} />
        </li>
        <li>
          <Link
            href="/admin/dashboard/messages"
            className="flex items-center justify-center p-4 hover:bg-gray-700 rounded"
          >
            Messages
          </Link>
        </li>
        <li>
          <Link
            href="/admin/dashboard/about"
            className="flex items-center justify-center p-4 hover:bg-gray-700 rounded"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/admin/dashboard/destinations"
            className="flex items-center justify-center p-4 hover:bg-gray-700 rounded"
          >
            Destinations
          </Link>
        </li>
        <li>
          <Link
            href="/admin/dashboard/packages"
            className="flex items-center justify-center p-4 hover:bg-gray-700 rounded"
          >
            Packages
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default SideNav;
