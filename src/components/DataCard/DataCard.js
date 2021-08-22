import React from 'react';
import './DataCard.css';

const DataCard = ({noteData}) => {
  return (
    <div className='dataCard'>
      <div style={{padding:'0px 10px'}}>
        <p style={{fontSize:'2rem'}}>{noteData.rating}</p>
        <p style={{fontSize:'0.85rem'}}>{noteData.mood.toUpperCase()}</p>
      </div>
      <div>
        <p>{noteData.body}</p>
      </div>
    </div>
  )
}

export default DataCard
