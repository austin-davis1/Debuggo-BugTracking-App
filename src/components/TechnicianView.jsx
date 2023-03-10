import { CardSection } from "./CardSection"
import { useSelector } from "react-redux"
import { allTags } from "./allTags"
import { useState, useEffect } from "react"
import { UserSection } from "./UserSection"
import { BarGraph } from "./BarGraph"
import { PieChart } from "./PieChart"
import { Loading } from "./LoadingIndicator"
import { PercentBar } from "./PercentBar"
import { getAllUsers } from "../data/api"
import { UpcomingTasks } from "./UpcomingTasks"

export function TechView() {
    let allTasks = useSelector(state => state.bugs)
    let allProjects = useSelector(state => state.projects)
    let loading = useSelector(state => state.isLoading)

    const [userTasks, setUserTasks] = useState([])
    const [userProjects, setUserProjects] = useState([])
    const [userTasksLoaded, setUserTasksLoaded] = useState(false)
    const [percentageObject, setPercentageObject] = useState({})
    const [pieOptions, setPieOptions] = useState({labels: [], data: []});
    const [pieLoaded, setPieLoaded] = useState(false)
    const [barLabels, setBarLabels] = useState([])
    const [barData, setBarData] = useState([])
    const [barLoaded, setBarLoaded] = useState(false)
    const [bar2Labels, setBar2Labels] = useState([])
    const [bar2Data, setBar2Data] = useState([])
    const [bar2Loaded, setBar2Loaded] = useState(false)
    
    const projectColors = ["#ff4560", "#feb019", "#00e396", "#008ffb", "#0068b9", "#775dd0"]
    const debuggoBlue = ["#004aad"]

    let user = sessionStorage.getItem("User")
    let userObj = JSON.parse(user)
    let username = userObj.username

    useEffect(() => {
        let activeTasks = []
        let activeProjects = []

        function findProjects() {
            for (let project of allProjects.filter((project) => project.status == 1)) {
                if (activeTasks.find((task) => task.projectId == project._id)) {
                    activeProjects.push(project)
                }
            }
            setUserProjects(activeProjects)
        }
    
        function findTasks() {
            for (let task of allTasks.filter((task) => task.status == 1)) {
                if (task.users.find(user => user.username == username)) {
                    activeTasks.push(task)
                }
            } 
            setUserTasks(activeTasks)
            setUserTasksLoaded(true)
        }

        findTasks()
        findProjects()
    }, [])

    useEffect(() => {
        function calculatePercentages(tags) {
            let percentageObj = {}
            for (let tag of tags) {
                let tagCount = userTasks.filter((task) => task.tags.find((tagItem) => tagItem == tag) && task.status == 1).length
                percentageObj[tag] = tagCount / userTasks.length
            }
            setPercentageObject(percentageObj)
        }

        function calculateTasksPerProject(tasks) {
            let freqMap = {}
            for (let task of tasks) {
                if (task.projectId in freqMap) {
                    freqMap[task.projectId] += 1
                } else {
                    freqMap[task.projectId] = 1
                }
            }
    
            let labels = []
            for (let project of allProjects) {
                if (project._id in freqMap) {
                    labels.push(project.title)
                }
            }
    
            const pieData = Object.values(freqMap);
            if (Object.keys(freqMap).length > 0 && labels.length > 0) {
                setPieOptions({
                    ...pieOptions,
                    labels:labels,
                    data:pieData
                })
            }
        }

        const MILLISECONDS_IN_WEEK = 604800000
        let currentDate = new Date() 
        let currentTime = currentDate.getTime()
        let currentWeek
        let currentWeekTasks
        let currentWeekCount

        function calculateTasksByDate() {
            currentDate = new Date() 
            currentTime = currentDate.getTime()

            currentWeek = currentTime - MILLISECONDS_IN_WEEK
            let lastWeek = currentTime - (MILLISECONDS_IN_WEEK * 2)
            let twoWeek = currentTime - (MILLISECONDS_IN_WEEK * 3)
            let threeWeek = currentTime - (MILLISECONDS_IN_WEEK * 4)

            let currentWeekDate = new Date(currentWeek)
            let lastWeekDate = new Date(lastWeek)
            let twoWeekDate = new Date(twoWeek)
            let threeWeekDate = new Date(threeWeek)


            currentWeekTasks = userTasks.filter((task) => {
                if (task.dateCompleted !== null) {
                    let completeDate =  new Date(task.dateCompleted)
                    return (completeDate.getTime() > currentWeek)
                }
            })

            currentWeekCount = currentWeekTasks.length

            let lastWeekCount = allTasks.filter((task) => {
                if (task.dateCompleted !== null) {
                    let completeDate =  new Date(task.dateCompleted)
                    return (completeDate.getTime() > lastWeek && completeDate.getTime() < currentWeek)
                }
            }).length

            let twoWeekCount = allTasks.filter((task) => {
                if (task.dateCompleted !== null) {
                    let completeDate =  new Date(task.dateCompleted)
                    return (completeDate.getTime() > twoWeek && completeDate.getTime() < lastWeek)
                }
            }).length

            let threeWeekCount = allTasks.filter((task) => {
                if (task.dateCompleted !== null) {
                    let completeDate =  new Date(task.dateCompleted)
                    return (completeDate.getTime() > threeWeek && completeDate.getTime() < twoWeek)
                }
            }).length

            setBarLabels([
                threeWeekDate.toString().slice(4, 10),
                twoWeekDate.toString().slice(4, 10),
                lastWeekDate.toString().slice(4, 10),
                currentWeekDate.toString().slice(4, 10)
            ])

            setBarData([
                threeWeekCount,
                twoWeekCount,
                lastWeekCount,
                currentWeekCount
            ])
        }
    
        function calculateTasksCompletedByProject() {
            let freqMap = {}
            
            for (let project of allProjects) {
                let currentProjectCount = currentWeekTasks.filter((task) => task.projectId == project._id).length
                freqMap[project.title.slice(0,10)] = currentProjectCount
            }

            console.log("BAR 2 KEYS")
            console.log(Object.keys(freqMap))

            console.log("BAR 2 VALUES")
            console.log(Object.values(freqMap))

            setBar2Labels(Object.keys(freqMap))
            setBar2Data(Object.values(freqMap))
        }
        
        if (userTasks.length != 0) {
            calculateTasksPerProject(userTasks)
            calculatePercentages(allTags)
            calculateTasksByDate()
            calculateTasksCompletedByProject()
        }
    }, [useSelector(state => state.isLoading), userTasks])



    useEffect(() => {
        if (pieOptions.labels.length > 0 && pieOptions.data.length > 0) {
            setPieLoaded(true)
        }
    }, [pieOptions])

    useEffect(() => {
        if (barLabels.length > 0 && barData.length > 0) {
            setBarLoaded(true)
        }
    }, [barData, barLabels])

    useEffect(() => {
        if (bar2Labels.length > 0 && bar2Data.length > 0) {
            setBar2Loaded(true)
        }
    }, [barData, barLabels])

    return (
        <>
            {userTasksLoaded ?
            <div className="grid grid-cols-8 gap-4 my-8">
                <div className="flex flex-col col-span-2 row-span-2 h-auto ">
                    <div className="flex flex-col bg-white mb-4 h-1/2 rounded-lg">
                        <span className="m-2 font-bold text-3xl">Your Active Projects</span>
                        <h1 className="flex h-full w-full justify-center items-center font-bold text-8xl text-blue">{userProjects.filter((project) => project.status == 1).length}</h1>
                    </div>
                    <div className="flex flex-col bg-white h-1/2 rounded-lg">
                        <span className="m-2 font-bold text-3xl">Your Active Tasks</span>
                        <h1 className="flex h-full w-full justify-center items-center font-bold text-8xl text-blue">{userTasks.filter((task) => task.status == 1).length}</h1>
                    </div>
                </div>
                <div className="col-span-2 row-span-2 h-auto bg-white rounded-lg">
                    {barLoaded
                    ?
                    <>
                        <BarGraph title={"Your Tasks Completed Per Week"} labels={barLabels} data={barData} colors={debuggoBlue}/>
                    </>
                    :
                    <>
                        <Loading/>
                    </>}
                </div>

                <div className="col-span-2 row-span-2 bg-white h-auto rounded-lg">
                    {pieLoaded
                    ?
                    <>
                        <PieChart pieOptions={pieOptions} title={"Your Task Distribution Per Project"} colors={projectColors}/>
                    </>
                    : 
                    <>
                        <Loading/>
                    </>}
                </div>

                <div className="col-span-2 row-span-2 h-auto bg-white rounded-lg">
                    {bar2Loaded
                    ?
                    <>
                        <BarGraph title={"Tasks Completed By Project This Week"} labels={bar2Labels} data={bar2Data} colors={projectColors}/>
                    </>
                    :
                    <>
                        <Loading/>
                    </>}
                </div>
                <div className="col-span-4 row-span-3 bg-white rounded-lg">
                    <CardSection cards={userTasks} title={"View Your Tasks"}/>
                </div>
                <div className="col-span-4 bg-white rounded-lg">
                    <UpcomingTasks tasks={userTasks} title={"Upcoming Task Dates"}/>
                </div>
                <div className="col-span-4 row-span-2 p-4 bg-white rounded-lg">
                    <div className="p-2 rounded-lg w-auto">
                        <span className="m-2 font-bold text-3xl">Your Task Percentage By Tag</span>
                            <div className="grid grid-cols-2">
                                {allTags.map((tag) => {
                                    return (
                                        <div key={tag}>
                                            <div className="justify-between">
                                                <span className="m-2">{tag}</span>
                                                <div className="flex flex-row">
                                                    <PercentBar percent={Math.round(percentageObject[tag] * 100)}/>
                                                    <span>{Math.round(percentageObject[tag] * 100)}%</span>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                    </div>
                </div>

            </div>
            :
            <Loading/>
            }
        </>
    )
}