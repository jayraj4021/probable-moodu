import {React,useState,useEffect} from 'react';
import Button from '@material-ui/core/Button';
import { supabase } from '../../supabaseClient';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DataEntry = () => {

  const [rating, setRating] = useState(5)
  const [mood, setMood] = useState('')
  const [todaysNote, setTodaysNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [todaysEntryDone, setTodaysEntryDone] = useState(false)

  const [openSuccess, setOpenSuccess] = useState(false)
  const [openError, setOpenError] = useState(false)

  const currentUser = supabase.auth.user()
  //console.log(currentUser)

  useEffect(() => {
    async function getDataForToday() {
        let { data: data_table, error } = await supabase
        .from('data_table')
        .select("*")
        .eq('created_date', new Date().toISOString().slice(0, 10))

        console.log(data_table)

        if (data_table.length !== 0) {
            setRating(data_table[0].rating)
            setMood(data_table[0].mood)
            setTodaysNote(data_table[0].body)
            setTodaysEntryDone(true)
        }
    }
    getDataForToday();
  }, [])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSuccess(false);
    setOpenError(false);
  };

  const handleSubmit = async () => {
      if (todaysEntryDone) {
        try{
            setLoading(true); 
            const { data, error } = await supabase
            .from('data_table')
            .update({ 
                rating,
                mood,
                'body':todaysNote,
                creator_id:currentUser.id
             })
            .eq('created_date', new Date().toISOString().slice(0, 10))
            if(error) throw error;
            setOpenSuccess(true);
        } catch(error) {
            setOpenError(true);
        } finally {
            setLoading(false);
        }
      } else{
        try{
                setLoading(true);
                const { data, error } = await supabase
                .from('data_table')
                .insert([
                {   rating,
                    mood,
                    'body':todaysNote,
                    created_date:new Date().toISOString().slice(0, 10),
                    creator_id:currentUser.id
                },
                ]);
                if(error) throw error;
                setOpenSuccess(true);
            } catch(error) {
                setOpenError(true);
            } finally {
                setLoading(false);
            }
    }
  }

  return (
    <div style={{width:'100%',backgroundColor:'#393E46',borderRadius:'5px',padding:'20px',
                display:'flex',alignItems:'flex-start',flexDirection:'column',fontFamily:'Open Sans, sans-serif'}}>
        <div style={{display:'flex'}}>
            <p style={{paddingRight:'5px'}}>Select Today's Rating </p>
            <Tooltip 
                title="Select rating between 0 (worst day) and 10 (best day)" 
                placement="top" arrow>
                <InfoOutlinedIcon style={{opacity:'0.5'}}/>
            </Tooltip>
        </div>
        <input
            type="number"
            placeholder="Your Rating"
            value={rating}
            min='0'
            max='10'
            onChange={(e) => setRating(e.target.value)}
            style={{width:'100%', height:'30px',marginBottom:'25px', paddingLeft:'10px'}}
        />

        <div style={{display:'flex'}}>
            <p style={{paddingRight:'5px'}}>Enter Today's Mood </p>
            <Tooltip 
                title="Enter a mood describing your day" 
                placement="top" arrow>
                <InfoOutlinedIcon style={{opacity:'0.5'}}/>
            </Tooltip>
        </div>
        <input
            type="test"
            placeholder="Your dominant mood for the day"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            style={{width:'100%', height:'30px',marginBottom:'25px', paddingLeft:'10px'}}
        />

        <div style={{display:'flex'}}>
            <p style={{paddingRight:'5px'}}> Enter Today's Note </p>
            <Tooltip 
                title="Describe how was your day " 
                placement="top" arrow>
                <InfoOutlinedIcon style={{opacity:'0.5'}}/>
            </Tooltip>
        </div>
        <textarea
            placeholder="Please unload your thoughts ...."
            value={todaysNote}
            onChange={(e) => setTodaysNote(e.target.value)}
            style={{width:'100%',maxWidth:'100%', height:'120px',marginBottom:'25px', padding:'0px 10px'}}
        />
        <div style={{width:'100%'}}>
              <Button 
                  variant="contained" 
                  color="secondary"
                  size='small' 
                  onClick={(e) => {
                      e.preventDefault()
                      handleSubmit(rating,mood,todaysNote);
                  }}
                  disabled={loading}
                  style={{color:'white', width:'100%'}}>
                      {loading ? <span>Submitting ...</span> : <span>Submit</span>}
              </Button>
          </div>
          <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
                Submitted Successfully !!!
            </Alert>
          </Snackbar>
          <Snackbar open={openError} autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                Something went wrong !!!
            </Alert>
          </Snackbar>
    </div>
  )
}

export default DataEntry
