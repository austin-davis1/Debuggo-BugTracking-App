import { ProjectCard } from "../components/projectCard"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { setRefresh, setModal } from "../../reduxActions"
import { deleteProject, editProject } from "../data/api.js"

export function Projects() {

    let dispatch = useDispatch()
    let projects = useSelector(state => state.projects)

    let isModal = useSelector(state => state.deleteModal)
    let deleteId = useSelector(state => state.selectedDelete)
    let modalType = useSelector(state => state.modalType)

    async function handleEvent(id) {
        let data = projects.find(project => project._id == id)

        modalType == "Delete" ? await deleteProject(id) : await editProject(id, data, 0)
        dispatch(setRefresh(true))
        dispatch(setModal(false))
    }


    return (
        <div className="h-auto">
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
        <div className="flex flex-col w-full">
            {projects.map(project => <ProjectCard key={project._id} project={project}/>)}
            <Link to="new_project" className = "flex justify-center bg-white border-solid border-2 border-black rounded-lg p-4 mt-6 mb-6 hover:bg-off-white cursor-pointer">
                <h1 className="text-4xl justify-center">New Project</h1>
            </Link>
        </div>
        }
    </div>
    )
}