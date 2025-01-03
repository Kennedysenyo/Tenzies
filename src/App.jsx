import { useState, useRef, useEffect } from "react"
import Die from "./components/Die"
import { useWindowSize } from "react-use"
import Confetti from "react-confetti"

const App = () => { 

  const [dice, setDice] = useState(() => generateAllNewDice());
  const buttonRef = useRef(null);
  
  const gameWon = (
    dice.every(die => die.isHeld) && 
    dice.every(die => die.value === dice[0].value)
  )  

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon])

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map((_, index) => ({
        id: index+1, 
        value: Math.ceil(Math.random() * 6), 
        isHeld:  false
      }))
  }

  function rollDice() {
    if (gameWon) {
      setDice(generateAllNewDice())
    } else {
      setDice( prevDice => prevDice.map( (die) => 
        (die.isHeld) ? die : {...die, value: Math.ceil(Math.random() * 6)}       
        ) 
      ) 
    }    
  }

  function hold(id) {
    if (gameWon)  return

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
  

  const diceElements = dice.map((die) =>  (
    <Die 
      key={die.id} 
      id={die.id} 
      hold={hold} 
      held={die.isHeld} 
      value={die.value}
      />
    )    
  )

  const { width, height } = useWindowSize();

  return (
    <main>
      { gameWon && <Confetti width={width} height={height} /> }
      <div aria-live="polite" className="sr-only">
        {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
      </p>
      <div className="dice-container">
        { diceElements }      
      </div>
      <button ref={buttonRef} className="roll-dice" onClick={rollDice}>
        { gameWon ? "New Game" : "Roll" }
      </button>
    </main>
  )
}

export default App
