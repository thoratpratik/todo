import React ,{ Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../App.css'

const Todo = props => (
    <tr>
        <td className={props.todo.todo_completed ? 'completed' : ''}>{props.todo.todo_description}</td>
                     
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {
    constructor(props){
        super(props);
        this.state = {
            todos : []
        };
        
        
    }
    componentDidMount(){
        axios.get('http://localhost:4000/')
            .then( response => {
                    this.setState({ todos : response.data})
                    console.log(this.state.todos);
            })
            .catch( error =>{
                console.log(error);
            })
    } 

    

    
    
    todoList() {
        return this.state.todos.map(function(currentTodo, i){
            return (<Todo todo={currentTodo} key={i} />);
        })
    }

    render() {
        return (
            <div>
                <h3 align="center" style={{color:"blue"}}>Todos List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            
                            <th>EDIT</th>
                        </tr>
                    </thead>
                    <tbody>
                         { this.todoList() }
                    </tbody>
                </table>
            </div>
        )
    }
}