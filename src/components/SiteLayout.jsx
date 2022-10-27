
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export function SiteLayout() {
    return (
        <>
            <Navbar/>
            <main>
                <div className="p-5 font-sans h-screen bg-off-white pt-0 pb-0 flex m-8 rounded-lg flex-col lg:ml-80">
                    <Outlet/>
                </div>
            </main>
        </>
    )
}