import React, { Component } from 'react'; //Just cause I saw it somehwere, here I'm importing ONLY Component class from React,
import './App.css';           //Importing Styles
import Title from './title'  //Importing H1 Title from separate file

export default class App extends Component { //I did not use "React.Component" because line 1
  constructor(){
    super();
    this.state={     //giving some initial values to properties of the component
      'inputValue':'',  //Here I'll hold what's being typed as a string
      'taskList': [],  // Here's an array that will hold all the items
    }

/* Below I binded my two functions so that later in the document
  I can use "this.FUNCTION_NAME" without it casuing an issue */
    this.addToTaskList=this.addToTaskList.bind(this);
    this.checkForEnterKey=this.checkForEnterKey.bind(this);
  }

  /*Function below will check IF the key that's pressed is "Enter" (key # 13)
  if so, it will call the function "addToTaskList". */
  checkForEnterKey(e){

    if (e.which === 13){
      console.log("'Enter Key' pressed") //Just logging as a test
      this.addToTaskList()   // After checking for the key #13, the function addToTaskList is executed
      }
    }
/*      e.target.value=""; <-- Here was my original way of "clearing" the input
                             later I ended up clearing it using this.setState.inputValue.
                             'inputValue' is the propertie of this class where I'm holding
                              everything that's being typed (see line 10)
                             In order for that to work I need the 'value' of the input
                             to always be equal to this.state.inputValue, you'll see below.
      }
    }

Below is a function I was using BEFORE, although it worked I changed it because it was
not the best way.

OnceButtonClicks(e){
  console.log('Button was clicked')
  this.setState({"inputValue": document.getElementById('task-input').value}, function()
  {this.addToDo()})
}
*/
  //This function will updated the array "taskList" with the task in the inputValue
  // (using setState because that's rule #4, and so it re-renders the app
  addToTaskList() {
    if (this.state.inputValue!==""){            //Will execute only if inputValue is not empty
      let updatingTaskList = this.state.taskList; // Put current array in a temporary variable for readibilty
      updatingTaskList.push(this.state.inputValue) // Here the new task gets pushed into array
      this.setState({'taskList': updatingTaskList, 'inputValue':""}) //Here I setState w/ new Array and empty the inputValue
    } else console.log('Input Blank')           // If the person has not put anything and had pressed enter,
                                                //nothing will happen
  }

/* Here's the actual website */
    render() {
      return (
        <div className="App">
/*H1 component that comes from another file */
          <Title/>
            <div>
              <input
                id = 'task-input'
                {/* Just a temporary text that will show up on placeholder*/}
                placeholder ='Enter The New Task'
                {/* Everytime a key is pressed, execute function checkForEnterKey()*/}
                onKeyDown ={this.checkForEnterKey}
                type ='text'
                {/* The value of the input is constantly checking for the state of inputValue,I did this so that it would be easier to clear in addToTaskList()*/}
                value = {this.state.inputValue}
                {/*Here it's where the text being typed is contantly being set as inputValue*/}
                onChange = {(e)=>
                  this.setState({'inputValue':e.target.value})}
                />
              <button
                className="btn-new-task"
                onClick={this.addToTaskList} /*When the button is clicked it doesn't have to check for checkForEnterKey, so it executes addToTaskList() directly*/
                >Add Task</button>
              <List
                listOfTasks = {this.state.taskList} /*Everytime*/
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
    }
  }

    render(){return (
      <ul>
        {this.state.listOfTasks.map((eachTask,indx,arr)=>
          (
          <div className ='itemBlue' key={eachTask+indx}>
            <li>{eachTask}</li>
        /* Here I was beginnig work on checkbox
          <input
              type="checkbox"
              className='chbox'
              checked=''
              onChange={
                (e)=>this.setState({'checkbox-': e.target.checked})
                }/>
        */
            <button className ='btn-delete'>Delete</button>
          </div>)
          )
        }
      </ul>)
    }
}
