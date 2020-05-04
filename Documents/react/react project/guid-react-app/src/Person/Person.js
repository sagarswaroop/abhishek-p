import React from 'react';
// the css file person is imported directly. it is easy becuase wepack imported it globaly on webpage when the component loaded in browser web page. it can be check on inspect page.
import Pereson from './Person.Module.css';

const person = (props) => { // this argument name can be customize  this argument can be treat as a object. which is use to acces all ptoeprties of the function

    // children are the specail keyword to acces sentece between the person attribute or the sub child of parameters.
    return (
        <div className={Pereson.Pereson}>
            <p onClick={props.click}> Hi, I am {props.name} and I am {props.age} year old</p>
            <input type="text" onChange={props.changed} defaultValue={props.name} />
        </div>      
    );

    //step 1:  add dynamic conent with static code.
    // return <p> Hi, I am person and my age is {Math.floor(Math.random()*30)}</p>;

};

export default person;