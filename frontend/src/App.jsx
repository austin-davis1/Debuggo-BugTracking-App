import logo from './logo.svg';
import './App.css';

import {HashRouter as Router, Route, Routes} from "react-router-dom"
import Home from './pages/home';
import ViewTask from './pages/ViewTask';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/view_task" element={<ViewTask/> } />
      </Routes>
    </Router>
  );
}

export default App;
