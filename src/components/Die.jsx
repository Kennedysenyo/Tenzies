

const Die = (props) => {
  return (
    <button 
      onClick={() => props.hold(props.id)} 
      style={{backgroundColor: props.held ? "#59E391" : "white"}}    
    >{props.value}</button>
  )
}

export default Die;