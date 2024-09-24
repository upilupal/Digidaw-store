import React from 'react'


interface MenuItemProps {
    children: React.ReactNode;
    onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({children, onClick}) => {
  return (
    <div onClick={onClick}>
        {children}
    </div>
  )
}

export default MenuItem