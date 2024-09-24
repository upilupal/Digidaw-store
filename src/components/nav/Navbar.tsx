import { getCurrentUser } from '@/app/actions/getCurrentUser'
import Link from 'next/link'
import Container from '../Container'
import SearchButton from '../SearchButton'
import CartCount from './CartCount'
import UserMenu from './UserMenu'


const  Navbar = async () => {
    const currentUser = await getCurrentUser();
  return (
    <div className='sticky top-0 w-full bg-slate-200 z-30 shadow-sm'>
        <div className='py-4 border-b-[1px]'>
            <Container>
                <div className='flex items-center justify-between gap-3 md:gap-0'>
                    <Link href="/" className=' text-3xl font-semibold transition-transform transform hover:-translate-y-1 duration-200'>DigiDaw</Link>
                    <div className='hidden md:block'>
                        <SearchButton/>
                    </div>
                    <div className='flex items-center gap-8 md:gap-12'>
                        <CartCount/>
                        <div><UserMenu currentUser={currentUser}/></div>
                    </div>
                </div>
            </Container>
        </div>
    </div>
  )
}

export default Navbar