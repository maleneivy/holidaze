import { HiMenuAlt3, HiOutlineX, HiArrowCircleRight, HiArrowCircleLeft } from "react-icons/hi";

export const Icon = ({ name, className }) => {
    const icons = {
        bars: HiMenuAlt3,
        close: HiOutlineX,
        next: HiArrowCircleRight,
        prev: HiArrowCircleLeft,
    };

    const Component = icons[name];
    return <Component className={className} aria-label={name}/>;
}; 