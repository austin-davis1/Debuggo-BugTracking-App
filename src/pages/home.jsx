import Card from "../components/Card"
import { useSelector, useDispatch } from "react-redux"
import { setModal, setRefresh, setData, setProjects, setLoading} from "../state/reduxActions"
import { editTask, deleteTask } from "../data/api.js"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link, useNavigate } from "react-router-dom";
import { DashCard } from "../components/DashCard";
import { AdminView } from "../components/AdminView";
import { TechView } from "../components/TechnicianView";
import { useState, useEffect } from "react";
import { getAllTasks, getAllProjects } from "../data/api.js";

export default function Home() {
    const [auth, setAuth] = useState("")

    let dashView = useSelector(state => state.dashboardView)
    let view = sessionStorage.getItem("View")

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
            {view == "Admin"
            ?
                <AdminView/>
            :
                <TechView/>
            }
        </>
    )
}