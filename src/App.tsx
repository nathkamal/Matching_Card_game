import React from 'react';
import Card from './components/card/card';
import './App.css';
import { useState } from 'react';
import GameOver from './components/gameover/gameover';


interface CardInfo  {
  id:number,
  imgUrl : string,
}

interface InitialState  {
  shufCardsList:CardInfo[],
  clickCount:number,
  openCards: number[],
  prevCard: CardInfo,
  prevCardId: number,
  timerStart: boolean,
  timeRemaining: number,
  isGameOver: boolean,
}

let intervalId:any;

export const App = ()=> {

  //cardsList to display cads..
  const cardsList = [0,1,2,3,4,5,6,7].reduce((prev:CardInfo[], cur, index) =>{
    let cardInfo: CardInfo = {
      id:index,
      imgUrl : 'https://avatars.dicebear.com/api/avataaars/seed-'+ index+'.svg',
    }
    return prev.concat([cardInfo, cardInfo]);
  }, []);

  const initialState:InitialState = {
    shufCardsList : cardsList.sort(() => Math.random() - 0.5),
    clickCount: 0,
    openCards : [],
    prevCard: {imgUrl : '', id: -1},
    prevCardId: -1,
    timerStart: false,
    timeRemaining: 30,
    isGameOver: false
  }


  const [{ shufCardsList, clickCount, openCards, prevCard,prevCardId, timerStart, timeRemaining, isGameOver },setInitialState] = useState(initialState);

  const cardClick= (e:React.MouseEvent<HTMLDivElement>):void => {

    e.preventDefault();
    if(!timerStart){
      startTimer(initialState.timeRemaining);
      setInitialState(prevState =>({...prevState, timerStart:!timerStart}));
    }

    if(clickCount < 1){
      let newOpenCards:number[] = openCards.slice();
      let curId = parseInt(e.currentTarget.id);
      newOpenCards.push(curId);
      setInitialState(prevState => ({...prevState,clickCount:clickCount +1 , openCards:newOpenCards, prevCardId: curId, prevCard: shufCardsList[curId]}));
    }


    else {

      if(prevCard === shufCardsList[parseInt(e.currentTarget.id)]){
        let newOpenCards:number[] = openCards.slice();
        let curId = parseInt(e.currentTarget.id);
        newOpenCards.push(curId);
        setInitialState(prevState => ({...prevState, openCards:newOpenCards, clickCount:clickCount - 1, prevCardId: initialState.prevCardId, prevCard: initialState.prevCard}))
        if(openCards.length == 15){
          showSucessMessage();
        }
      }

      else {

        let newOpenCards:number[] = openCards.slice();
        let curId = parseInt(e.currentTarget.id);
        newOpenCards.push(curId);
        setInitialState(prevState => ({...prevState,clickCount:clickCount - 1 , openCards:newOpenCards}));

        resetUnMatchedCards(curId);
        
      }
    }
  }

  const resetUnMatchedCards = (curId:number):void =>{
    setTimeout(()=> {
      let newOpenCards:number[] = openCards.slice();
      newOpenCards.splice(newOpenCards.indexOf(curId), 1);  
      setInitialState(prevState => ({...prevState, openCards:newOpenCards, prevCardId: initialState.prevCardId, prevCard: initialState.prevCard}))
    }, 100);
  }

  const showSucessMessage= ()=>{
    setTimeout(()=>{
      clearInterval(intervalId);
      setInitialState(prevState => ({...prevState, isGameOver: true}));
    }, 500)
  }

  const resetGame = ():void =>{
    clearInterval(intervalId);
    setInitialState(initialState);
  }

  const startTimer = (counter:number) =>{
     intervalId = setInterval(() => {
      counter = counter - 1;
      setInitialState(prevState => ({...prevState, timeRemaining: counter}));
      if(counter === 0) clearInterval(intervalId)
    }, 1000)
  }

  return (
    <div className="App">
      <p> Remaining Time {timeRemaining} seconds</p>
      {
        ((timeRemaining > 0) && !isGameOver) ? (

          shufCardsList.map((card: CardInfo, index: number)=>{
            return <div className="CardWrapper" key ={index}> 
              <Card cardData={card} handleCallBack = {cardClick} showCard={openCards.indexOf(index)> -1} indexKey = {index.toString()}/>
            </div>
          })
        ) :
        
        <GameOver status={isGameOver} score ={timeRemaining} resetGame = {resetGame}/> 
        
      }
    </div>
  );
}

export default App;
