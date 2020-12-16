import React, { useEffect, useState } from 'react';
import useCountDown from 'react-countdown-hook';
import './App.css';

// to calculate typing speed
// words typed / minutes
// words typed = (characters - typos) / 5

const secondsToCount = 10;
const paragraph = `Coding is the best. We are able to build something from scratch. It is literally imagination incarnate. Solving our own problems through coding is one of the coolest things we could do!`;

export default function App() {
  const [typed, setTyped] = useState('');
  const [wrongTypos, setWrongTypos] = useState(0);
  const [timeLeft, { start, pause, resume, reset }] = useCountDown(secondsToCount *1000, 100);
  
  useEffect(() => {    
    if(timeLeft  || !typed.length)return;
    const wordsTyped = (typed.length - wrongTypos) / 5;
    const minuteMultiplier = 60 / secondsToCount;
    const wpm = wordsTyped * minuteMultiplier
    alert(`${wpm.toFixed(1)}`);    
  }, [timeLeft]);
  
  useEffect(() => {
    setWrongTypos(0)
    for (let i = 0; i < typed.length; i++){      
      if(typed[i] !== paragraph[i])setWrongTypos(w=>++w)      
    }
  }, [typed]);

  const startTimer = (e) => {    
    setTyped(e.target.value)
    if(timeLeft)return;
    setTyped('')
    start()
  }
  const resetTimer = () => {
    setTyped('')
    reset()
  }
 
  return (
    <div className="app">
      {/* sidebar */}
      <div className="sidebar">
        <div className="timer">{
        (timeLeft / 1000).toFixed(1) < 0.1 
        ? secondsToCount.toFixed(1) 
        : (timeLeft / 1000).toFixed(1)
      }
        </div>
        <button className="start" onClick={startTimer}>Start</button>
        <button className="reset" onClick={resetTimer}>Reset</button>
      </div>

      <div className="content">
        {/* show the paragraph */}
        <p>{paragraph.split('').map((c,i)=>{          
          return <span key={i} className={
          c === typed[i]
          ? 'correct'
          : (typed[i] == undefined ? '' : 'incorrect')
        }>{c}</span>}
        )        
        }</p>

        {/* show the textarea */}
        <form>
          <textarea rows="10" 
          placeholder="Test your typing skills..." 
          value={typed}
          onChange={startTimer}
          />
        </form>
      </div>
    </div>
  );
}
