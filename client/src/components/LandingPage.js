import React from "react";
import { Link } from "react-router-dom";
import s from '../styled/LandingPage.module.css'



export default function LandingPage() {


  return (
    <div className={s.landingContainer}>
      <h1 className={s.landingTitle}>Yakko's World</h1>
     <div className={s.text}>
      <p>Have fun with Yakko getting to know countries and activities</p>
     </div>
        <div className={s.buttonContainer}>
        
        <Link to= '/countries'>
        <button className={s.landingButton}>Enter</button>
        </Link>
        </div>
    </div>
  )
}

