
import React, { useState,useEffect } from 'react';
import { Button, FormControl,InputLabel,Input } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
// state meas without refresh or fasr
function App() {
  // usesate: it's a piece of memory or sort term memory and variaable in React
  
  const [input, setInput] = useState('');
  const [messages, setMessage] = useState([]);
  const[username,setUsername] = useState('');
  // we can't change the input value whiout setInput
  // useEffect = run code on a condition in the REACT

  useEffect(() =>{
    // run once when the app component loads
    db.collection('messages')
    .orderBy('timestamp','desc')
    .onSnapshot(snapshot =>{
      setMessage(snapshot.docs.map(doc => ({id:doc.id,message:doc.data()})))
    });  // its runs soonce every time so if I hit add new document and there's new document that  gets added here or listner for the new data

    // onSnapshot= all the information form that snapshots put into that snapshot variabe or if add any data in the database helps to get those data like array

  },[])
  useEffect(() => {
    // run the code here
    // if its blank inside [], this code runs once when the app component loads the page
    // if we have a varibale like  input ,it runs every time input changes
    // const name=prompt('please enter your name') not use like this imporve it
    setUsername(prompt('please enter your name') )
  
  }, [])  // condition

  const sendMessage = (event) => {
    // all the logic to send a messafe to goes
    event.preventDefault();
    // this event helps to disable the refresh button (event.preventDefault();)
  
    // this below code helps to add the data into the data databse automatically
    db.collection('messages').add({
       message:input,
      username:username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    // setMessage([...messages, {username:username,text:input}]);
    // this is temprary way to show the message and username on the screen
    setInput('');
  }
  return (
    <div className="App">
      <img  src="https://scontent.fdel27-1.fna.fbcdn.net/v/t39.8562-6/120009688_325579128711709_1736249742330805861_n.png?_nc_cat=1&amp;ccb=1-3&amp;_nc_sid=6825c5&amp;_nc_ohc=n_tcYgDxTfoAX_-rCQs&amp;_nc_ht=scontent.fdel27-1.fna&amp;oh=e67bdcf615fc4bc95418257dafc0f59b&amp;oe=60911D7D" alt="Messenger"/>
      <h1>Messenger</h1>
      <h2>welcome{username} </h2>
      {/* input field */}
      <form className='app__form'>
        <FormControl className='app__formControl'>
          <Input 
          className='app__input'    
          placeholder='Enter Message' value={input} onChange={event => setInput(event.target.value)}/>

          <IconButton 
            className='app__iconButton'
            disabled={!input} variant='contained' color='primary' type="submit" onClick={sendMessage}>

            <SendIcon/>
          </IconButton>

        {/* <Button disabled={!input} variant='contained' color='primary' type="submit" onClick={sendMessage}>sendMessage</Button> */}
        {/* here Button b :- is bigger beacause it use material ui  */}
        </FormControl>

        {/* <input value={input} onChange={event => setInput(event.target.value)} /> */}
        {/* setInput to update what we write on the input field */}

        {/* button */}
        {/* disabled:- is use when we write something then button work only that period of time */}
        {/* message  themselves*/}
      </form>

      {/* // map :-through every single item inside of the message array so each item is referes t o this message or fancy way to loop the array */}
    <FlipMove>
        {
          messages.map(({id, message}) =>
            (
              <Message key={id} username={username} message ={message}
              />
            
              
              ))
            }

        {/* in the  above code helps to write on the screen  */}
      </FlipMove>
    </div>
  );
}

export default App;
