import { NavLink, useNavigate } from "react-router-dom";
import { sideData } from "./sidebardata";
import Logo from "../SVGs/BUG_TRACKER.png"
import { useSelector } from "react-redux";

export default function Navbar() {
    let user = sessionStorage.getItem("User")
    let userObj = JSON.parse(user)

    let username = userObj.username
    let firstName = userObj.name.substring(0, userObj.name.indexOf(' '))
    let primaryAuthorization = userObj.authorizations[0]

    let navigate = useNavigate()

    function handleLogout() {
        sessionStorage.removeItem("User")
        navigate("/")
    }

    return (
        <>
            <div className="pl-80 flex justify-between items-center bg-off-white h-16">
                <div className="text-3xl">
                    <span>Logged in as: {primaryAuthorization}</span>
                </div>
                <div className="flex flex-row rounded-lg bg-white m-2">
                    <span className="p-2 w-64 flex items-center">Hello {firstName}</span>
                    <span onClick={() => handleLogout()} className = "p-2 flex items-center border-solid border-2 cursor-pointer">Logout</span>
                </div>
            </div>
            <div className="h-screen flex flex-col overflow-y-auto bg-blue-gray w-72 fixed top-0">
                <ul className="w-full">
                    <div className="h-52 mb-3 mt-3 w-full flex justify-center align-center">
                        <img src={Logo} alt="logo"/>
                    </div>
                    <div className="border-solid border-white border-2 rounded-full m-2"/>
                {sideData.map((data, index) => {
                    return (
                    <li key={index} className="flex justify-center">
                        <NavLink to={data.path} className={({isActive}) => "w-72 m-4 bg-white mt-2 mb-2 p-3 flex justify-start align-center rounded-lg " + (isActive ? " bg-blue rounded-full" : " hover:bg-blue")}>
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