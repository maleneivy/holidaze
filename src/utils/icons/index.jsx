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
  HiAdjustments,
  HiWifi,
} from 'react-icons/hi';

import { MdOutlinePets, MdFreeBreakfast } from 'react-icons/md';
import { FaCarSide } from 'react-icons/fa';

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
    filter: HiAdjustments,
    pets: MdOutlinePets,
    wifi: HiWifi,
    breakfast: MdFreeBreakfast,
    parking: FaCarSide,
  };

  const Component = icons[name];
  return <Component className={className} aria-label={name} />;
};
