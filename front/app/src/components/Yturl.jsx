import React from 'react';
import "../styles/Yturl.css";

export default function Yturl (props){
  return (
    <div>
      {props.allYturlData.map((singleData,index) => 
      <div key={index}>
        <h2><a href={singleData.url} target="_blank">{singleData.title}</a></h2>
        <p>{singleData.created_at}</p> 
        <a href={singleData.url} target="_blank">
          <iframe src={singleData.thumbnail} ></iframe>
        </a>
      </div>)}
    </div>
  )
}
