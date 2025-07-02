import React, {useContext, useEffect, useState} from 'react'
import './mgptAI.css'
import { Context } from '../../context/context.jsx'

export default function mgptAI() {
    // Importing from the Context provider...
    const { onSent } = useContext(Context);
  return (
    <div>
      <h1>This is the gemini Area : </h1>
    </div>
  )
}
