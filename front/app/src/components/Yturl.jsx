import React from "react";
import "../styles/Yturl.css";

export default function Yturl (props){
  return (
    <div>
      {props.allYturlData.map((singleData,index) => 
      <div key={index}>
        <h2><a href={singleData.url} target="_blank" rel="noreferrer">{singleData.title}</a></h2>
        <p>{singleData.created_at}</p> 
        <a href={singleData.url} target="_blank" rel="noreferrer">
          <iframe src={singleData.thumbnail} title="リンク先サムネイル"></iframe>
        </a>
      </div>)}
    </div>
  )
}
