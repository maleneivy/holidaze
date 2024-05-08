import Link from 'next/link';

const Links = ({ onLinkClick }) => {
  const links = [
    {
      title: 'About',
      path: '/about',
    },
    {
      title: 'Contact',
      path: '/contact',
    },
    {
      title: 'Login',
      path: '/login',
    },
  ];

  return (
    <div className="flex flex-col pt-3">
      {links.map((link) => (
        <Link
          href={link.path}
          key={link.title}
          onClick={onLinkClick}
          className="px-4 py-2 hover:underline"
        >
          {link.title}
        </Link>
      ))}
    </div>
  );
};

export default Links;
