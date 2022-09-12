import React, {FunctionComponent, useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ApplicationState} from '../redux/reducers';
import {Card, flipCardTemp} from '../redux/reducers/cardDeckReducer';
import {increment} from '../redux/reducers/stepCountReducer';

const ANIMATION_DURATION = 300;

const CardItem: FunctionComponent<{card: Card; idx: number}> = ({card}) => {
  const dispatch = useDispatch();
  const animatedValue = useRef(new Animated.Value(card.id));

  const [tapCard] = useState(false);

  useEffect(() => {
    console.log('Tap card specific :');
  }, [tapCard]);

  useEffect(() => {
    console.log('Tap card all :  ');
    console.log('Use effect was called');
    console.log(`Card :  ${JSON.stringify(card)}`);
    if (!card.cardFliped && !card.cardRevealed && cardDeck.firstFlipedCard == undefined) {
      Animated.timing(animatedValue.current, {
        duration: ANIMATION_DURATION,
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {});
    }
  });

  const cardDeck = useSelector((state: ApplicationState) => state.cardDeckReducer);

  const interpolatedValueFront = animatedValue.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const interpolatedValueBack = animatedValue.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const rotateFront = {
    transform: [
      {
        rotateY: interpolatedValueFront,
      },
    ],
  };

  const rotateBack = {
    transform: [
      {
        rotateY: interpolatedValueBack,
      },
    ],
  };

  const flipCardFront = () => {
    console.log('Flip was called');
    Animated.timing(animatedValue.current, {
      duration: ANIMATION_DURATION,
      toValue: 180, //isFlipped ? 0 : 180,
      useNativeDriver: true,
    }).start(() => {
      dispatch(increment());
      if (cardDeck.firstFlipedCard == undefined) {
        dispatch(flipCardTemp(card));
      } else {
        // setTimeout(()=>{
        //   dispatch(flipCardTemp(card));
        // },5000)
        console.log(`fliped :  ${cardDeck.firstFlipedCard.value}  selected :  ${card.value}`);
        if (cardDeck.firstFlipedCard.value == card.value) {
          console.log('Same item selected');
        } else {
          console.log('Wrong item selected');
        }
        dispatch(flipCardTemp(card));
      }
    });
  };

  console.log(`flip back :  ${card.id}`);

  // const flipCardBack = ()=>{
  //   Animated.timing(animatedValue.current, {
  //     duration: ANIMATION_DURATION,
  //     toValue: 180,
  //     useNativeDriver: true,
  //   }).start(() => {
  //   });
  // };

  if (!card.cardFliped) {
    return (
      <TouchableOpacity
        disabled={card.cardFliped}
        style={styles.cardContainer}
        onPress={() => flipCardFront()}>
        <Animated.View
          style={[
            styles.hidden,
            rotateFront,
            {
              flex: 1,
              borderRadius: 12,
              borderColor: 'white',
              borderWidth: 5,
              backgroundColor: 'deepskyblue',
              justifyContent: 'center',
            },
          ]}>
          <Text
            style={{
              textAlign: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: 25,
            }}>
            ?
          </Text>
        </Animated.View>
        <Animated.View
          style={[
            styles.hidden,
            rotateBack,
            {
              flex: 1,
              borderRadius: 12,
              borderColor: 'white',
              borderWidth: 5,
              backgroundColor: 'white',
              justifyContent: 'center',
              position: 'absolute',
              width: '100%',
              height: '100%',
            },
          ]}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 25,
            }}>
            {card.value}
          </Text>
        </Animated.View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={styles.cardContainer}>
        <View
          style={{flex: 1, borderRadius: 12, backgroundColor: 'white', justifyContent: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              color: 'black',
              fontSize: 25,
            }}>
            {card.value}
          </Text>
        </View>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  cardContainer: {
    margin: 5,
    flex: 1,
  },
  hidden: {
    backfaceVisibility: 'hidden',
  },
});

export default CardItem;
