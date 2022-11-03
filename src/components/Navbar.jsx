import { NavLink } from "react-router-dom";
import { sideData } from "./sidebardata";
import Logo from "../SVGs/BugTrackerLogo.png"

export default function Navbar() {
    return (
        <>
            <div className="flex justify-end bg-off-white h-16">
                <div className="flex">
                    <span className="m-2 p-2 w-72 items-center justify-center rounded-lg bg-white">Hello</span>
                </div>
            </div>
            <div className="h-screen flex flex-col overflow-y-auto bg-blue-gray w-72 fixed top-0">
                <ul className="w-full">
                    <div className="h-48 w-full m-3 flex justify-center align-center">
                        <img src={Logo} alt="logo"/>
                    </div>
                {sideData.map((data, index) => {
                    return (
                    <li key={index} className="flex justify-center">
                        <NavLink to={data.path} className={({isActive}) => "w-72 m-4 bg-white mt-2 mb-2 p-3 flex justify-start align-center hover:text-white rounded-lg " + (isActive ? "bg-blue text-white" : "hover:bg-blue")}>
                            {data.icon}
                            <span className="ml-4">{data.title}</span>
                        </NavLink>
                    </li>
                );
                })}
                </ul>
            </div>
        </>
    )
}