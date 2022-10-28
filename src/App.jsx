import logo from './logo.svg';
import './App.css';
import {useEffect} from 'react'
import {HashRouter as Router, Route, Routes} from "react-router-dom"
import Home from './pages/home';
import { Landing } from './pages/landing';
import ViewTask from './pages/ViewTask';
import NewIssue from './pages/newIssue';
import EditTask from './pages/EditTask';
import { Projects } from './pages/Projects';
import { UserProfile } from './pages/UserProfile';
import {setRefresh, setLoading, setData, setProjects} from "../reduxActions"
import {useSelector, useDispatch} from 'react-redux'
import  { getAllTasks, getAllProjects }  from '../api/api.js'
import { SiteLayout } from "./components/SiteLayout"

function App() {

  let dispatch = useDispatch()

  useEffect(() => {
    async function loadData() {
      let allTasks =  await getAllTasks();
      let projects = await getAllProjects()

      console.log(projects)

      dispatch(setData(allTasks))
      dispatch(setRefresh(false))
      //dispatch(setLoading(false))
      dispatch(setProjects(projects))
    }
    
    loadData()

  }, [useSelector(state => state.needsRefresh)])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing/>} />
        <Route element={<SiteLayout/>}>
          <Route path="/dashboard" element={<Home/>} />
          <Route path="/view_task/:taskId" element={<ViewTask/> } />
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/user_profile" element={<UserProfile/>}/>
          <Route path="/edit_task/:taskId" element={<EditTask/>} />
          <Route path="/new_task" element={<NewIssue/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
