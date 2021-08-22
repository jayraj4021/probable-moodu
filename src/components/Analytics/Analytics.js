import {React, useEffect, useState} from 'react';
import { supabase } from '../../supabaseClient';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { Line } from "react-chartjs-2";
import { colors } from '@material-ui/core';



const Analytics = () => {

    const todaysDate = new Date()
    const sevenDaysBackDate = new Date(todaysDate)
    sevenDaysBackDate.setDate(sevenDaysBackDate.getDate() - 7)

    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(sevenDaysBackDate);
    const [endDate, setEndDate] = useState(todaysDate);
    const [dateList, setDateList] = useState([]);
    const [ratingData, setRatingData] = useState([]);

    const chartData = {
        labels: dateList,
        datasets: [
          {
            label: "Ratings",
            data: ratingData,
            fill: true,
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "#00ADB5"
          }
        ]
    }

    const options = {
        plugins: {
            legend: {
                display: false,
            }
        },
        scales:{
            yAxis:{
                min:0,
                max:10,
                grid:{
                    color:'#393E46'
                },
                ticks:{
                    color:'#EEEEEE',
                    fontFamily:'Open Sans'
                }
            },
            xAxis:{
                grid:{
                    color:'#393E46'
                },
                ticks:{
                    color:'#EEEEEE',
                    fontFamily:'Open Sans'
                }
            }
        }
    }

    useEffect(()=>{
        async function fetchData(){
            let { data: data_table, error } = await supabase
            .from('data_table')
            .select('*')
            .gte('created_date',startDate.toISOString())
            .lte('created_date',endDate.toISOString())
  
            setData(data_table);
          };
          fetchData();
    },[startDate,endDate]);

    useEffect(()=>{

        let dateList = [];
        let pushDate = new Date(endDate)
        while(startDate.toLocaleDateString() !== pushDate.toLocaleDateString()){
            dateList.push(pushDate.toISOString().split('T')[0]);
            pushDate.setDate(pushDate.getDate()-1)
        }
        dateList.push(startDate.toISOString().split('T')[0])
        
        let ratingList = []
        dateList.forEach(el=>{
            ratingList.push(data.filter(el1=>el1.created_date === el).length===1 ?
            data.filter(el1=>el1.created_date === el).map(el2=>el2.rating)[0] : null)
        })

        setDateList([...dateList].reverse())
        setRatingData([...ratingList].reverse())

    },[startDate, endDate,data])

    console.log(data)
    
    return (
        <>
            <div style={{width:'100%'}}>
                <div style={{backgroundColor:'#393E46', padding:'10px', display:'flex',alignItems:'center', justifyContent:'space-around', width:'100%'}}>
                    <p>Select a start date :</p>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker format="dd-MM-yyyy" value={startDate} onChange={setStartDate} />
                    </MuiPickersUtilsProvider>
                </div>
                <div style={{backgroundColor:'#393E46', padding:'10px', display:'flex',alignItems:'center', justifyContent:'space-around', width:'100%'}}>
                    <p>Select an end date :</p>
                    <MuiPickersUtilsProvider  utils={DateFnsUtils}>
                        <DatePicker format="dd-MM-yyyy" value={endDate} onChange={setEndDate} />
                    </MuiPickersUtilsProvider>
                </div>
            </div>
            <div style={{width:'100%',paddingTop:'20px',display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                <p style={{paddingBottom:'10px'}}>Rating Chart</p>
                <Line data={chartData} options={options} />
            </div>
        </>
    )
}

export default Analytics
