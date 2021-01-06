import React ,{ Component } from 'react';
import axios from 'axios';


export default class EditTodo extends Component {

    constructor(props) {
        super(props);

        this.state = {
            todo_description: '',
            todo_completed: false
        }

        this.onChangeTodoDescription = this.onChangeTodoDescription.bind(this);
        this.onChangeTodoCompleted = this.onChangeTodoCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        
    }

    onChangeTodoDescription(e) {
        this.setState({
            todo_description: e.target.value
        });

    }

    onChangeTodoCompleted(e){
        this.setState({
            todo_completed:!this.state.todo_completed
        })
    }

    onSubmit(e) {
        e.preventDefault();
        const obj = {
            todo_description: this.state.todo_description,
            todo_completed: this.state.todo_completed
        };
        console.log(obj);
        axios.post('http://localhost:4000/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    componentDidMount() {
        axios.get('http://localhost:4000/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    todo_description: response.data.todo_description,
                    
                    todo_completed: response.data.todo_completed
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    render() {
        return (
            <div>
                <h3 align="center" style={{color: "Blue", textShadow:"2,2"}}>Update Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div>
                    <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                                />
                    
                    </div>
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeTodoCompleted}
                                checked={this.state.todo_completed}
                                value={this.state.todo_completed}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>                        
                    </div>

                    <br />



                    <div className="form-group">
                        <input type="submit" value="Update Todo" className="btn btn-primary" />
                    </div>   

                </form>
            </div>
        )
    }
}