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
            className={`hover:underline transition-colors duration-300 font-arvo ${
             
            isMain ?
                "text-sm lg:text-3xl text-[#fdd262]"
                : "text-sm lg:text-2xl text-white"
            }`}
            >
            {text}
            </NavLink>

    )
}

export default function NavBar(): JSX.Element {
    return (
        <motion.nav 
        className="z-50 inline-flex items-center rounded-xl shadow-xl bg-zinc-800 px-3 py-2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.80, scale: 1 }}
            transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0, 0.71, 0.2, 1.01],
            }}>

            <div className='flex h-15 lg:h-20 items-center justify-center py-4 gap-4 lg:gap-8'>
                <ul className="hidden lg:flex items-center gap-6 font-paragraph text-2xl text-skin-base">


                    <li className='px-1 lg:px-4'>
                        <NavText href='/' text='Home' isMain={true} />
                    </li>
                    <li className='px-1 lg:px-4'>
                        <NavText href='/games' text='About' />
                    </li>
                    <li className='px-1 lg:px-4'>
                        <NavText href='/games' text='Projects' />
                    </li>
                    <li className='px-1 lg:px-4'>
                        <NavText href='/games' text='Contact' />
                    </li>
                </ul>
                <div className="ml-2 lg:ml-6">
                  <Socials/>
                </div>
            </div>
            
        </motion.nav>
    )
}