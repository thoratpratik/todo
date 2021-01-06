import React ,{ Component } from 'react';
import axios from 'axios';
export default class CreateTodo extends Component {

    constructor(props){
        super(props);
        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            todo_description: '',
            todo_completed: false
        } 
        
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();
        
        console.log(`Form submitted:`);
        console.log(`Todo Description: ${this.state.todo_description}`);
        
        const newTodo = {
            todo_description: this.state.todo_description,
            todo_completed: this.state.todo_completed
        };
        
        this.setState({
            todo_description: '',
            todo_completed: false
        })

        axios.post('http://localhost:4000/add', newTodo)
        .then(res => console.log(res.data));

    this.setState({
        todo_description: '',
        todo_completed: false
    })
    }
    render() {
        return (
                <div>
                            <h3 align="center" style={{color: "blue"}}>Crete New Todo</h3>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>TODO List :</label>
                                    <input  type="text"
                                    className="form-control"
                                    value={this.state.todo_description}
                                    onChange={this.onChangeTodoDescription}
                                    />
                                </div>
                                <div className="form-group">
                                    <input type="submit" value="Create Todo" className="btn btn-primary" />
                                </div>
                            </form>
                </div>
            )
    }


}