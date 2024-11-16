import React from 'react';

export default function Yturl (props){
  return (
    <div>
      {props.allYturlData.map((singleData,index) => 
      <div key={index}>
        <h2>{singleData.title}</h2>
        <p>URL:{singleData.url}</p>
        <p>日付:{singleData.date}</p> 
      </div>)}
    </div>
  )
}
