import { Link } from "react-router-dom"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useDispatch } from "react-redux";
import { setModal, setDelete, setModalType} from "../../reduxActions"
import { useState, useEffect } from "react";
import { ActionModal } from "./ActionModal";

export function ProjectCard({project}) {

    let url = `view_project/${project._id}`

    const [modalAction, setModalAction] = useState(null)
    const [modalType, setModalType] = useState({})
    const [selectedData, setSelectedData] = useState([])
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        if (modalAction !== null) {
            console.log(modalAction)
            let data = project
            let type = {}
    
            if (modalAction == "Delete") {
                type.title = "Delete Project"
                type.message = "Are you sure you want to delete this project? If you delete it, it will be deleted from your history forever, and all tasks under this project will also be deleted."
                type.action = "DeleteProject"
            } else if (modalAction == "Archive") {
                type.title = "Mark as completed"
                type.message = "Are you sure you want to mark this project as completed? All tasks under this project will be marked completed as well."
                type.action = "ArchiveProject"
            } else if (modalAction == "Revert") {
                type.title = "Revert Project"
                type.message = "Are you sure you want to change this project from complete to in-progress? All tasks under this project will be marked as in-progress."
                type.action = "RevertProject"
            }
    
            setModalType(type)
            setShowModal(true)
            setSelectedData(data)
        }
    }, [modalAction])

    let dispatch = useDispatch()

    /*async function handleArchive() {
        dispatch(setModal(true))
        dispatch(setDelete(project._id))
        dispatch(setModalType("Archive"))
    }

    async function handleDelete() {
        dispatch(setModal(true))
        dispatch(setDelete(project._id))
        dispatch(setModalType("Delete"))
    }*/

    return (
        <>
        {showModal && <ActionModal type={modalType} data={selectedData} showModal={showModal} setShowModal={setShowModal}/>}
        <div className="flex flex-col bg-white border-solid border-2 border-black rounded-lg p-2 mt-6 mb-6 hover:bg-off-white cursor-pointer">
            <Link to = {url} className="flex flex-row bg-white p-2 mt-2 mb-6 cursor-pointer">
                <div className="border-2 border-blue rounded-lg p-2 text-white bg-blue">
                    <h1 className="text-4xl font-bold">{project.title}</h1>
                </div>
            </Link>
            <div className="flex flex-row">
                <div className="flex w-full hover:bg-white h-12 text-green justify-center rounded-full items-center" onClick={() => setModalAction("Archive")}>
                    <CheckCircleOutlineIcon sx={{height: "100%", width: "100%"}}/>
                </div>
                <div className="flex w-full hover:bg-white h-12 text-red justify-center rounded-full items-center" onClick={() => setModalAction("Delete")}>
                    <HighlightOffIcon sx={{height: "100%", width: "100%"}}/>
                </div>
            </div>
        </div>
        </>
    )
}