'use client';

import { useRouter } from 'next/navigation';
import { FaArrowLeft } from "react-icons/fa";

interface BackButtonProps {
  fallback?: string;
  className?: string;
  iconClassName?: string;
  text?: string;
}

export default function BackButton({
  fallback = '/',
  className = '',
  iconClassName = 'w-4 h-4',
  text = 'Back',
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push(fallback);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors hover:cursor-pointer ${className}`}
    >
      <FaArrowLeft className={iconClassName} />
      {text}
    </button>
  );
}
