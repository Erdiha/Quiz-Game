import React, { useEffect, useState } from 'react';
function GameOptions({ setDetails, setDisplayQuestion, details }) {
  const buttonArr = [];
  const [dis,setDis]=useState(false)
  const catNames =[ "Arts & Literature","Film & Music","Food & Drink","Geography","History","Music","Science","Society & Culture","Sport & Leisure" ]
  const getBtns = document.querySelectorAll(".cat-btn");
  const getDifficulty = document.querySelectorAll(".difficulty-level");

  useEffect(() => {
    if (getBtns && dis) {
      console.log(getBtns)
      getBtns.forEach((item) => {
        item.classList.add("disabled")
      })
    }
    if (!dis && getDifficulty) { 
        getDifficulty.forEach((item) => {
          item.classList.add("disabled")
       })
    }
  },[dis])
  const handleClick = (e) => {
   e.target.tagName === "BUTTON" &&  e.target.classList.add("activeFocus");
    setDetails({ ...details, [e.target.name]: e.target.value });
     setDis((prev) => prev = !prev)
  }
  
  const getButtonArr = () => {
    for (let i = 0; i < 9; i++) {
      const temp = <button name="category" className='cat-btn' key={i}
        onClick={handleClick} value={catNames[i]}>{catNames[i]}</button>
          buttonArr.push(temp);
    }
    return buttonArr
  }
  const validate = () => {
      if (details.rounds !== 0 && details.category !== "" && details.difficulty !== ""){
        return <button  className='start-btn' onClick={() => setDisplayQuestion(true)}>Start</button>}
        else {
          return <b>Please make selection above</b>}
  }
  console.log(details)
  return (
   <>
    <div className="category-wrapper" >
                <h1> CATEGORIES</h1>  
        <div className="category-buttons"> 
                   { getButtonArr()}
        </div>
              </div>
              <div className="game-options-wrapper">
                <b>Difficulty</b>
                <button name="difficulty" value="easy" onClick={handleClick} className="difficulty-level easy">easy</button>
                <button  name="difficulty" value="medium" onClick={handleClick} className="difficulty-level medium">medium</button>
                <button  name="difficulty" value="hard" onClick={handleClick} className="difficulty-level hard">hard</button>
                <br />
                <b htmlFor="">Enter number of the rounds (0-10)</b> 
                <input autocomplete="off"  name="rounds" onChange={handleClick}   type="text"  />
            </div>
            <br />
         {validate()}
        </>
  )
}

export default GameOptions