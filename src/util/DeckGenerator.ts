import {Card} from '../redux/reducers/cardDeckReducer';

export const DECK_SIZE = 12;
const MAX_CARD_VALUE = 100;

const generateNewDeckValues = () => {
  // let halfDeck = Array.from({length: DECK_SIZE/2}, () => Math.ceil(Math.random() * MAX_CARD_VALUE) );  // this will cause duplicates
  const halfDeck: number[] = [];
  while (halfDeck.length < DECK_SIZE / 2) {
    const rnd: number = Math.ceil(Math.random() * MAX_CARD_VALUE);
    if (halfDeck.indexOf(rnd) === -1) halfDeck.push(rnd);
  }
  return [...halfDeck, ...halfDeck];
};

const generateSuffledDeckFromValues = (values: number[]): Card[] => {
  values.forEach((element, idx) => {
    const randomIndex = Math.floor(Math.random() * values.length);
    [values[idx], values[randomIndex]] = [values[randomIndex], values[idx]];
  });

  const suffledDeck = values.map((val, index) => {
    const card: Card = {
      id: index,
      value: val,
      cardRevealed: false,
      cardFliped: false,
      showQuestionMark: true,
      onCardFlip: undefined,
    };
    return card;
  });
  return suffledDeck;
};

export const generateSuffledDeck = (): Card[] => {
  const deckValues = generateNewDeckValues();
  return generateSuffledDeckFromValues(deckValues);
};
