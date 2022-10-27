import { Link } from "react-router-dom"
import { deleteTask } from "../../api/api"
import { setRefresh, setModal, setDelete, setModalType } from "../../reduxActions"
import { useDispatch } from "react-redux"
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function Card({issue}) {
    let url
    let dispatch = useDispatch()

    if (issue) {
        JSON.parse(JSON.stringify(issue))
        url = `/view_task/${issue._id}`
    }

    async function handleArchive() {
        dispatch(setModal(true))
        dispatch(setDelete(issue._id))
        dispatch(setModalType("Archive"))
    }

    async function handleDelete() {
        dispatch(setModal(true))
        dispatch(setDelete(issue._id))
        dispatch(setModalType("Delete"))
    }

    return (
        <>
        {issue 
        ?
        <div className = "transition-all flex flex-col duration-200 w-full h-full p-5 mt-5 ml-5 mr-5 border-solid rounded-lg cursor-pointer group bg-white hover:bg-hover-gray hover:border-purple">
            <Link className = "h-full" to={url}>
                <div className="w-full pl-2 bg-blue rounded-lg">
                    <h1 className = "text-3xl text-white truncate font-bold">{issue.title}</h1>
                </div>
                <div className="mt-4">
                    <span className="font-bold text-2xl">Bug Description:</span>
                    <h2 className = "text-lg">{issue.description}</h2>
                </div>
            </Link>
            <div className="flex justify-end">
                <div className="flex hover:bg-white h-12 w-12 text-green rounded-full justify-center items-center" onClick={() => handleArchive()}>
                    <CheckCircleOutlineIcon sx={{height: "100%", width: "100%"}}/>
                </div>
                <div className="flex hover:bg-white h-12 w-12 text-red justify-center rounded-full items-center" onClick={() => handleDelete()}>
                    <HighlightOffIcon sx={{height: "100%", width: "100%"}}/>
                </div>
            </div>
        </div>
        :
        <div className = "transition-all flex duration-200 w-full h-full m-5 rounded-lg cursor-pointer bg-white hover:bg-hover-gray hover:border-purple">
            <Link className = "w-full h-full" to="/new_task">
                <h1 className = "text-3xl text-center font-bold">New Issue</h1>
            </Link>
        </div>}
    </>
    )
}
