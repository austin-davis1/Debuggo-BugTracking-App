import { Link } from "react-router-dom"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useDispatch } from "react-redux";
import { setModal, setDelete, setModalType} from "../../reduxActions"

export function ProjectCard({project}) {

    let url = `view_project/${project._id}`

    let dispatch = useDispatch()

    async function handleArchive() {
        dispatch(setModal(true))
        dispatch(setDelete(project._id))
        dispatch(setModalType("Archive"))
    }

    async function handleDelete() {
        dispatch(setModal(true))
        dispatch(setDelete(project._id))
        dispatch(setModalType("Delete"))
    }

    return (
        <div className="flex flex-col bg-white border-solid border-2 border-black rounded-lg p-4 mt-6 mb-6 hover:bg-off-white cursor-pointer">
            <Link to = {url} className="bg-white p-4 mt-6 mb-6 cursor-pointer">
                <h1 className="text-4xl">{project.name}</h1>
                <h2 className="text-lg">Project Description: {project.description}</h2>
            </Link>
            <div className="flex w-full hover:bg-white h-12 text-green justify-center rounded-full items-center" onClick={() => handleArchive()}>
                <CheckCircleOutlineIcon sx={{height: "100%", width: "100%"}}/>
            </div>
            <div className="flex w-full hover:bg-white h-12 text-red justify-center rounded-full items-center" onClick={() => handleDelete()}>
                <HighlightOffIcon sx={{height: "100%", width: "100%"}}/>
            </div>
        </div>
    )
}