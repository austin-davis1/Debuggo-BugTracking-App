import { NavLink, useNavigate } from "react-router-dom";
import { sideData, adminSideData } from "./sidebardata";
import Logo from "../assets/bug_tracker.png"
import { useSelector, useDispatch } from "react-redux";
import picture from "../assets/no_profile_picture.svg"
import { useState, useEffect } from "react";
import { ProfilePicture } from "./profilePic";
import { getFile } from "../data/storageService";
import { setDashboardView } from "../state/reduxActions";

export default function Navbar() {
    const [photo,setPhoto] = useState()
    const [dropdown, setDropdown] = useState(false)
    const [auth, setAuth] = useState("")
    const [showButton, setShowButton] = useState(false)

    const dispatch = useDispatch()
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

    function changeView() {
        if (auth == "Admin") {
            setAuth("User")
            dispatch(setDashboardView("User"))
        } else if (auth == "User") {
            setAuth("Admin")
            dispatch(setDashboardView("Admin"))
        }
        
    }

    useEffect(() => {
        async function loadProfilePhoto () {
            //If a valid image is found, show it, otherwise
            //default to the no photo svg icon.
            let photoSrc = picture;
            if(userObj && userObj.pictureID){
                photoSrc = await getFile(userObj.pictureID);
            }
            
            setPhoto(photoSrc);
        }
        loadProfilePhoto()

        if (userObj.authorizations.find((authorization) => authorization == "Admin")) {
            setAuth("Admin")
            setShowButton(true)
        } else {
            setAuth("User")
            setShowButton(false)
        }
    }, [])

    useEffect(() => {
        console.log(dropdown)
    }, [dropdown])

    return (
        <>
            <div className="pl-80 flex justify-between items-center bg-off-white h-16">
                <div className="text-3xl flex">
                    <span>Logged in as: {primaryAuthorization}</span>
                    {showButton 
                    ?
                    <div className="flex flex-row text-lg ml-12">
                        <span className="text-2xl">Current View:</span>
                        <button className="flex border-2 ml-2 rounded-lg justify-center items-center p-2 h-8" onClick={() => changeView()}>{auth}</button>
                    </div>
                    : 
                        <></>
                    }
                </div>
                <div className="flex flex-row justify-between rounded-lg bg-white m-2">
                    <div className="flex flex-row border-2 cursor-pointer" onClick={() => setDropdown(!dropdown)}>
                        <span className="p-2 mr-2 flex items-center">{firstName}</span>
                        <div className="flex w-12 mr-12">
                            <ProfilePicture image={photo}/>
                        </div>
                    </div>
                    <span onClick={() => handleLogout()} className = "p-2 flex items-center rounded-lg border-solid border-2 cursor-pointer">Logout</span>
                </div>
            </div>
            <div className="h-screen flex flex-col overflow-y-auto bg-blue-gray w-72 fixed top-0">
                <ul className="w-full">
                    <div className="h-52 mb-3 mt-3 w-full flex justify-center align-center">
                        <img src={Logo} alt="logo" className="rounded-lg"/>
                    </div>
                    <div className="border-solid border-white border-2 rounded-full m-2"/>

                {primaryAuthorization == "Admin" 
                ?
                <>
                    {adminSideData.map((data, index) => {
                        return (
                        <li key={index} className="flex justify-center">
                            <NavLink to={data.path} className={({isActive}) => "w-72 m-4 bg-white mt-2 mb-2 p-3 flex justify-start align-center rounded-lg " + (isActive ? "bg-blue " : " hover:bg-blue")}>
                                {data.icon}
                                <span className="ml-4">{data.title}</span>
                            </NavLink>
                        </li>
                    );
                    })}
                </>
                :
                <>
                    {sideData.map((data, index) => {
                        return (
                        <li key={index} className="flex justify-center">
                            <NavLink to={data.path} className={({isActive}) => "w-72 m-4 bg-white mt-2 mb-2 p-3 flex justify-start align-center rounded-lg " + (isActive ? " bg-blue " : " hover:bg-blue")}>
                                {data.icon}
                                <span className="ml-4">{data.title}</span>
                            </NavLink>
                        </li>
                    );
                    })}
                </>
                }
                </ul>
            </div>
        </>
    )
}