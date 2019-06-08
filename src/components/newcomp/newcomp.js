import React ,{Component} from 'react' ;
import axios from 'axios';
class newcomp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username:'',
            password: ''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        let data = {
            password:this.state.password,
            username:this.state.username
        }
        axios.post('/signIn', data )
          .then( (response)=> {

            document.getElementById("user-form").reset();
          })
          .catch( (error) => {
            console.log(error.response.data);
            document.getElementById("user-form").reset();
        });
    }
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value ,error:false,success:false});
    }
    render() {
        return (
            <div className="pl-15 pr-15">
                <form name="create" className="i-b" id="user-form" onSubmit={this.handleSubmit}>
                    <label className="mr-26">
                        username:
                        <input type="text" name="username" className="ml-5" onChange={this.onChange}/>
                    </label>
                    <label className="mr-20">
                        password:
                        <input type="text" name="password" className="ml-5" onChange={this.onChange}/>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
export default newcomp;
