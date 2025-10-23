import { motion } from 'motion/react';
import GitLogo from '../../assets/github-mark-white.svg'
import LinkedLogo from '../../assets/InBug-White.png'
import { JSX } from 'react';

export default function NavSocials(): JSX.Element {
    return (
        <div className='flex flex-row justify-end items-center gap-2'>
        <motion.div className='flex items-center gap-2'>
            <a href ='https://github.com/jwbmarten' target='_blank' rel='noopener noreferrer'>
                <motion.img 
                    className='px-2 h-8 sm:h-10 lg:h-14 w-auto'
                    src = {GitLogo}
                    alt = 'GitHub'
                    shadow-xl
                    whileHover={{ scale: 1.15 }}
                    />
            </a>
            <a href ='https://www.linkedin.com/in/jake-marten/' target='_blank' rel='noopener noreferrer'>
                <motion.img 
                    className='px-2 h-8 sm:h-10 lg:h-14 w-auto'
                    src = {LinkedLogo}
                    alt = 'LinkedIn'
                    shadow-xl
                    whileHover={{ scale: 1.15 }}
                    />
            </a>
        </motion.div>
        </div>
    )
}