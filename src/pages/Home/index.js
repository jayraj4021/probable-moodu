import React, { useState, useEffect } from 'react';
import './home.css';
import { supabase } from '../../supabaseClient';
import DataCard from '../../components/DataCard/DataCard';
import DataEntry from '../../components/DataEntry/DataEntry';

const Home = () => {

    // Get user name from profile table
    let currentUser = supabase.auth.user();

    // Get the data to display
    const [previousNotes,setPreviousNotes] = useState([])

    useEffect(() => {
      async function fetchData(){
        let { data: data_table, error } = await supabase
        .from('data_table')
        .select('*');

        setPreviousNotes(data_table);
      };
      fetchData();
    },[]);

    console.log(previousNotes)

    return (
        <div className='homeContainer'>
          <h2 style={{paddingBottom:'20px'}}>Hi User,</h2>
          <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'flex-start',paddingBottom:'20px'}}>
            <h3>Let's create today's note</h3>
            <DataEntry/>
          </div>
          <div style={{width:'100%',display:'flex',flexDirection:'column',alignItems:'flex-start',paddingBottom:'20px'}}>
            <h3>Previous Notes</h3>
            {previousNotes.map(el=>(
              <div style={{width:'100%',paddingBottom:'20px',
                display:'flex',
                flexDirection:'column',
                alignItems:'flex-start'}}>
                  {el.created_date}
                  <DataCard noteData={el}/>
              </div>
            ))}
          </div>
        </div>
    )
}

export default Home;
