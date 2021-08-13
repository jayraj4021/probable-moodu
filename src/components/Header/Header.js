import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { supabase } from '../../supabaseClient';
import { Link} from 'react-router-dom';
import './Header.css'

export default function Header({session,setSession,history}) {

  const widthCheckQuery = useMediaQuery('(min-width:600px)');

  let toolBarClass = 'toolBar';
  if(widthCheckQuery){
    toolBarClass += ' bigScreenPadding'
  }

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      //alert('SignOut successful!!!!')
      if (error) throw error;
      setSession(null)
      history.push('/');
    } catch (error) {
      alert(error.error_description || error.message)
    }
  }

  return (
    <div style={{width:'100%'}}>
        <div className={toolBarClass}>
          <Link to='/' style={{color:'white', textDecoration:'none'}}>
            <Typography variant="h6" >
              Moodu
            </Typography>
          </Link>
         {session ? 
            <Button variant="contained" 
                    color="secondary" 
                    size='small' 
                    onClick={(e)=>{
                        e.preventDefault();
                        handleLogout()
                      }}
                    style={{color:'white'}} >
                      Sign Out
            </Button>
         :
          <Link to="/signin">
            <Button variant="contained" 
                    color="secondary" 
                    size='small' 
                    style={{color:'white'}} >
                      Sign In
            </Button>
          </Link>
        }
        </div>
    </div>
  );
}
