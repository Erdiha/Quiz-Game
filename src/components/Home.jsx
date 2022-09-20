import React, { useEffect, useRef, useState } from "react";
import { ContextAux, instructions } from "./Auxiliary";
import GameOptions from "./GameOptions";
import Multiplayers from "./MultiplePlayers";
import User from "./User";
const Home = (
  {restartGame,setRestartGame,
    setUserInfo,userInfo,
    data,setDetails,
    details,displayQuestion,
    setDisplayQuestion }) => {
  const [showGame, setShowGame] = useState(false);
  const [numPlayers, setNumPlayers] = useState(0);
  const player1Turn = useRef(true);
  const player2Turn = useRef(false);
  const [player1, setPlayer1] = useState({
    name: "",
    score: 0,
  });
  const [player2, setPlayer2] = useState({
    name: "",
    score: 0,
  });
  const handleNumofPlayers = (e) => {
    const { value } = e.target;
    value === "one" ? setNumPlayers(1) : setNumPlayers(2);
    setRestartGame(() => true)
  }
  return (
    <div className='home-wrapper'>
      {!showGame &&
        <div className='name-container'>
        {instructions()}
          {numPlayers === 0 &&
            <div className="name-container-btn">
              <button value="one" onClick={handleNumofPlayers}>one player</button>
              <button value="two" onClick={handleNumofPlayers}>two players</button></div>
          }
          {
            restartGame && <Multiplayers
              setPlayer1={setPlayer1}
              setPlayer2={setPlayer2}
              userInfo={userInfo}
              player1={player1}
              player2={player2}
              setShowGame={setShowGame}
              numPlayers={numPlayers}
              setUserInfo={setUserInfo} />
          }
        </div>
      }
      {!displayQuestion && showGame &&
        <div className="game-container">
          <div className="display">
            <GameOptions
              setDetails={setDetails}
              setDisplayQuestion={setDisplayQuestion}
              details={details}
            />
          </div>
        </div>}
      { showGame && displayQuestion && data && <User
            userInfo={userInfo}
            numPlayers={numPlayers}
            displayQuestion={displayQuestion}
            setDisplayQuestion={setDisplayQuestion}
            details={details}
            data={data}
            setShowGame={setShowGame}
            setRestartGame={setRestartGame}
            setNumPlayers={setNumPlayers}
            player1Turn={player1Turn}
            player2Turn={player2Turn}
            setDetails={setDetails}
      />}
    </div>)
}
export default Home