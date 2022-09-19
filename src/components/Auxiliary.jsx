import React, { useReducer, useState } from "react";
import correctSound from '../assets/correct.mp3';
import applause from '../assets/heavy-applause.mp3';
import wrongSound from '../assets/wrong.mp3';


//whenthere is one or two players, start button will appear
export function NumberUser(num,setPlayer1,setPlayer2,player1,player2) { 
  const p1 = 
    <input
      type="text"
      name='name'
      onChange={(e) => setPlayer1({ ...player1, [e.target.name]: e.target.value })}
      placeholder='Enter player one'
      required
    />
  const p2= <input
            type="text"
           name='name'
          onChange={(e)=> setPlayer2( {...player2, [e.target.name]:e.target.value})}
          placeholder='Enter player two' 
          required 
          />
   return <>
     {p1}
     {num===2 && p2}
      </>;
}
//sets all thr states to default value
export function StartOver(setShowGame, setDisplayQuestion, setRestartGame,setDetails,setNumPlayers) {
    setShowGame(() => false);
    setDisplayQuestion(() => false);
    setRestartGame(() => false);
    setNumPlayers(0);
    setDetails((prev) => {
      return {
        ...prev,
        difficulty: "",
        rounds: 0,
        category: ""
      };
    });
}
//handles correct answers, users card colors etc
export function UserChoice(
  e, getChoices,
  scorePlayer1,
  scorePlayer2,
  nextQuestions,
  player1Turn,
  player2Turn,
  numPlayers,
  stopTimer,
  correct,wrong
) {
  stopTimer.current = true

    if (e.target.innerHTML === nextQuestions.correctAnswer) {
       if (getChoices){
           getChoices.forEach((item) => {
            if (item.innerHTML === e.target.innerHTML) {            
              setTimeout(() => {
                correct.play();
                item.classList.add('activeGreen');
              },1500)
              }
        })
      }
     player1Turn.current ?
        scorePlayer1.current.correct += 1:
        scorePlayer2.current.correct += 1;
    } else {
       if (getChoices){
           getChoices.forEach((item) => {
            if (item.innerHTML === e.target.innerHTML) {
              setTimeout(() => {
                wrong.play();	
                item.classList.add("activeRed");
                },1500) 
             }
             if (item.innerHTML === nextQuestions.correctAnswer) { 
              setTimeout(() => {
                 item.classList.add("activeGreen")
              }, 1500);
             }
        })
      }
        player2Turn.current ?
        scorePlayer2.current.wrong +=  1:
        scorePlayer1.current.wrong +=  1;
    }
    if (numPlayers === 2) {
      if (player1Turn.current === true) {
      player1Turn.current = false;
      player2Turn.current = true;
    } else {
      player2Turn.current = false;
      player1Turn.current = true;
    };
  }
 
  };
  
  //handles players turn and their game card style, score etc
export function playersTurn(player1Turn, player2Turn,getPlayer1, getPlayer2,numPlayers)
{ if (getPlayer1 && getPlayer2) {
       if (player1Turn.current === true)
       {
         getPlayer1.style.border = "5px solid  hsl(212, 25%, 49%)"
           getPlayer1.style.boxShadow ="0px 0px 15px 2px  hsl(212, 25%, 49%)"
       }
       else if (player1Turn.current === false) {
         getPlayer1.style.border = "none";
          getPlayer1.style.boxShadow ="none"
      }
      if (numPlayers === 2) {
         if (player2Turn.current === true)
         {
           getPlayer2.style.border = "5px solid  hsl(212, 25%, 49%)"
           getPlayer2.style.boxShadow ="0px 0px 10px  hsl(212, 25%, 49%)"
         }
       else if(player2Turn.current ===false) {
           getPlayer2.style.border = "none";
            getPlayer2.style.boxShadow ="none"
      }
    }
}

}
//timer function
export function countDown(i, stopTimer) {
  console.log("inside the aux", stopTimer.current);
  const getBtn = document.querySelectorAll(".choice")
    var int = setInterval(function () {
      document.getElementById("timer").innerHTML=i;
        //i-- || clearInterval(int);  //if i is 0, then stop the interval
      if (i === 0 || stopTimer.current ) {
        clearInterval(int)
        if (getBtn) {
          getBtn.forEach((item) => {
            item.classList.add("disabled");
          })
            document.querySelector(".next-question-btn").classList.remove("disabled");
        }
        return i
      }
      else {
        i--;
          if (getBtn) {
          getBtn.forEach((item) => {
            item.classList.remove("disabled");
          })
            document.querySelector(".next-question-btn").classList.add("disabled");
        }
      }
    }, 1000);
}
//handles payers cards and sccore when the game is over 
export const result = (numPlayers, gameIsOver, scorePlayer1, scorePlayer2,
  player1, player2, details, winSound) => {
  const p1 = document.querySelector(".first-player");
  const p2 = document.querySelector(".second-player");

    if (numPlayers === 2) {
      if (gameIsOver) {
        if (scorePlayer1.current.correct > scorePlayer2.current.correct) {
          if (p1 && p2) {
            p1.classList.add("activeWinner")
            p2.classList.add("activeWinnerNone")
            winSound.play()
          } 
          
          return <p className='game-res'>{`${player1.name} is winner`}</p>
        }
        else if (scorePlayer1.current.correct < scorePlayer2.current.correct) {
          if (p1 && p2) {
            p1.classList.add("activeWinnerNone")
            p2.classList.add("activeWinner")
            winSound.play()
          }
        
          return <p className='game-res'>{`${player2.name} is winner`}</p>
        }
        else {
          if (p1 && p2) {
            p1.classList.add("activeWinner")
            p2.classList.add("activeWinner")
          }
          return <p className='game-res'>{`It's a tie`}</p>
        }
      }

    }
    else {
      if (p1) {
            p1.classList.add("activeWinner")
           }
        return <p className='game-res'>{`${player1.name}'s score is ${scorePlayer1.current.correct} / ${details.rounds}`}</p>
  };
   
};
  
export function instructions() {
 
    return  (<p >Quiz game can be played with one or two players. Each player will have 10 seconds to answer the questions.
      In order to start the game, players must enter their name, make selections for categories, difficulty, and rounds.
      After all the selections are made you can click start button to start the game. Once game is started you cannot stop the game until
      all the questions are answered.
          </p>)
  
 
}