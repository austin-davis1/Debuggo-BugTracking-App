
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export function SiteLayout() {
    return (
        <>
            <Navbar/>
            <main>
                <div className="p-5 pt-0 pb-0 flex flex-col lg:ml-72">
                    <Outlet/>
                </div>
            </main>
        </>
    )
}