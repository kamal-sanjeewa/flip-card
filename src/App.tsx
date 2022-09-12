/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {FunctionComponent, useEffect, useState} from 'react';
import {SafeAreaView, TouchableOpacity, StyleSheet, Text, View, Alert} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import CardItem from './components/Card';
import {ApplicationState} from './redux/reducers';
import {restart} from './redux/reducers/cardDeckReducer';
import {reset} from './redux/reducers/stepCountReducer';
import {DECK_SIZE} from './util/DeckGenerator';

const App: FunctionComponent = () => {
  const dispatch = useDispatch();
  const screenState = useSelector((state: ApplicationState) => state.stepCounterReducer);
  const cardDeck = useSelector((state: ApplicationState) => state.cardDeckReducer);

  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!gameOver && cardDeck.matchedCards == DECK_SIZE) {
      setGameOver(true);
      Alert.alert(
        'Congratulations!',
        `You win this game by ${screenState.count} steps!`,
        [{text: 'Try another round', onPress: () => onRestartPress()}],
        {
          cancelable: false,
        }
      );
    }
  });

  const onRestartPress = () => {
    dispatch(restart());
    dispatch(reset());
    setGameOver(false);
  };

  console.log(`Step count : ${screenState.count}`);
  console.log('card Deck ' + JSON.stringify(cardDeck.cards));

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'grey'}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          padding: 5,
          alignContent: 'space-between',
        }}>
        <View style={{flex: 1}}>
          <TouchableOpacity onPress={onRestartPress}>
            <Text
              style={{
                textAlign: 'left',
                color: 'blue',
                fontSize: 20,
                marginLeft: 30,
              }}>
              Restart
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
          <Text>
            <Text
              style={{
                textAlign: 'center',
                color: 'white',
                fontSize: 25,
              }}>
              STEPS:
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: 'blue',
                fontSize: 35,
              }}>
              {screenState.count}
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 20,
          flexDirection: 'row',
          padding: 5,
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          {cardDeck.cards.map((card, idx) => {
            if (idx % 3 == 0) {
              return <CardItem card={card} idx={idx} key={card.id} />;
            }
          })}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          {cardDeck.cards.map((card, idx) => {
            if (idx % 3 == 1) {
              return <CardItem card={card} idx={idx} key={card.id} />;
            }
          })}
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
          }}>
          {cardDeck.cards.map((card, idx) => {
            if (idx % 3 == 2) {
              return <CardItem card={card} idx={idx} key={card.id} />;
            }
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  flipCard: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
    backfaceVisibility: 'hidden',
  },
  flipCardBack: {
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
  },
  flipText: {
    width: 90,
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default App;
