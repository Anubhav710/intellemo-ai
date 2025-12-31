"use client";
import { useGSAP } from "@gsap/react";

import Image from "next/image";

const navLinks = [
  {
    name: "Pricing",
    href: "/",
  },
  {
    name: "Company",
    href: "/",
  },
  {
    name: "About",
    href: "/",
  },
  {
    name: "Blog",
    href: "/",
  },
];

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-5 py-10">
      <div>
        <Image
          src={"/intellemo-logo.svg"}
          alt="logo"
          width={120}
          height={120}
        />
      </div>
      <nav className="">
        <ul className="flex gap-10">
          {navLinks.map((item) => (
            <li key={item.href} className="hover:text-teal-500 cursor-pointer">
              {item.name}
            </li>
          ))}
        </ul>
      </nav>
      <button className="bg-teal-400 px-10 text-white rounded-full py-2 hover:ring ring-teal-400 hover:bg-transparent hover:text-black duration-300 cursor-pointer">
        Login
      </button>
    </header>
  );
};

export default Navbar;
