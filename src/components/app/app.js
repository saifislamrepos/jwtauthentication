import React, { Component } from 'react';
import Form from '../newcomp/newcomp.js'
import scss from './app.scss'
class App extends Component{
   constructor(props) {
      super(props);
   }
   render(){
      return(
         <div className="pr-24">
            <Form/>
         </div>
      );
   }
}
export default App;