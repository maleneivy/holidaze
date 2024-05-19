import Link from 'next/link';
import Image from 'next/image';
import DropDownMenu from './dropdown/DropDownMenu';
import ProfileLink from './links/ProfileLink';

const Navbar = () => {
  return (
    <header className="flex flex-row items-baseline justify-between shadow-md">
      <div className="p-3">
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Holidaze logo"
            width={110}
            height={38}
            className="logo"
            priority={true}
          />
        </Link>
      </div>
      <div className="flex items-center">
        <ProfileLink />
        <DropDownMenu />
      </div>
    </header>
  );
};

export default Navbar;
