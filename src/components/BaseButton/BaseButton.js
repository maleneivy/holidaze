import Link from 'next/link';

const BaseButton = ({
  children,
  href,
  onClick,
  className,
  type = 'button',
}) => {
  const buttonClassNames = `
    bg-gradient-to-r from-yellow-100 to-yellow-500
    rounded border border-yellow-200 px-4 py-2 text-blue
    hover:from-yellow-300 hover:to-yellow-300
    focus:from-yellow-100 focus:to-yellow-100 focus:outline-none
    ${className}
  `;

  if (href) {
    return (
      <Link href={href} passHref>
        <button className={buttonClassNames} onClick={onClick} type={type}>
          {children}
        </button>
      </Link>
    );
  }

  return (
    <button className={buttonClassNames} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default BaseButton;
