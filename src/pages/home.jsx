import Card from "../components/card"
import { useSelector, useDispatch } from "react-redux"
import { setModal, setRefresh } from "../../reduxActions"
import { editTask, deleteTask } from "../../api/api"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Link } from "react-router-dom";
import { DashCard } from "../components/dashCard";

export default function Home() {
    let bugs = useSelector(state => state.bugs)
    let projects = useSelector(state => state.projects)
    let activeProjects = useSelector(state => state.projects.filter(project => project.status == 1))
    let completedProjects = useSelector(state => state.projects.filter(project => project.status == 0))
    let activeBugs = useSelector(state => state.bugs.filter(bug => bug.status == 1))
    let completedBugs = useSelector(state => state.bugs.filter(bug => bug.status == 0))

    let urgentBugs = useSelector(state => state.bugs.filter(bug => bug.tags.find(tag => tag == "Urgent")))
    
    console.log("Urgent Bugs:")
    console.log(urgentBugs)

    let dispatch = useDispatch()

    let bugCount = bugs.length
    let projectCount = projects.length
    let activeProjectCount = activeProjects.length
    let completedProjectCount = completedProjects.length
    let activeBugCount = activeBugs.length
    let completedBugCount = completedBugs.length
    

    return (
        <>
            <div className="grid grid-cols-3 gap-12 justify-items-center">
                <div className="w-full">
                    <DashCard title={"Total Projects"} data={projectCount} color="red"/>
                    <DashCard title={"Total Bugs"} data={bugCount} color="blue"/>
                </div>
                <div className="w-full">
                    <DashCard title={"Active Projects"} data={activeProjectCount} color="blue"/>
                    <DashCard title={"Active Bugs"} data={activeBugCount} color="green"/>
                </div>
                <div className="w-full">
                    <DashCard title={"Completed Projects"} data={completedProjectCount} color="red"/>
                    <DashCard title={"Completed Bugs"} data={completedBugCount} color="blue"/>
                </div>
            </div>
        </>
    )
}