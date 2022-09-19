import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import './stylings/home.css';

function App() {
  const [triviaData,setTriviaData] = useState();
  const [details,setDetails]=useState({
    rounds:0,
    category:"",
    difficulty:"",
  })
  const [userInfo,setUserInfo]=useState([])
  const [displayQuestion, setDisplayQuestion] = useState(false);
  const [restartGame,setRestartGame] = useState(false)

  useEffect(()=>{
    async function fetchData  (){
      try{
        console.log("Fetching Data....");
         const trivia_url =
        `https://the-trivia-api.com/api/questions?categories=${details.category}&limit=${details.rounds}&difficulty=${details.difficulty}`
        const response = await fetch(trivia_url);
        if(!response.ok){
          throw new Error(`Something went wrong  ${response.status}`)
        }
        const json = await response.json();
        details && setTriviaData(json)
      }catch (err){}
    }
    displayQuestion && details &&   fetchData();
  },[displayQuestion,restartGame])
  return (
    <div className="App">
      <Header />
      <span className="game-icon"></span>
      <Home 
        data ={triviaData}
        details = {details}
        setDetails={setDetails}
        setUserInfo={setUserInfo}       
        displayQuestion={displayQuestion}
        setDisplayQuestion={setDisplayQuestion}
        setRestartGame={setRestartGame}
        restartGame={restartGame}
        userInfo={ userInfo} />
    </div>
  );
}

export default App;
