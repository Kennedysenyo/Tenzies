import { useState } from "react"
import Die from "./components/Die"

const App = () => { 

  const [isHeld, setIsHeld] = useState(false);
  const [dice, setDice] = useState(generateAllNewDice())

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map((dice, index) => ({
        id: index+1, 
        value: Math.ceil(Math.random() * 6), 
        isHeld:  isHeld
      }))
  }

  function rollDice() {
    setDice(generateAllNewDice())
    console.log(dice)
  }

  const diceElements = dice.map((die) =>  <Die key={die.id} value={die.value}/>)

  return (
    <main>
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
