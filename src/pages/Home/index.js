import React, { useState, useEffect } from 'react';
import './home.css';
import { supabase } from '../../supabaseClient';
import DataCard from '../../components/DataCard/DataCard';
import DataEntry from '../../components/DataEntry/DataEntry';
import HomeProfile from '../../components/HomeProfile/HomeProfile';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Home = ({homeCompToShow,fname,lname,setFname,setLname,firstLogin}) => {

    console.log(homeCompToShow)
    const widthCheckQuery = useMediaQuery('(min-width:600px)');

    // Get the data to display
    const [previousNotes,setPreviousNotes] = useState([])

    useEffect(() => {
      if (homeCompToShow===2){
        async function fetchData(){
          let { data: data_table, error } = await supabase
          .from('data_table')
          .select('*');

          setPreviousNotes(data_table);
        };
        fetchData();
      }
    },[homeCompToShow]);

    const compRender = (homeCompToShow) => {
      switch(homeCompToShow){
        case 0:
          return <HomeProfile setFname={setFname} setLname={setLname} firstLogin={firstLogin}/>;
        case 1:
          return <DataEntry/>;
        case 2:
          return (previousNotes.map(el=>(
            <div style={{width:'100%',paddingBottom:'20px',
              display:'flex',
              flexDirection:'column',
              alignItems:'flex-start'}}>
                <div style={{backgroundColor:'#00ADB5', 
                  padding:'2px 7px', 
                  borderTopLeftRadius:'5px',
                  borderTopRightRadius:'5px'}}>{el.created_date}</div>
                <DataCard noteData={el}/>
            </div>
          )));
        case 3:
          return <div>case 3</div>;
        default:
          return <div>Default</div>
      }
    }

    let homeClass = 'homeContainer';
    if(widthCheckQuery){
      homeClass += ' homeBigScreenPadding'
    }

    return (
        <div className={homeClass}>
          {homeCompToShow!==0?<h2 style={{paddingBottom:'20px'}}>Hi {fname+' '+lname}👋,</h2>:<h2>Update Profile</h2>}
          <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'flex-start',paddingBottom:'20px'}}>
            {compRender(homeCompToShow)}
          </div>
        </div>
    )
}

export default Home;
