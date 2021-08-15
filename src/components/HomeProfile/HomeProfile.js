import {React, useState, useEffect} from 'react';
import './HomeProfile.css'
import Button from '@material-ui/core/Button';
import { supabase } from '../../supabaseClient'

const HomeProfile = ({setFname,setLname,firstLogin}) => {
    const [loading, setLoading] = useState(false)
    const [firstname,setFirstName] = useState('');
    const [lastname,setLastName] = useState('');
    const [dob,setDOB] = useState('');

    const currentUser = supabase.auth.user()

    useEffect( ()=>{
        async function fetchData(){
            try {
                let { data: profiles, error } = await supabase
                .from('profiles')
                .select('*');
                if (error) throw error
                console.log(profiles)
                if(profiles.length!==0) {
                    setFirstName(profiles[0].firstname)
                    setLastName(profiles[0].lastname)
                    setDOB(profiles[0].dob)
                }
            } catch (error) {
                //alert(error.error_description || error.message)
            } finally {
                
            }
        }
        fetchData();
    },[])

    const handleUpdateProfile = async(firstname,lastname,dob) => {

        if (firstLogin){
            try{
                setLoading(true)
                const { data, error } = await supabase
                .from('profiles')
                .insert([
                    {   
                        firstname,
                        lastname,
                        dob,
                        id:currentUser.id
                    },
                ])
                setLoading(false)
            } catch (error){
                alert(error.error_description || error.message)
                setLoading(false)
            }
        } else {
            try {
                setLoading(true)
                const { data, error } = await supabase
                .from('profiles')
                .update([
                    {   
                        firstname,
                        lastname,
                        dob 
                    },
                ])
                .eq('id', currentUser.id)
                if (error) throw error
                setFname(data[0].firstname)
                setLname(data[0].lastname)
                setLoading(false)
            } catch (error) {
                alert(error.error_description || error.message)
                setLoading(false)
            } finally {
                
            }
        }
    }

   

    return (
        <div className='homeProfileContainer'>
            <p>Enter First Name</p>
            <input
                type="text"
                placeholder="Your First Name"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                style={{width:'100%', height:'30px',marginBottom:'25px', paddingLeft:'10px'}}
            />

            <p>Enter Last Name</p>
            <input
                type="text"
                placeholder="Your Last Name"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                style={{width:'100%', height:'30px',marginBottom:'25px', paddingLeft:'10px'}}
            />

            <p>Enter Date of Birth</p>
            <input
                type="date"
                placeholder="Your Date of Birth"
                value={dob}
                onChange={(e) => setDOB(e.target.value)}
                style={{width:'100%', height:'30px',marginBottom:'25px', paddingLeft:'10px'}}
            />

            <div style={{width:'100%'}}>
              <Button 
                  variant="contained" 
                  color="secondary"
                  size='small' 
                  onClick={(e) => {
                      e.preventDefault()
                      handleUpdateProfile(firstname,lastname,dob)
                  }}
                  disabled={loading}
                  style={{color:'white', width:'100%'}}>
                      {loading ? <span>Updating Profile</span> : <span>Update</span>}
              </Button>
          </div>
        </div>
    )
}

export default HomeProfile
