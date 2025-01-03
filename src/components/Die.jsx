

const Die = (props) => {
  return (
    <button 
      onClick={() => props.hold(props.id)} 
      style={{backgroundColor: props.held ? "#59E391" : "white"}} 
      aria-pressed={props.held}  
      aria-label={`Die with a value of ${props.value}, 
      ${props.held ? "held" : "not held"}`} 
    >{props.value}</button>
  )
}

export default Die;