import React, { useState, useEffect } from 'react';
import './home.css';
import { supabase } from '../../supabaseClient';
import DataCard from '../../components/DataCard/DataCard';
import DataEntry from '../../components/DataEntry/DataEntry';

const Home = ({homeCompToShow}) => {

    console.log(homeCompToShow)

    // Get user name from profile table
    let currentUser = supabase.auth.user();

    // Get the data to display
    const [previousNotes,setPreviousNotes] = useState([])

    useEffect(() => {
      if (homeCompToShow==2){
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
          return <div>case 0</div>;
        case 1:
          return <DataEntry/>;
        case 2:
          return (previousNotes.map(el=>(
            <div style={{width:'100%',paddingBottom:'20px',
              display:'flex',
              flexDirection:'column',
              alignItems:'flex-start'}}>
                {el.created_date}
                <DataCard noteData={el}/>
            </div>
          )));
        case 3:
          return <div>case 3</div>;
        default:
          return <div>Default</div>
      }
    }

    return (
        <div className='homeContainer'>
          <h2 style={{paddingBottom:'20px'}}>Hi User,</h2>
          <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'flex-start',paddingBottom:'20px'}}>
            {compRender(homeCompToShow)}
          </div>
        </div>
    )
}

export default Home;
