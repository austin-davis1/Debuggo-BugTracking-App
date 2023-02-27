import Card from "./card"
import { useState, useEffect } from "react"
import { allTags } from "./allTags"
import { useSelector } from "react-redux"
import { Loading } from "../SVGs/Dual Ring-1s-200px"

export function CardSection({cards}) {
    const [filter, setFilter] = useState("Urgent")
    const [selectedTasks, setSelectedTasks] = useState([])
    const [loadingTasks, setLoadingTasks] = useState(false)
    
    useEffect(() => {
        setLoadingTasks(true)
        setSelectedTasks(cards.filter((card) => card.tags.find((tag) => tag == filter && card.status == 1)))
        setLoadingTasks(false)
    }, [filter])

    return (
        <div className="flex flex-col w-auto h-auto rounded-lg p-4 m-4">
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-row ml-4">
                    <span className="text-4xl font-bold">View Tasks</span>
                </div>
                <div className="flex flex-row items-center">
                    <span className="mr-4 ml-4 text-2xl">Filter: </span>
                    <div className="flex flex-row items-center">
                    {allTags.map((tag) => {
                        return (
                            <button key={tag} className={"mr-2 p-2 rounded-lg border border-2 " + (filter == tag ? "bg-blue" : "")} onClick={() => setFilter(tag)}>{tag}</button>
                        )
                    })}
                    </div>
                </div>
            </div>
            {!loadingTasks ?
            <div className="flex flex-col">
                {selectedTasks?.slice(0,4)?.map((card) => {
                    return (
                        <Card issue={card} key={card._id}/>
                    )
                })}
            </div>
            :
            <Loading/>
            }
        </div>
    )
}