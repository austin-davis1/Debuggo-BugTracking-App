import Card from "../components/Card"
import { useSelector, useDispatch } from "react-redux"
import { setModal, setRefresh } from "../state/reduxActions"
import { editTask, deleteTask } from "../data/api.js"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link, useNavigate } from "react-router-dom";
import { DashCard } from "../components/DashCard";
import { AdminView } from "../components/AdminView";
import { TechView } from "../components/TechnicianView";

export default function Home() {
    let user = sessionStorage.getItem("User")

    let bugs = useSelector(state => state.bugs)
    let projects = useSelector(state => state.projects)
    let activeProjects = useSelector(state => state.projects.filter(project => project.status == 1))
    let completedProjects = useSelector(state => state.projects.filter(project => project.status == 0))
    let activeBugs = useSelector(state => state.bugs.filter(bug => bug.status == 1))
    let completedBugs = useSelector(state => state.bugs.filter(bug => bug.status == 0))

    let urgentBugs = useSelector(state => state.bugs.filter(bug => bug.tags.find(tag => tag == "Urgent")))

    let dispatch = useDispatch()
    let navigate = useNavigate()

    let bugCount = bugs.length
    let projectCount = projects.length
    let activeProjectCount = activeProjects.length
    let completedProjectCount = completedProjects.length
    let activeBugCount = activeBugs.length
    let completedBugCount = completedBugs.length

    let userObj = JSON.parse(user)

    return (
        <>
            {userObj.authorizations.find((authorization) => authorization == "Admin")
            ?
                <AdminView/>
            :
                <TechView/>
            }
        </>
    )
}