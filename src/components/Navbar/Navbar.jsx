import Link from 'next/link';
import Image from 'next/image';
import DropDownMenu from './dropdown/DropDownMenu';

const Navbar = () => {
    return (
        <header className="flex flex-row items-baseline justify-between shadow-md">
            <div className="p-3">
                <Link href="/">
                        <Image src="/logo.svg" alt="Next.js logo" width={100} height={100} />
                </Link>
            </div>
            <DropDownMenu />
        </header>
    );
};

export default Navbar;
