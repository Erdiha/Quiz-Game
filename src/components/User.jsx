import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import correctSound from '../assets/correct.mp3';
import applause from '../assets/heavy-applause.mp3';
import wrongSound from '../assets/wrong.mp3';
import { countDown, playersTurn, result, StartOver, UserChoice } from './Auxiliary';
const User = ({
  setDetails, player1Turn,
  player2Turn, setNumPlayers,
  setRestartGame, userInfo,
  numPlayers, data, details,
  setShowGame, setDisplayQuestion,
}) => {
 
  const [gameIsOver, setGameIsOver] = useState(false);
  const scorePlayer1 = useRef({ correct: 0, wrong: 0, winner: false });
  const scorePlayer2 = useRef({ correct: 0, wrong: 0, winner: false });
  const stopTimer = useRef(false)
  const [next, setNext] = useState(0)
  const [nextQuestions, setNextQuestions] = useState();
  const { player1, player2 } = userInfo;
  const getPlayer1 = document.querySelector(".first-player");
  const getPlayer2 = document.querySelector(".second-player");
  let getChoices = null;
  const correct = new Audio(correctSound);
  const wrong = new Audio(wrongSound);
  const winSound = new Audio(applause);

  useEffect(() => {
    if (!gameIsOver) { stopTimer.current = false }
    countDown(10, stopTimer);
    data && setNextQuestions(data[next]);
    document.querySelector(".next-question-btn").classList.add("disabled");
    getChoices = document.querySelectorAll('.choice');
    playersTurn(player1Turn, player2Turn, getPlayer1, getPlayer2, numPlayers);
  }, [next, []]);
  
  const handleNext = () => {
    if (getChoices) {
      getChoices.forEach((item) => {
        item.classList.remove("activeRed")
        item.classList.remove("activeGreen")
      })
    }
    next < details.rounds - 1 ? setNext(next + 1) : setGameIsOver(true);
    winSound.pause();
    correct.pause();
    wrongSound.pause();

  };
  const handleChoice = (randomChoice) => {
    const arr = []
    const btnNames = ["a", "b", "c", "d"];
    for (let i = 0; i < 4; i++) {
      arr.push(<button key={i} onClick={e => UserChoice(
        e, getChoices, scorePlayer1, scorePlayer2,
        nextQuestions, player1Turn,
        player2Turn, numPlayers, stopTimer,correct,wrong)}
        className={`choice btn-${btnNames[i]}`}>{randomChoice[i]}</button>)
    }
    return arr
  };
  
  const handleMultipleChoice = () => {
    const { correctAnswer, incorrectAnswers } = nextQuestions;
    const choice = [correctAnswer, incorrectAnswers[0],
      incorrectAnswers[1], incorrectAnswers[2]];
    const randomChoice = choice.sort(() => Math.random() - 0.5).slice(0, 5);
    return handleChoice(randomChoice)
  };



  return (
    <div className="game-container">
      <div className='display'>
        {
          <>
            <div className="question-wrapper">
              <p id='timer'></p>
              <p className="question-counter">{`Q: ${next + 1}/${details.rounds}`}</p>
              {next + 1 < details.rounds ?
                <button onClick={handleNext} className='next-question-btn'>Next</button> :
                !gameIsOver ?
                  <button onClick={() => setGameIsOver(true)} className='next-question-btn'>Result</button> :
                  <button
                    onClick={() => StartOver(setShowGame, setDisplayQuestion, setRestartGame, setDetails, setNumPlayers)}
                    className='next-question-btn'>Start Over</button>
              }
              {!gameIsOver ? <>
                <div className="question">
                  <h1>Category is: {"  "}
                    <span style={{ color: "red", textDecoration: "underline black " }}>
                      {nextQuestions && nextQuestions.category}</span>
                  </h1>
                  <p className="trivia-q">
                    {nextQuestions && nextQuestions.question}
                  </p>
                </div>
                {nextQuestions && <div className="choice-wrapper">
                  {handleMultipleChoice()}
                </div>}
              </> :
                result(numPlayers,
                  gameIsOver, scorePlayer1,
                  scorePlayer2, player1, player2,
                  details, winSound)
              }
              <div className="users-wrapper">
                <div className="first-player players">
                  <p>  {player1.name}</p>
                  <div className="score-wrapper">
                    <p>{scorePlayer1.current.wrong}</p>
                    <p>{scorePlayer1.current.correct}</p>
                  </div>
                </div>
                {numPlayers === 2 &&
                  <div className="second-player players" >
                    <p>  {player2.name}</p>
                    <div className="score-wrapper">
                      <p>{scorePlayer2.current.wrong}</p>
                      <p>{scorePlayer2.current.correct}</p>
                    </div>
                  </div>}
              </div>
            </div>
          </>
        }
      </div>
    </div>)
};

export default User;