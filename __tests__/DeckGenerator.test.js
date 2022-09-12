const DeckGenerator = require('../src/util/DeckGenerator');

test('generate deck length', ()=>{
  expect(DeckGenerator.generateSuffledDeck().length == 12);
})

test('generated deck includes values between 1-100', ()=>{
  let generatedDeck = DeckGenerator.generateSuffledDeck();
  generatedDeck.forEach(card =>{
    expect(card.value).toBeGreaterThan(0) && expect(card.value).toBeLessThanOrEqual(100)
  })
})

test('generated deck values should have values numbers', ()=>{
  let generatedDeck = DeckGenerator.generateSuffledDeck();
  generatedDeck.forEach(card =>{
    expect(typeof card.value).toBe('number')
  })
})
