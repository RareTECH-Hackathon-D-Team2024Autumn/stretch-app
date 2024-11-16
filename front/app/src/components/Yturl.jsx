import React from 'react';

export default function Yturl (props){
  return (
    <div>
      {props.allYturlData.map((singleData,index) => 
      <div key={index}>
        <h2><a href={singleData.url} target="_blank">{singleData.title}</a></h2>
        <p>{singleData.created_at}</p> 
        <iframe src={singleData.thumbnail}></iframe>
      </div>)}
    </div>
  )
}
