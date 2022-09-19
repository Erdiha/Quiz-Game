import React from "react";
import { NumberUser } from "./Auxiliary.jsx";

function Multiplayers({numPlayers, setShowGame, player1,player2,setPlayer1,setPlayer2,userInfo,setUserInfo}) {
  //local input check for non valid names
 const handleClick = () =>{
        player1.name.length >0 && 
        player2.name.length > 0 &&
        userInfo.length ===2 ? setUserInfo({...userInfo,player1}): setUserInfo({...userInfo,player1,player2})
         setShowGame(() => true);
  }
  return <>
      {NumberUser(numPlayers,setPlayer1,setPlayer2,player1,player2)}
      {(numPlayers===1 && player1.name !== "" || numPlayers===2 && player2.name !== "" )
      && <button className="names-btn" onClick={handleClick}>Start</button>}
  </>
}
  export default Multiplayers