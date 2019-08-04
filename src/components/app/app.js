import React, { Component } from 'react';
import Form from '../submitform/submitform.js'
import scss from './app.scss'
class App extends Component{
   constructor(props) {
      super(props);
   }
   render(){
      const formelem = [
         {
            type:"text",
            value:'',
            name:"username"
         },
         {
            type:"password",
            value:'',
            name:"password"
         }
      ]
      return(
         <div className="pr-24">
            <h3>Create User</h3>
            <Form formelem={formelem} submitaction = "/createadmin"/>
         </div>
      );
   }
}
export default App;