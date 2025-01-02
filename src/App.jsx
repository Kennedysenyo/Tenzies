import { useState } from "react"
import Die from "./components/Die"

const App = () => { 

  const [dice, setDice] = useState(generateAllNewDice())

  function generateAllNewDice() {
    return new Array(10)
      .fill(0)
      .map(() => Math.ceil(Math.random() * 6))
  }

  function rollDice() {
    setDice(generateAllNewDice())
  }

  const diceElements = dice.map((die) =>  <Die value={die}/>)
 


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
