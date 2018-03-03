import React, { Component } from 'react';
import './App.css';
import Title from './title'

export default class App extends Component {
  constructor(){
    super();
    this.state={
      'inputValue':'',
      'taskList': [],
    }
    this.addToTaskList=this.addToTaskList.bind(this);
    this.checkForEnterKey=this.checkForEnterKey.bind(this);
  }

  checkForEnterKey(e){

    if (e.which === 13 && e.target.value !== ""){
      console.log("'Enter Key' pressed")
      this.addToTaskList()
      //e.target.value="";
    } else if (e.target.value === "" && e.which === 13){
      console.log("Input Blank")}
      else console.log("No 'Enter Key' pressed yet")
    }
/*
buttonClick(e){
  console.log('Button was clicked')
  this.setState({"inputValue": document.getElementById('task-input').value}, function()
  {
    this.addToDo()
  })
}
*/

  addToTaskList() {
    let updatingTaskList = this.state.taskList;
    updatingTaskList.push(this.state.inputValue)
    this.setState({'taskList': updatingTaskList, 'inputValue':""})
  }

    render() {
      return (
        <div className="App">
          <Title/>
            <div>
              <input
                id = 'task-input'
                placeholder ='Enter The New Task'
                onKeyDown ={this.checkForEnterKey}
                type ='text'
                value = {this.state.inputValue}
                onChange = {(e)=>
                  this.setState({'inputValue':e.target.value})}
                />
              <button
                className="btn"
                onClick={this.addToTaskList}
                >Add Task</button>
              <List
                listOfTasks = {this.state.taskList}
                />
            </div>
          </div>
            )
          }
}

class List extends Component{
  constructor(props){
    super(props);
    this.state={
      'listOfTasks': props.listOfTasks,
      'itemClass': 'itemBlue',
    }

  }
  componentWillReceiveProps(props){

    }

    render(){return (

      <ul>
        {this.state.listOfTasks.map((eachTask,indx,arr)=>(
          if (arr.length%2 === 0) {
          let iClass="itemGrey"     //console.log('Next Item will be blue')
          } else {
            let iClass='itemBlue'  //console.log('Next Item will be grey')
            }
          <div className={iClass}>
            <li key={eachTask+indx}>{eachTask}</li>
          </div>))}
      </ul>)}
}
