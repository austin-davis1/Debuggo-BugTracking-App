import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Card from "../components/card"
import { Link } from "react-router-dom"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { deleteTask, editTask } from "../../api/api";

import { setModal, setRefresh } from "../../reduxActions";

export default function ViewProject() {
    let dispatch = useDispatch()

    let loading = useSelector(state => state.isLoading)

    let  { projectId } = useParams()
    let allProjects = useSelector(state => state.projects)

    let isModal = useSelector(state => state.deleteModal)
    let deleteId = useSelector(state => state.selectedDelete)
    let modalType = useSelector(state => state.modalType)

    let projectData = allProjects.find((project) => project._id === projectId )
    
    let allTasks = useSelector(state => state.bugs.filter((bug) => bug.projectId == projectId))

    async function handleEvent(id) {
        let data = allTasks.find(task => task._id == id)

        modalType == "Delete" ? await deleteTask(id) : await editTask(id, data, 0)
        dispatch(setRefresh(true))
        dispatch(setModal(false))
    }

    return (
        <>
        {isModal 
        ?
            <>
                <div className="flex justify-center items-center w=24">
                    <h1>Are you sure you want to {modalType} this bug?</h1>
                </div>
                <div className="grid grid-cols-2 justify-items-center items-center">
                    <h1 onClick={() => handleEvent(deleteId)} className="cursor-pointer w-36 h-12 text-center font-bold bg-green rounded-lg">Yes</h1>
                    <h1 onClick={() => dispatch(setModal(false))} className="cursor-pointer w-36 h-12 text-center font-bold bg-red rounded-lg">No</h1>
                </div>
            </>
        :
        <>
        <Link to="/projects" className="flex justify-center items-center bg-white mt-5 w-32 h-12 hover:border-4 rounded-lg hover:border-black hover:bg-blue hover:text-white">Back</Link>
        <div className="flex">
            <h1 className="flex w-full bg-white mb-10 mt-10 rounded-lg text-7xl justify-left">{projectData?.name}</h1>
        </div>
        <div className="bg-off-white w-full justify-items-center">
            <div className="w-full">
                <h1 className="mt-4 text-4xl">In Progress Tasks</h1>
            </div>
            <div className="w-full justify-items-center grid grid-cols-2 gap-4">
                {allTasks.length == 0 ? <h1>Loading data...</h1> : allTasks.map(bug => {
                    if (bug.status === 1){
                        return (<Card key={bug._id} issue={bug}/>)
                    }
                }
            )}
            </div>
            <div className="flex h-12 w-full mt-10 justify-center ">
                <Link to="new_task" className = "flex h-full w-6/12 group border-dashed border-blue border-4 rounded-lg justify-center hover:bg-white hover:border-4 ">
                    <div className = "flex justify-center items-center text-blue w-12 group-hover:text-red">
                        <AddCircleOutlineIcon sx={{height: "100%", width: "100%"}}/>
                    </div>
                </Link>
            </div>
            <div className="w-full text-4xl">
                <h1 className="mt-16">Completed Tasks</h1>
            </div>
            <div className="w-full justify-items-center grid grid-cols-2 gap-4">
            {allTasks.length == 0 ? <h1>Loading data...</h1> : allTasks.map(bug => {
                    if (bug.status === 0){
                        return (<Card key={bug._id} issue={bug}/>)
                    }
                }
            )}
            </div>
        </div>
        </>}
        </>
    )
}