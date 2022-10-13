import { Link } from "react-router-dom"
import Card from "../components/card"
import { useSelector } from "react-redux"

export default function Home() {
    let bugs = useSelector(state => state.bugs)
    return (
        <>
            {bugs.length == 0 ? <h1>Loading data...</h1> : bugs.map(bug => <Card issue={bug}/>)}
            <Card/>
        </>
    )
}