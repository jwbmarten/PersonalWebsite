import { JSX } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react'
import Socials from './NavSocials'

interface NavTextProps {
    href: string;
    text: string;
    isMain?: boolean;
}

function NavText({ href, text, isMain}: NavTextProps): JSX.Element {
    return (
            <NavLink 
            to={href}
            style={{
                color: 'inherit',
                textDecoration: 'none',
            }}
            >
            {text}
            </NavLink>

    )
}

export default function NavBar(): JSX.Element {
    return (
        <motion.nav className='sticky top-0 z-50 bg-sky-900 '>
            <div className=' flex h-6 flex-row-reverse items-center justify-between py-6 lg:flex-row lg:justify-between'>
                <ul className='ml-20  hidden w-1/4 items-center justify-between font-paragraph text-2xl text-skin-base lg:flex'>

                    <li className='px-4'>
                        <NavText href='/' text='JakesWorld' />
                    </li>
                    <li className='px-4'>
                        <NavText href='/games' text='Games' />
                    </li>
                </ul>
                <Socials/>
            </div>
            
        </motion.nav>
    )
}