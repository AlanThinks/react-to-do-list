import React from 'react';
import './App.css';

export default class InputToDo extends React.Component{
  constructor(props){
    super(props)
    this.state={value:''}
    this.inputChange = this.inputChange.bind(this);
    this.addToDo=this.addToDo.bind(this);
  }

  inputChange(e){
    console.log("Input Changing")
  }

  addToDo(task){
    console.log('Task:',task)
  }

  render(){
    return(
      <div>
      <input
      onChange ={this.inputChange}
      type ='text'
      />
      <button
      className="btn"
      onClick={()=>this.addToDo(this.state.value)}
      >Add Task</button>
      </div>
    )
  }
}
