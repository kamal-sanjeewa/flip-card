import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {generateSuffledDeck} from '../../util/DeckGenerator';

export type Card = {
  id: number;
  value: number;
  cardRevealed: boolean;
  cardFliped: boolean;
  showQuestionMark: boolean;
  onCardFlip?: (id?: number) => void;
};

export type InitialCardState = {
  cards: Card[];
  firstFlipedCard?: Card;
  matchedCards: number;
};

const initialState: InitialCardState = {
  cards: generateSuffledDeck(),
  firstFlipedCard: undefined,
  matchedCards: 0,
};

const cardDeckSlice = createSlice({
  name: 'card',
  initialState: initialState,
  reducers: {
    flipCardTemp: (state, action: PayloadAction<Card>) => {
      if (state.firstFlipedCard === undefined) {
        state.firstFlipedCard = action.payload;
        state.cards.map((card) => {
          if (action.payload?.id == card.id) {
            card.cardFliped = true;
          }
          return card;
        });
      } else {
        if (state.firstFlipedCard.id != action.payload.id) {
          state.cards.map((card) => {
            if (!card.cardRevealed) {
              if (
                card.value == action.payload.value &&
                state.firstFlipedCard?.value == action.payload.value
              ) {
                card.cardRevealed = true;
                card.cardFliped = true;
                state.matchedCards += 1;
              } else {
                card.cardFliped = false;
              }
            }
            return card;
          });
          state.firstFlipedCard = undefined;
        }
      }
    },
    restart: (state) => {
      state.cards = generateSuffledDeck();
      state.firstFlipedCard = undefined;
      state.matchedCards = 0;
    },
  },
  extraReducers: {},
});

export const {flipCardTemp, restart} = cardDeckSlice.actions;
export default cardDeckSlice.reducer;
