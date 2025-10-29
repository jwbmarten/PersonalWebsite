import { useEffect } from "react";
import { useLocation } from "react-router-dom";     // useLocation() returns current URL parts (e.g. /projects?tag=java)

export default function AnalyticsPing() {

    const { pathname, search } = useLocation();    // pull the pathname (e.g. /projects) and search (query string - ?tag=java) fields  from the object returned from useLocation()

    useEffect(() => {
        const path = pathname + (search || "");                            // build the current page to be logged, if search (query string) is empty appends "" instead of null
        const url = `/api/track?path=${encodeURIComponent(path)}`;

        if (!navigator.sendBeacon || !navigator.sendBeacon(url)){
            fetch(url, { method: "POST", keepalive: true});  // keepalive: true - fetch option that tells browser to send request even if page is navigating away or closing
        }
    }, [pathname, search]); 

    return null; // component should not render anything
}