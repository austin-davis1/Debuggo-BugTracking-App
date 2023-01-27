import Chart from "react-apexcharts"
import { useState, useEffect } from "react"

export function BarGraph({labels, data, title}) {
    const [options, setOptions] = useState()
    const [series, setSeries] = useState()
    const [showChart, setShowChart] = useState(false);

    useEffect(() => {
        let option = {}
        option.chart = {id: "basic-bar"}
        option.xaxis = {categories: labels}
        setOptions(option)

        let serie = [{}]
        serie[0].name = "series-1"
        serie[0].data = data
        setSeries(serie)
    }, [])

    useEffect(() => {
        setShowChart(true);
        console.log("BAR OPTIONS")
        console.log(options)

        console.log("BAR SERIES")
        console.log(series)
    },[series, options])

    return (
        <>
        {showChart 
            ?
            <>
                <h1 className="text-3xl font-bold m-2">{title}</h1>
                <Chart options={options} series={series} type="bar" width="500"/>
            </>
            :
            <span>Loading</span>
        }
        </>
    )
}