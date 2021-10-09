import React from 'react';
import './gameover.css';

interface GameOverProps {
    status : boolean,
    score : number,
    resetGame: (e:React.MouseEvent<HTMLButtonElement>) => void,
}

export const GameOver:React.FC<GameOverProps> = (props: GameOverProps)=> {

  return (
        <>
            {
                !props.status ? <p className="gameOverTxt">Sorry.. You have lost <span style={{fontSize:100}}>&#128542;</span></p> : <div className="gameOverTxt">Congrats!! you have completed..<span style={{fontSize:100}}>&#128522;</span><p> Your score {props.score}</p></div>
            }   
            <button onClick={props.resetGame} className="resetButton">Play Again</button>  
        </>
  );
}

export default GameOver;
