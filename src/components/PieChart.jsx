import Chart from "react-apexcharts"
import { useState, useEffect } from "react"
import { useSelector } from "react-redux"
import { setLoading } from "../../reduxActions"

export function PieChart({pieOptions, title}) {
    const [options, setOptions] = useState({})
    const [series, setSeries] = useState([])
    const [showChart, setShowChart] = useState(false);

    console.log("Pie Options Object")
    console.log(pieOptions)
 
    useEffect(() => {
        setOptions({
            ...options,
            chart: {width: 380, type: {type: "pie"}},
            labels: pieOptions.labels
        })
        setSeries(pieOptions.data)
    }, [])

    useEffect(() => {
        setShowChart(true);
    },[series, options])

    return (
        <>
            {(showChart === true)
            ?
            <>
                <h1 className="text-3xl font-bold m-2">{title}</h1>
                <Chart options={options} series={series} type="pie" width="500"/>
            </>
            :
            <>
                Loading...
            </>
            }
        </>
    )
}