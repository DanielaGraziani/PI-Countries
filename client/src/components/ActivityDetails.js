import React from 'react'
import { useSelector } from 'react-redux'
import Activity from './Activity'




export default function ActivityDetails() {
  
  const activities = useSelector((state)=> state.activities)
  
  
  {activities?.map((act) => {
    return (
      <div>
        <Activity
          Name= {act.name}
          Difficulty={act.difficulty}
          Duration={act.duration}
          Season = {act.season}
        />
    </div>
    );
  })}

}

