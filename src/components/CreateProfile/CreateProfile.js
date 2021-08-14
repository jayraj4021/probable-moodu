import {React, useState} from 'react';
import './CreateProfile.css'
import Button from '@material-ui/core/Button';
import { supabase } from '../../supabaseClient'

const CreateProfile = ({history}) => {

    const [loading, setLoading] = useState(false)
    const [firstname,setFirstName] = useState('');
    const [lastname,setLastName] = useState('');
    const [dob,setDOB] = useState('');

    const currentUser = supabase.auth.user()

    const handleCreateProfile = async(firstname,lastname,dob) => {

        try {
            setLoading(true)
            const { data, error } = await supabase
            .from('profiles')
            .insert([
                {   
                    id: currentUser.id, 
                    firstname,
                    lastname,
                    dob 
                },
            ])
            if (error) throw error
            history.push('/home')
        } catch (error) {
            alert(error.error_description || error.message)
            setLoading(false)
        } finally {
            
        }
    }

    return (
        <div className='createProfileContainer'>
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

            <p>Enter Last Name</p>
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
                      handleCreateProfile(firstname,lastname,dob)
                  }}
                  disabled={loading}
                  style={{color:'white', width:'100%'}}>
                      {loading ? <span>Updating Profile</span> : <span>Submit</span>}
              </Button>
          </div>
        </div>
    )
}

export default CreateProfile
