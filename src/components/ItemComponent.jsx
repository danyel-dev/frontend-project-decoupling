import '../styles/itemComponent.css'
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br'
import { useState } from 'react';


export default function ItemComponent({ listId, item, handleDeleteTodo, handleChangeStatus, handleChangeTodoName }) {
    moment.locale('pt-br')
    const data = moment(item.created_at).format('LLLL')

    const [editTodoName, setEditTodoName] = useState(false)
    const [inputTodo, setInputTodo] = useState(item.name)

    function PutStatus() {
        const config = {
            headers: {
              'content-type': 'Application/json',
              'Authorization': 'Token ' + localStorage.getItem('token')
            }
        }

        axios.put(`https://example-deploy-django.herokuapp.com/item/${item.id}/`, {
            List: item.List,
            name: item.name,
            done: !item.done,
        }, config).then(() => {
            handleChangeStatus(listId, item.id)
        })
    }

    function PutTodoNameAPI(event) {
        const config = {
            headers: {
              'content-type': 'Application/json',
              'Authorization': 'Token ' + localStorage.getItem('token')
            }
        }

        axios.put(`https://example-deploy-django.herokuapp.com/item/${item.id}/`, {
            List: item.List,
            name: inputTodo,
            done: item.done,
        }, config).then(() => {
            handleChangeTodoName(listId, item.id, inputTodo)
        })

        event.preventDefault()
        setEditTodoName(false)
    }

    function ChangeValueTodo(event) {
        setInputTodo(event.target.value)
    }

    function DeleteTodo() {
        const config = {
            headers: {
                'content-type': 'Application/json',
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        }

        axios.delete(`https://example-deploy-django.herokuapp.com/item/${item.id}/`, config).then(() => {
            handleDeleteTodo(listId, item.id)
        })
    }

    return (
        <li className='item' style={item.done === true? {backgroundColor: 'rgba(0, 0, 0, 0.2)'}: {backgroundColor: 'rgba(0, 0, 0, 0.05)'}}>
            <div className='checkbox-name'>
                <span className='numberTodo'>#{item.number}</span>

                <input type="checkbox" onChange={PutStatus} checked={item.done} />
                
                <p style={item.done === true? {textDecoration: 'line-through'}: {}}>
                    {editTodoName === false?
                        (<span onClick={PutStatus}>{item.name}</span>):
                        (<form onSubmit={PutTodoNameAPI}>
                            <input
                            type="text"
                            value={inputTodo}
                            onChange={ChangeValueTodo} />
                        </form>)
                    }
                </p>
            </div>

            <div className='date-edit'>
                <small className='date'>{data}</small>

                <p className='icons'>
                    <i className="fa-solid fa-pen-to-square" onClick={() => setEditTodoName(true)}></i>
                    <i className="fa-solid fa-trash" onClick={DeleteTodo}></i>
                </p>
            </div>
        </li>
    );
};
