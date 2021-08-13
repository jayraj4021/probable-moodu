import {React,useState} from 'react';
import Button from '@material-ui/core/Button';

const DataEntry = () => {

  const [rating, setRating] = useState(0)
  const [mood, setMood] = useState('')
  const [todaysNote, setTodaysNote] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {

  }

  return (
    <div style={{width:'100%',backgroundColor:'#393E46',borderRadius:'5px',padding:'20px',
                display:'flex',alignItems:'flex-start',flexDirection:'column'}}>
        <p>Select Today's Rating</p>
        <input
            type="number"
            placeholder="Your Rating"
            value={rating}
            min='0'
            max='10'
            onChange={(e) => setRating(e.target.value)}
            style={{width:'100%', height:'30px',marginBottom:'25px', paddingLeft:'10px'}}
        />
        <p>Enter Today's Mood</p>
        <input
            type="test"
            placeholder="Your dominant mood for the day"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            style={{width:'100%', height:'30px',marginBottom:'25px', paddingLeft:'10px'}}
        />
        <p>Enter Today's Note</p>
        <textarea
            placeholder="Please unload your thoughts ...."
            value={todaysNote}
            onChange={(e) => setTodaysNote(e.target.value)}
            style={{width:'100%',maxWidth:'100%', height:'30px',marginBottom:'25px', padding:'0px 10px'}}
        />
        <div style={{width:'100%'}}>
              <Button 
                  variant="contained" 
                  color="secondary"
                  size='small' 
                  onClick={(e) => {
                      e.preventDefault()
                      handleSubmit(rating,mood,todaysNote)
                  }}
                  disabled={loading}
                  style={{color:'white', width:'100%'}}>
                      {loading ? <span>Submitting ...</span> : <span>Submit</span>}
              </Button>
          </div>
    </div>
  )
}

export default DataEntry
