import Link from "next/link";
import Links from "./links/Links";

const Navbar = () => {
    return (
        <>
        <div>
            <Link href="/">
                <p>Logo</p>
            </Link>
        </div>
        <div>
            <Links />
        </div>
        </>
    );
};

export default Navbar;