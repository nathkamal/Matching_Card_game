import React from 'react';
import { render, screen } from '@testing-library/react';
import Card from './card';

const CardData = {
    cardData: {
        id: 1,
        imgUrl : "",
    },
    handleCallBack: ()=>{},
    showCard: false,
    indexKey: ""
}

test('renders learn react link', () => {
  render(<Card cardData={CardData.cardData} handleCallBack = {CardData.handleCallBack} showCard={CardData.showCard} indexKey={CardData.indexKey} />);
  const timeElement = screen.getByTitle("click to reveal");
  expect(timeElement).toBeInTheDocument();
});
