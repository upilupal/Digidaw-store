import React from 'react'
import { IconType } from 'react-icons/lib'
import { Button } from './ui/button';

interface AuthSocialButtonProps {
    icon: IconType;
    onClick: () => void;
}

const SocialButton: React.FC<AuthSocialButtonProps> = ({ icon: Icon, onClick }) => {
  return (
    <Button onClick={onClick} type='button' variant={"outline"} className='w-full'><Icon size={25}/></Button>
  )
}

export default SocialButton