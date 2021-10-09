import React from 'react';
import './card.css';

interface CardProps{
    cardData: {
        id: number,
        imgUrl : string,
    },
    handleCallBack: (e:React.MouseEvent<HTMLDivElement>) => void,
    showCard: boolean,
    indexKey: string | undefined
}

export const Card:React.FC<CardProps> = (props:CardProps)=> {

  return (
    <>
    {
      !props.showCard ? (
        <div className="card" onClick= {props.handleCallBack} id={props.indexKey}>
         <span title="click to reveal"></span>
    </div>
      ) :

      (
        <div className="card" id={props.indexKey}>
          <img src={props.cardData.imgUrl} alt=""/> 
      </div>
      )
    }
 </>
  );
}

export default Card;
