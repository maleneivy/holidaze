import {
  HiMenuAlt3,
  HiOutlineX,
  HiArrowCircleRight,
  HiArrowCircleLeft,
  HiUser,
  HiOutlinePencil,
  HiCalendar,
  HiMinus,
  HiPlus,
} from 'react-icons/hi';

export const Icon = ({ name, className }) => {
  const icons = {
    bars: HiMenuAlt3,
    close: HiOutlineX,
    next: HiArrowCircleRight,
    prev: HiArrowCircleLeft,
    user: HiUser,
    pencil: HiOutlinePencil,
    calendar: HiCalendar,
    minus: HiMinus,
    plus: HiPlus,
  };

  const Component = icons[name];
  return <Component className={className} aria-label={name} />;
};
