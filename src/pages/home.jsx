import Card from "../components/Card"
import { useSelector, useDispatch } from "react-redux"
import { setModal, setRefresh } from "../state/reduxActions"
import { editTask, deleteTask } from "../data/api.js"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link, useNavigate } from "react-router-dom";
import { DashCard } from "../components/DashCard";
import { AdminView } from "../components/AdminView";
import { TechView } from "../components/TechnicianView";
import { useState, useEffect } from "react";

export default function Home() {
    const [view, setView] = useState()
    const [auth, setAuth] = useState("")

    let user = sessionStorage.getItem("User")
    let userObj = JSON.parse(user)
    let dashView = useSelector(state => state.dashboardView)

    console.log(auth)

    /*useEffect(() => {
        if (userObj.authorizations.find((authorization) => authorization == "Admin")) {
            setView("Admin")
        } else {
            setView("Technician")
        }
    }, [])*/

    useEffect(() => {
        /*let userAuth = select(state => state.dashboardView)
        setAuth(userAuth)*/
        if (dashView == "Admin") {
            setAuth("Admin")
        } else {
            setAuth("User")
        }
        console.log("REDUX STATE HAS CHANGED IN HOME :D")
    }, [useSelector(state => state.dashboardView)])

    return (
        <>
            {auth == "Admin"
            ?
                <AdminView/>
            :
                <TechView/>
            }
        </>
    )
}