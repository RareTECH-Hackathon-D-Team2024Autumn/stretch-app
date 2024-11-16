import React from 'react';
import { useState } from 'react';

export default function Yturl () {
  const [allYturlData,setAllYturlData] = useState([]);

  const getAllYturlData = () =>{
    fetch("https://a43d9cf5-d889-4ff7-8926-3963283fd8a4.mock.pstmn.io/stretch_app/videoes")
  .then(res => res.json()).then(data => setAllYturlData(data))}

  return (
    <div>
      <button onClick={getAllYturlData}>Get All URL</button>
      {allYturlData.map((singleData,index) => 
      <div key={index}>
        <h2>{singleData.title}</h2>
        <p>URL:{singleData.url}</p>
        <p>日付:{singleData.date}</p> 
      </div>)}
    </div>
  )
}
