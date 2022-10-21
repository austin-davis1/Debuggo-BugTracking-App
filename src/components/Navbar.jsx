import { NavLink } from "react-router-dom";
import { sideData } from "./sidebardata";

export default function Navbar() {
    return (
        <div className="h-screen flex flex-col overflow-y-auto bg-black w-72 fixed top-0">
            <ul className="w-full">
            {sideData.map((data, index) => {
                return (
                <li key={index} className="flex justify-center">
                    <NavLink to={data.path} className={({isActive}) => "w-72 m-4 bg-white mt-2 mb-2 p-3 flex justify-start align-center hover:text-white rounded-lg " + (isActive ? "bg-purple" : "hover:bg-purple")}>
                        <img src={data.icon}/>
                        <span className="ml-4">{data.title}</span>
                    </NavLink>
                </li>
            );
            })}
            </ul>
        </div>
    )
}