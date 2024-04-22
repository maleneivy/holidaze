import { HiBars3BottomLeft, HiXMark } from "react-icons/hi2";

export const Icon = ({ name, className }) => {
    const icons = {
        bars: HiBars3BottomLeft,
        close: HiXMark,
    };

    const Component = icons[name];
    return <Component className={className} />;
}; 