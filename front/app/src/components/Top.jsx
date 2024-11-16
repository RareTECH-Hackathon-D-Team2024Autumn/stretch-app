import React from "react";
import "../styles/Top.css";
import Header from "./Header";
import Footer from "./Footer";
import Yturl from "./Yturl";

export default function Top(props) {
  
  return (
    <>
      <Header />
      <main className="maincontainer">
        <div>
            <Yturl allYturlData={props.allYturlData}/>
        </div>
      </main>
      <Footer />
    </>
  );
}


