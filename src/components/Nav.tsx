"use client";

import React from 'react';

export const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      // Update URL without reload
      window.history.pushState({}, "", href);
    }
  };

  return (
    <a href={href} onClick={handleClick} className="text-lg font-semibold">
      {children}
    </a>
  );
};

export default function Nav() {
  return (
    <nav className='flex w-full justify-center gap-6 mt-4 hidden lg:flex'>
      <NavLink href='#about'>About</NavLink>
      <NavLink href='#experience'>Experience</NavLink>
      <NavLink href='#projects'>Projects</NavLink>
      <NavLink href='#contact'>Contact</NavLink>
    </nav>
  );
}
