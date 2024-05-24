'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/app/lib/authProvider';

const Links = ({ onLinkClick }) => {
  const { auth, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
    if (onLinkClick) {
      onLinkClick();
    }
  };

  const isLoggedIn = !!auth.token;

  return (
    <div className="flex flex-col pt-3">
      <Link
        href="/about"
        className="px-4 py-2 hover:underline"
        onClick={onLinkClick}
      >
        About
      </Link>
      <Link
        href="/contact"
        className="px-4 py-2 hover:underline"
        onClick={onLinkClick}
      >
        Contact
      </Link>
      {isLoggedIn ? (
        <button onClick={handleLogout} className="px-4 py-2 hover:underline">
          Logout
        </button>
      ) : (
        <Link
          href="/login"
          className="px-4 py-2 hover:underline"
          onClick={onLinkClick}
        >
          Login
        </Link>
      )}
    </div>
  );
};

export default Links;
