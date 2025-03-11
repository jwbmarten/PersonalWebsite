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
            className="hover:underline" 
            >
            {text}
            </NavLink>

    )
}

export default function NavBar(): JSX.Element {
    return (
            <motion.nav 
            className="sticky top-0 z-50 w-2/5 mx-auto rounded-xl shadow-xl mt-10 mb-10"
            style={{ backgroundColor: "rgba(51, 65, 85)" }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.95, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
            }}>

            <div className=' flex h-20 flex-row-reverse items-center justify-between py-6 lg:flex-row lg:justify-between'>
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