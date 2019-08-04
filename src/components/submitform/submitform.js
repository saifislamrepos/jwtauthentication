import React ,{Component} from 'react' ;
import submitformcss from './submitform.scss';
import axios from 'axios';
class submitform extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formelem:{}
        }
        this.state.formelem = this.props.formelem.slice();
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event){
        event.preventDefault();
        const len = this.state.formelem.length;
        const data= {}
        for (let key=0; key<len;key++) {
            var datap = this.state.formelem[key]
            data[datap.name] = datap.value
        }
        const url = this.props.submitaction;
        axios.post(url, data )
          .then( (response)=> {

            document.getElementById("user-form").reset();
          })
          .catch( (error) => {
            console.log(error.response.data);
            document.getElementById("user-form").reset();
        });
    }
    onChange = (e,elem) => {
       let index = e.target.getAttribute("keyval");
        const elems =  this.state.formelem.slice();
        elems[index].value = e.target.value;
        this.setState(
            {formelem:elems}
        )
    }
    render() {
        const inputitemes = this.state.formelem.map((elem, index) =>
            <label key={'mykey' + index} className="mb-15 pb-10">
                <span>{elem.name}</span>
                <input type={elem.type} name={elem.name} keyval = {index} onChange={this.onChange.bind(this)}></input>

            </label>
        );
        return (
            <div className="pl-15 pr-15">
                <form name="create" className="i-b" id="user-form" onSubmit={this.handleSubmit}>
                    {inputitemes}
                    <input type="submit"></input>
                </form>
            </div>
        );
    }
}
export default submitform;
