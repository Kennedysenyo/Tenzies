import { useState } from "react"
import Die from "./components/Die"

const App = () => { 

  const [dice, setDice] = useState(generateAllNewDice())

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map((dice, index) => ({
        id: index+1, 
        value: Math.ceil(Math.random() * 6), 
        isHeld:  false
      }))
  }

  function rollDice() {
    setDice( prevDice => prevDice.map( 
      (die) => (die.isHeld) ? die : {...die, value: Math.ceil(Math.random() * 6)}
      ) 
    ) 
  }

  function hold(id) {
    const clickedDie = dice.find(die => die.id === id);
    const prevSelectedValue = dice.find(die => die.isHeld)?.value || null;
  
    setDice(prevDice =>
      prevDice.map(die => {
        if (clickedDie.value === prevSelectedValue) {
          // Toggle or retain all dice with the same value
          return die.value === clickedDie.value
            ? { ...die, isHeld: clickedDie.isHeld ? false : true }
            : die;
        } else {
          // Deselect others and select the new value
          return die.value === clickedDie.value
            ? { ...die, isHeld: true }
            : { ...die, isHeld: false };
        }
      })
    );
  }
  

  const diceElements = dice.map(
    (die) =>  <Die key={die.id} id={die.id} hold={hold} held={die.isHeld} value={die.value}/>
  )

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice-container">
        { diceElements }      
      </div>
      <button 
        className="roll-dice"
        onClick={rollDice}
      >Roll</button>

       </main>
  )
}

export default App
