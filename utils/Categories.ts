import { AiFillPhone, AiOutlineLaptop } from "react-icons/ai";
import { MdHeadset, MdMonitor, MdOutlineKeyboard, MdSmartphone, MdStorefront } from "react-icons/md";
import { PiGraphicsCard } from "react-icons/pi";

export const categories = [
    {
        label: 'All',
        icon: MdStorefront
    },
    {
        label: 'Phone',
        icon: MdSmartphone
    },
    {
        label: 'Laptop',
        icon: AiOutlineLaptop
    },
    {
        label: 'Keyboard',
        icon: MdOutlineKeyboard
    },
    {
        label: 'Monitor',
        icon: MdMonitor
    },
    {
        label: 'PC Component',
        icon: PiGraphicsCard
    },
    {
        label: 'Accesories',
        icon: MdHeadset
    },
]