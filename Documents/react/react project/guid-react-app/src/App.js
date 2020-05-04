import React, { Component } from 'react';
import './App.css';
import Radium from 'radium';
import Person from './Person/Person';

// P-4 this has inline and embeded add css in web page.
// React list with key value.
//
class App extends Component {
    /**
     * perior of react 16.0:
     State is a kind of keyword wich shows the sate of data. sate is use in class. class is an smart component and smart component use sate where we use setstate function to update the data at runtime. setState and state both comes from component class and the class overrride these things form extended component class.
     * - setState check where is changes and update new data with old conent of data. 
     */
    state = {
        Persons: [{id: 'adds1' , name: "sagar", age: 23 },
            {id: 'adle2', name: "Dolly", age: 24 },
            {id: 'adkc3', name: "Jordan", age: 27 }
        ],

        toggleFlage: false
    }

    // eventHandler = () => {
    //     // console.log("you clicked me");
    //     // this is not allowed in react. it can't be done directly personState.Person[0].name = "max";
    //     this.setState({
    //         Persons: [{id: 'adds1' , name: "sagar", age: 23 },
    //         {id: 'adle2', name: "Shophia", age: 24 },
    //         {id: 'adkc3', name: "Jordan", age: 27 }
    //     ],
    // }


    // textEventHandler = (personName) => {
    //     // console.log("you clicked me");
    //     // this is not allowed in react. it can't be done directly personState.Person[0].name = "max";
    //     this.setState({
    //         Persons: [{ name: personName, age: 27 },
    //             { name: "Shophia", age: 24 },
    //             { name: "Jordan", age: 29 }
    //         ]
    //     });
    // }

    namedEventHandler = (event, id) => {

        const personIndex = this.state.Persons.findIndex(p => p.id === id);
        
        const person = { ...this.state.Persons[personIndex] };
        
        person.name = event.target.value;
        
        const personsData = [...this.state.Persons];
        
        personsData[personIndex] = person;
        // console.log(personsData);
        this.setState({Persons: personsData });
        

        // console.log("event method is called....");
        // this.setState({
        //     Persons: [{ name: "Maarkus", age: 27 },
        //         { name: event.target.value, age: 24 },
        //         { name: "Jordan", age: 29 }
        //     ]
        // });
    }

    toggleEventHandler = () => {
        const toggle = this.state.toggleFlage;
        this.setState(
            {
                toggleFlage: !toggle
            }
        );

    }

    removePersonHandler = (personIndex) => {
        // const personsData = this.state.Persons; // direct assign the real data is not recomended.
        const personsData = [...this.state.Persons];

        personsData.splice(personIndex, 1);
        this.setState({Persons: personsData});
   }

    //render method is called by React to render the component to the screen.
    render() {
        
        let persondata = null;

        let buttonStyle = {
            backgroundColor: 'green',
            font: 'inherit',
            border: '1px solid blue',
            paddin: '8px',
            ":hover": {
                backgroundColor: 'lightgreen',
                color:"white"
            }

        }
        
        if (this.state.toggleFlage) {
            buttonStyle.backgroundColor = 'red';
            buttonStyle[":hover"] = {
                backgroundColor: 'pink',
                color:"white"
            }
            persondata = (
                <div>
                    {
                        this.state.Persons.map((person, index) => {
                            return <Person
                                name={person.name}
                                age={person.age}
                                key={person.id}
                                click={() => this.removePersonHandler(index)}
                                changed={(event)=>this.namedEventHandler(event, person.id)}/>
                        })
                    }
                </div>
            );
          /*  persondata = (
                <div>
                <button style = { buttonStyle }
                onClick = {this.eventHandler} > Click Me </button>
        
                
                <Person name={this.state.Person[0].name}
                age = { this.state.Person[0].age } />
        
                <Person name = { this.state.Person[1].name }
                age={this.state.Person[1].age}
                click = {
                    () => { this.textEventHandler("maximul !!") } } // not recomended.
                // click={this.eventHandler.bind(this, "sagar !!")}
                changed = { this.namedEventHandler }> Hi, This is childern of prop </Person>            
        
                <Person name = { this.state.Person[2].name }
                age = { this.state.Person[2].age }/>
            </div> 
            ); */
        }

        //creating inline css in object and injecting in button attribute jsx hmtls code.



        return (
            <div className="App" >
                <br />
                <br/>
                <button onClick={this.toggleEventHandler} style={buttonStyle} >Show Data</button>
                <br />
                <hr/>
                <br />
                 {/**this is the first way but it is not recomended when developing large project */}
                {/* {this.state.toggleFlage === true ?
                    <div>
                        <button style = { buttonStyle }
                        onClick = {this.eventHandler} > Click Me </button>

                        
                        <Person name={this.state.Person[0].name}
                        age = { this.state.Person[0].age } />

                        <Person name = { this.state.Person[1].name }
                        age={this.state.Person[1].age}
                        click = {
                            () => { this.textEventHandler("maximul !!") } } // not recomended.
                        // click={this.eventHandler.bind(this, "sagar !!")}
                        changed = { this.namedEventHandler }> Hi, This is childern of prop </Person>            

                        <Person name = { this.state.Person[2].name }
                        age = { this.state.Person[2].age }/>
                    </div> : null
                } */}
                {persondata}

            </div>
        ); // this is not a html code. react make it html style code and it convert as code metnioned below and this file is call jsx file.

        //createElement is to create the element of html to use that element in html. it takes muliptle paramteres but atleast three paramter are required where firest is element, second is js or null if not a js created and the third paramter is teh child element of div.

        // return React.createElement('div',{className: 'App'}, null,React.createElement('h1',null, "Hi!, I am React")); // this code is equevlent of above code 
    }
}

export default Radium(App);



//** Use Sate by hoock implementaiton in function P-2 */


// import React, { useState } from 'react';
// import './App.css';
// import Person from './Person/Person';

//   /**
//    * In react 16.8:
//    * - This version given a way to implement the Sate function. this is called it hooks.
//    * - use all hooks by starting that hook with use.
//    * - useSate is the demost default hooks of react. it manages the state of react. more information about reacthooks will be given in next project.
//    * - useState return an array where array has two element first is the current state and second one is a function which gives updated data on event to first elemnt.
//    * - The main difference to changing data in functions and class is that setState function is check data and merge the new data with the old one only. while in function, second function is replaced the whole old object with the new one.
//    * - useState can be use multiple times in a function but The state of class only use once in a class and it not reflact all data of component while use State can refelcet all data of a function.
//    */

// const app =  props => {
//   const [personState, setPersonState] = useState({
//     Person: [{ name: "sagar", age: 23 },
//       { name: "Shikha", age: 24 },
//       {name: "Jordan", age: 27}]
//   });

//    const eventHandler = () => {
//       // console.log("you clicked me");
//       // this is not allowed in react. it can't be done directly personState.Person[0].name = "max";
//       setPersonState({
//         Person: [{ name: "MAx", age: 27 },
//         { name: "Shophia", age: 24 },
//         {name: "Jordan", age: 29}]
//       });
//     }

//     return (
//       <div className="App">
//         <h1>Hi!. I'm this.</h1>
//         <Person name='sunny' age="27" />
//         <button onClick={eventHandler}>Click Me</button>
//         <Person name={personState.Person[0].name} age={personState.Person[0].age}>Hi, This is childern of prop </Person>
//         <Person name={personState.Person[1].name} age={personState.Person[1].age} />
//         <Person name={personState.Person[2].name} age={personState.Person[2].age} />
//       </div>
//     ); // this is not a html code. react make it html style code and it convert as code metnioned below and this file is call jsx file.
// }

// export default app;




//********************* State and setState with Component Class P-1 **************************************/

// import React, { Component } from 'react';
// import './App.css';
// import Person from './Person/Person';

// class App extends Component {
//   /**
//    * perior of react 16.0:
//    State is a kind of keyword wich shows the sate of data. sate is use in class. class is an smart component and smart component use sate where we use setstate function to update the data at runtime. setState and state both comes from component class and the class overrride these things form extended component class.
//    * - setState check where is changes and update new data with old conent of data. 
//    */
//   state = {
//     Person: [{ name: "sagar", age: 23 },
//       { name: "Shikha", age: 24 },
//       {name: "Jordan", age: 27}]
//   }

//   eventHandler = () => {
//     // console.log("you clicked me");
//     // this is not allowed in react. it can't be done directly personState.Person[0].name = "max";
//     this.setState({
//       Person: [{ name: "MAx", age: 27 },
//       { name: "Shophia", age: 24 },
//       {name: "Jordan", age: 29}]
//     });
//   }
//   //render method is called by React to render the component to the screen.
//   render() {
//     return (
//       <div className="App">
//         <h1>Hi!. I'm this.</h1>
//         <Person name='sunny' age="27" />
//         <button onClick={this.eventHandler}>Click Me</button>
//         <Person name={personState.Person[0].name} age={personState.Person[0].age}>Hi, This is childern of prop </Person>
//         <Person name={personState.Person[1].name} age={personState.Person[1].age} />
//         <Person name={personState.Person[2].name} age={personState.Person[2].age} />
//       </div>
//     ); // this is not a html code. react make it html style code and it convert as code metnioned below and this file is call jsx file.

//     //createElement is to create the element of html to use that element in html. it takes muliptle paramteres but atleast three paramter are required where firest is element, second is js or null if not a js created and the third paramter is teh child element of div.

//     // return React.createElement('div',{className: 'App'}, null,React.createElement('h1',null, "Hi!, I am React")); // this code is equevlent of above code 
//   }
// }

// export default App;