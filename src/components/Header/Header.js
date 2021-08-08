import React from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link } from 'react-router-dom';
import './Header.css'

export default function Header() {

  const widthCheckQuery = useMediaQuery('(min-width:600px)');

  let toolBarClass = 'toolBar';
  if(widthCheckQuery){
    toolBarClass += ' bigScreenPadding'
  }

  return (
    <div style={{width:'100%'}}>
        <div className={toolBarClass}>
          <Link to='/' style={{color:'white', textDecoration:'none'}}>
            <Typography variant="h6" >
              Moodu
            </Typography>
          </Link>
         
          <Link to="/signin">
            <Button variant="contained" 
                    color="secondary" 
                    size='small' 
                    style={{color:'white'}} >
                      Sign In
            </Button>
          </Link>
        
        </div>
    </div>
  );
}
