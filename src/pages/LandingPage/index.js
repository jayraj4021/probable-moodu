import React from 'react';
import './landingPage.css';
import MainImage from '../../assets/main_image.svg';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link } from 'react-router-dom';

const LandingPage = () => {

    const widthCheckQuery = useMediaQuery('(min-width:600px)');

    let containerClass = 'landingPageContainer'
    if(widthCheckQuery){
        containerClass += ' bigScreenPaddinglp'
    }

    return (
        <div className={containerClass}>
            <div style={{flex:'1 1 0'}}>
                <img src={MainImage} alt='Thought Vector' style={{width:'80%'}}/>
            </div>
            <div style={{flex:'1 1 0'}}>
                <Typography variant='h4'>Moodu helps you evaluate your life.</Typography>
                <Typography variant='h6'>All you need to do is enter a rating, mood and note for the day. 
                    We facilitate you with charts to find trend in your data.
                    Lets get started.</Typography>
                <Link to='/signup'>
                    <Button 
                        variant="contained" 
                        color="secondary"
                        size='small' 
                        style={{color:'white', marginTop:'20px', width:'70%'}}>
                            Sign Up
                    </Button>
                </Link>
            </div>
        </div>
    )
}

export default LandingPage
