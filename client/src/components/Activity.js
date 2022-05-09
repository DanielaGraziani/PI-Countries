import React from 'react'
import s from "../styled/Activity.module.css"


export default function Activity({name, season, duration, difficulty, countryId}) {
  return (
    <div className={s.container}>
        <p className={s.activityTitle}>Activity: {name}</p>
        <p className={s.activityTitle}>Season: {season}</p >
        <p className={s.activityTitle}>Duration: {duration} days</p >
        <p className={s.activityTitle}>Difficulty: {difficulty}/5</p >
        <p className={s.activityTitle}>{countryId}</p >
    </div>
  )
}
