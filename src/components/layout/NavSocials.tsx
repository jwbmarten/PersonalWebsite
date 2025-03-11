import { motion } from 'motion/react';
import GitLogo from '../../assets/github-mark.svg'
import LinkedLogo from '../../assets/InBug-Black.png'
import { JSX } from 'react';

export default function NavSocials(): JSX.Element {
    return (
        <motion.div className='mr-40 flex lg:mr-20 lg:flex'>
            <a href ='https://github.com/jwbmarten' target='_blank'>
                <motion.img 
                    className='px-4 w-28 h-14'
                    src = {GitLogo}
                    alt = 'GitHub'
                    shadow-xl
                    whileHover={{ scale: 1.2 }}
                    />
            </a>
            <a href ='https://www.linkedin.com/in/jake-marten/' target='_blank'>
                <motion.img 
                    className='px-4 w-28 h-14'
                    src = {LinkedLogo}
                    alt = 'LinkedIn'
                    shadow-xl
                    whileHover={{ scale: 1.2 }}
                    />
            </a>
        </motion.div>
    )
}