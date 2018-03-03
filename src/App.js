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

/* Below is the actual 'website' that renders from this component 'App'*/
    render() {
      return (
        <div className="App">
    {/*<Title> is H1 component that comes from another file*/}
         <Title/>
            <div>
              {/*<INPUT>
                placeholder: Just a temporary text that will show up on input
                onKeyDown: Everytime a key is pressed, execute function checkForEnterKey()
                value: The value of the input is constantly checking for the state of inputValue,
                        I did this so that it would be easier to clear in addToTaskList()
                onChange: Here is monitoring the input and the value being set as inputValue*/}
              <input
                id = 'task-input'
                placeholder ='Enter The New Task'
                onKeyDown ={this.checkForEnterKey}
                type ='text'
                value = {this.state.inputValue}
                onChange = {(e)=>
                  this.setState({'inputValue':e.target.value})}
                  />
                {/*<BUTTON>
                  onClick: When the button is clicked it doesn't have to check for checkForEnterKey,
                  so it executes addToTaskList() directly*/}
              <button
                className="btn-new-task"
                onClick={this.addToTaskList}
                >Add Task</button>
              {/*<LIST>
                  It's a component I made (see it at the bottom of file)

                  Everytime setState is run in any part of document, List gets the updated taskList
                  and pass it as a prop and does stuff with it (see code of Component <List/>)*/}
              <List
                listOfTasks = {this.state.taskList}
                />
            </div>
          </div>
            )
          }
}

/* List is the component that's going to list all the new tasks that are added:

I bring in the props that were passed in from when it was called and from the super
I go into the prop object and grab the element with the key "listOfTasks" which was named that way
above in the render() of App where I assigned it as such: listOfTasks=this.state.taskList (line 94)
*/
class List extends Component{
  constructor(props){
    super(props);
    this.state={
      'listOfTasks': props.listOfTasks,
      'checkBoxesChecked':{}
    }
    //Below I bind the function deleteItem() to this component so that when we use "this.deleteItem" it works without a problem
    this.deleteItem=this.deleteItem.bind(this);

  }
//Below function is called when delete button is clicked
deleteItem(e){
  console.log('deleteItem() called') //Just loggint to make sure it was being called

  let targetTask = e.target.name     // bringing the name= property of the button into variable targetTask
  this.state.listOfTasks.splice(targetTask,1)
  //Above: 'name' of button matches 'id' of <div><li> Task item, so I use that to splice it off array taskList

  this.setState({'listOfTasks':this.state.listOfTasks}) //setting State so it renders with new array and in turn updates list on web app.
}

trackCheckBoxChange(){

}
/* Below it renders a UL and then it goes through each item of array listOfTasks and using map
it wraps it in a div, and li, and adds a key and id.

key is just a random mix of the actual task + index, this is added cause React wants it to have it
id will come out like : "0", "1"... etc, I'll use that later to remove items.

*/
    render(){return (
      <ul>
        {this.state.listOfTasks.map((eachTask,indx,arr)=>
          (
          <div className ='itemBlue' key={eachTask+indx} id={indx}>
            <li>{eachTask}</li>
            <input className="chbox" type="checkbox" onChange={this.trackCheckBoxChange}/>

              {/*Below I add a 'name' property to the button that is the same
              as the id of the above <div> in order to use it, by using the
              index of current item */}
            <button
              name = {indx}
              className ='btn-delete'
              onClick = {this.deleteItem}
              >Delete</button>
          </div>)
          )
        }
      </ul>)
    }
}
