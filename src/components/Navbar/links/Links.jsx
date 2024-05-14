import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AuthContext } from '@/app/lib/authProvider';

const Links = ({ onLinkClick }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const router = useRouter();
  const isLoggedIn = !!auth.token;

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null });
    setAuth({ userName: null });
    setAuth({ apiKey: null });
    router.push('/login');
    onLinkClick();
  };

  const links = [
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
    {
      title: isLoggedIn ? 'Logout' : 'Login',
      path: isLoggedIn ? '#' : '/login',
    },
  ];

  return (
    <div className="flex flex-col pt-3">
      {links.map((link, index) => {
        if (link.title === 'Logout') {
          return (
            <button
              key={index}
              onClick={handleLogout}
              className="text px-4 py-2 hover:underline"
            >
              {link.title}
            </button>
          );
        }
        return (
          <Link
            href={link.path}
            key={index}
            onClick={onLinkClick}
            className="px-4 py-2 hover:underline"
          >
            {link.title}
          </Link>
        );
      })}
    </div>
  );
};

export default Links;
