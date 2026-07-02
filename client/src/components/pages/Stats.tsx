import { JSX } from "react";
import NavBar from "../layout/NavBar";
import StatsDashboard from "../analytics/SiteStats";
import { motion } from "motion/react";
export default function Stats(): JSX.Element {

    const fadeInVariants = {
      hidden: { opacity: 0 },
      visible: { 
      opacity: 1, 
      transition: { duration: 1.8, delay: 0.1 } 
    },};

    return (
        <>
        <div className='w-full pt-15 lg:pt-28'>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center">
        <NavBar />
      </div>
        <motion.nav 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true}}
          variants={fadeInVariants}
        >
          <StatsDashboard />
        </motion.nav>
        </div>        
        </>

    )
}