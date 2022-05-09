import React from "react";
import { Link } from "react-router-dom";
import s from '../styled/LandingPage.module.css'



export default function LandingPage() {


  return (
    <div className={s.landingContainer}>
      <h1 className={s.landingTitle}>Countries App</h1>
     <div className={s.text}>
      <p>Welcome to this experience</p>
     </div>
        <div className={s.buttonContainer}>
        
        <Link to= '/countries'>
        <button className={s.landingButton}>Enter</button>
        </Link>
        </div>
    </div>
  )
}

