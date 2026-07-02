import { JSX, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom'
import { NavLink } from 'react-router-dom';
import { motion } from 'motion/react'
import Socials from './NavSocials'
import HamburgerIcon from '../../assets/hamburger.svg'

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
    const [open, setOpen] = useState(false)
    const panelRef = useRef<HTMLDivElement | null>(null)
    const toggleRef = useRef<HTMLButtonElement | null>(null)
    const [showModal, setShowModal] = useState(false)

        // close on Escape
        useEffect(() => {
            function onKey(e: KeyboardEvent) {
                if (e.key === 'Escape') setOpen(false)
            }
            window.addEventListener('keydown', onKey)
            return () => window.removeEventListener('keydown', onKey)
        }, [])

    // removed old dropdown positioning logic in favor of centered modal

    // mount the modal only while open or during a brief exit animation
    useEffect(() => {
        if (open) {
            setShowModal(true)
        } else {
            const t = setTimeout(() => setShowModal(false), 180)
            return () => clearTimeout(t)
        }
    }, [open])

    // basic focus management: focus panel on open, restore to toggle on close
    useEffect(() => {
        if (open) {
            const id = requestAnimationFrame(() => panelRef.current?.focus())
            return () => cancelAnimationFrame(id)
        } else {
            toggleRef.current?.focus()
        }
    }, [open])

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

            <div className='flex h-12 lg:h-15 items-center justify-center py-4 gap-4 lg:gap-8'>
                {/* large screen links */}
                <ul className="hidden lg:flex items-center gap-4 font-paragraph text-2xl text-skin-base">
                    <li className='px-1 lg:px-4'>
                        <NavText href='/' text='Home' isMain={true} />
                    </li>
                    <li className='px-1 lg:px-4'>
                        <div className='flex flex-row items-center justify-center gap-2'>
                            <img 
                                src="/icons/Raspberry_Pi_Logo.svg"
                                alt="RPi_Logo"
                                className="w-6 h-6 flex-shrink-0"
                            />
                            <NavText href='/status' text='RPi Metrics' />
                        </div>
                        
                    </li>
                    <li className='px-1 lg:px-4'>
                        <div className='flex flex-row items-center justify-center gap-2'>
                            <img 
                                src="/icons/trendUp.svg"
                                alt="analytics_trend"
                                className="w-6 h-6 flex-shrink-0"
                            />
                            <NavText href='/stats' text='Site Analytics' />
                        </div>
                        
                    </li>
                    
                </ul>

                {/* small screen: socials then hamburger */}
                <div className="relative flex items-center gap-2 lg:hidden">
                    <div className="mr-1">
                        <Socials/>
                    </div>

                    <button
                        aria-expanded={open}
                        aria-label={open ? 'Close menu' : 'Open menu'}
                        onClick={() => setOpen(o => !o)}
                        ref={toggleRef}
                        className="appearance-none select-none p-0 bg-transparent hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-zinc-500/30 shadow-none border-0"
                    >
                        <img src={HamburgerIcon} alt="menu" className="w-10 h-10 bg-transparent" />
                    </button>

                    {/* dropdown is rendered into a portal so backdrop-filter blurs page content behind nav */}
                    {/* centered modal menu rendered via portal with dimmed backdrop */}
                    {showModal && createPortal(
                        <div
                            className={`fixed inset-0 z-[100] flex items-center justify-center ${open ? '' : 'pointer-events-none'}`}
                            role="dialog"
                            aria-modal="true"
                        >
                            {/* Backdrop */}
                            <motion.div
                                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                                animate={{ opacity: open ? 1 : 0 }}
                                transition={{ duration: 0.15 }}
                                onClick={() => setOpen(false)}
                            />
                            {/* Panel */}
                            <motion.div
                                ref={panelRef}
                                className="relative z-[101] w-64 max-w-[90vw] rounded-xl bg-zinc-900/80 backdrop-blur-xl backdrop-saturate-150 shadow-2xl border border-white/10 focus:outline-none"
                                animate={{ opacity: open ? 1 : 0, scale: open ? 1 : 0.95, y: open ? 0 : -8 }}
                                transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.8 }}
                                tabIndex={-1}
                            >
                                <ul className="flex flex-col divide-y divide-white/5">
                                    <li>
                                        <NavLink to='/' onClick={() => setOpen(false)} className='block px-5 py-5 hover:underline text-[#fdd262] text-center font-arvo text-xl'>Home</NavLink>
                                    </li>
                                    <li>
                                        <div className='flex flex-row items-center justify-center'>
                                        <img 
                                            src="/icons/Raspberry_Pi_Logo.svg"
                                            alt="RPi_Logo"
                                            className="w-6 h-6 flex-shrink-0"
                                        />
                                        <NavLink to='/status' onClick={() => setOpen(false)} className='block px-5 py-5 hover:underline text-white text-center font-arvo text-xl'>RPi Metrics</NavLink>
                                        </div>
                                    </li>
                                    <li>
                                        <div className='flex flex-row items-center justify-center'>
                                        <img 
                                            src="/icons/trendUp.svg"
                                            alt="analytics_trend"
                                            className="w-6 h-6 flex-shrink-0"
                                        />
                                        <NavLink to='/stats' onClick={() => setOpen(false)} className='block px-5 py-5 hover:underline text-white text-center font-arvo text-xl'>Site Analytics</NavLink>
                                        </div>
                                    </li>
                                    
                                </ul>
                            </motion.div>
                        </div>,
                        document.body
                    )}
                </div>

                <div className="ml-2 hidden lg:block">
                  <Socials/>
                </div>
            </div>
        </motion.nav>
    )
}