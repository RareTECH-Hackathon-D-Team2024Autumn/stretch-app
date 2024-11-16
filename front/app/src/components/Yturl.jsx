import React from 'react';

export default function Yturl (props){
  return (
    <div>
      {props.allYturlData.map((singleData,index) => 
      <div key={index}>
        <h2>{singleData.title}</h2>
        <p>日付:{singleData.created_at}</p> 
        <p>サムネイル:{singleData.thumbnail}</p> 
        <p>URL:{singleData.url}</p>
      </div>)}
    </div>
  )
}
