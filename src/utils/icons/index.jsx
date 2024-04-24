import { HiMenuAlt3, HiOutlineX } from "react-icons/hi";

export const Icon = ({ name, className }) => {
    const icons = {
        bars: HiMenuAlt3,
        close: HiOutlineX,
    };

    const Component = icons[name];
    return <Component className={className} aria-label={name}/>;
}; 