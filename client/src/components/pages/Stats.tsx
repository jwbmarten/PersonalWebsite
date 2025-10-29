import { JSX } from "react";
import NavBar from "../layout/NavBar";
import StatsDashboard from "../analytics/SiteStats";
export default function Stats(): JSX.Element {

    return (
        <>
        <div className='w-full pt-20 lg:pt-28'>
      <div className="fixed top-4 left-0 right-0 z-50 flex justify-center">
        <NavBar />
      </div>
        <StatsDashboard />
        </div>        
        </>

    )
}