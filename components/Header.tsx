"use client";

import React from "react";
import { FiCamera, FiCode, FiFileText, FiEdit2, FiMail, FiHome } from "react-icons/fi";
import Link from "next/link";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-gradient-to-b dark:from-gray-900 from-gray-200 bg-opacity-0 dark:text-white text-gray-600 text-xl">
      <nav className="flex flex-col items-center py-4">
        {/* Logo or Site Title */}

        {/* Navigation Links */}
        <ul className="flex space-x-8">
          <li>
            <Link
              href="/"
              className="flex items-center hover:text-gray-300 transition duration-300"
            >
              <FiHome className="mr-2" />
            </Link>
          </li>
          <li>
            <Link
              href="/photography"
              className="flex items-center hover:text-gray-300 transition duration-300"
            >
              <FiCamera className="mr-2" />
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className="flex items-center hover:text-gray-300 transition duration-300"
            >
              <FiCode className="mr-2" />
            </Link>
          </li>
          <li>
            <Link
              href="/resume"
              className="flex items-center hover:text-gray-300 transition duration-300"
            >
              <FiFileText className="mr-2" />
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="flex items-center hover:text-gray-300 transition duration-300"
            >
              <FiEdit2 className="mr-2" />
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="flex items-center hover:text-gray-300 transition duration-300"
            >
              <FiMail className="mr-2" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;