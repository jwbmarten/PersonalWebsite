import { motion } from 'motion/react';
import GitLogo from '../../assets/github-mark-white.svg'
import LinkedLogo from '../../assets/InBug-White.png'
import { JSX } from 'react';

export default function NavSocials(): JSX.Element {
    return (
        <div className='flex flex-row justify-between lg:justify-end '>

        
        <motion.div className='flex  lg:justify-end'>
            <a href ='https://github.com/jwbmarten' target='_blank'>
                <motion.img 
                    className='px-4 h-10 lg:h-14 w-auto'
                    src = {GitLogo}
                    alt = 'GitHub'
                    shadow-xl
                    whileHover={{ scale: 1.2 }}
                    />
            </a>
            <a href ='https://www.linkedin.com/in/jake-marten/' target='_blank'>
                <motion.img 
                    className='px-4 h-10 lg:h-14 w-auto'
                    src = {LinkedLogo}
                    alt = 'LinkedIn'
                    shadow-xl
                    whileHover={{ scale: 1.2 }}
                    />
            </a>
        </motion.div>
        </div>
    )
}