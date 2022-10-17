import logo from './logo.svg';
import './App.css';
import {useEffect} from 'react'
import {HashRouter as Router, Route, Routes} from "react-router-dom"
import Home from './pages/home';
import ViewTask from './pages/ViewTask';
import NewIssue from './pages/newIssue';
import EditTask from './pages/EditTask';
import {setLoading, setRefresh, setData} from "../reduxActions"
import {useSelector, useDispatch} from 'react-redux'
import  { getAllTasks }  from '../api/api.js'

function App() {

  let dispatch = useDispatch()

  useEffect(() => {
    async function loadData() {
      let allTasks =  await getAllTasks();

      dispatch(setData(allTasks))
      dispatch(setRefresh(false))
    }
    
    loadData()

  }, [useSelector(state => state.needsRefresh)])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/view_task/:taskId" element={<ViewTask/> } />
        <Route path="/edit_task/:taskId" element={<EditTask/>} />
        <Route path="/new_task" element={<NewIssue/>} />
      </Routes>
    </Router>
  );
}

export default App;
