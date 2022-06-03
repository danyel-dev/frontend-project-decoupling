import '../styles/itemComponent.css'
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br'


export default function ItemComponent({ listId, item, handleDeleteTodo, handleChangeStatus }) {
    moment.locale('pt-br')
    const data = moment(item.created_at).format('LLLL')
    
    function PutStatus() {
        const config = {
            headers: {
              'content-type': 'Application/json',
              'Authorization': 'Token ' + localStorage.getItem('token')
            }
        }

        axios.put(`http://127.0.0.1:8000/item/${item.id}/`, {
            List: item.List,
            name: item.name,
            done: !item.done,
        }, config).then(() => {
            handleChangeStatus(listId, item.id)
        })
    }

    function DeleteTodo() {
        const config = {
            headers: {
                'content-type': 'Application/json',
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        }

        axios.delete(`http://127.0.0.1:8000/item/${item.id}/`, config).then(() => {
            handleDeleteTodo(listId, item.id)
        })
    }


    return (
        <li className='item' style={item.done === true? {backgroundColor: 'rgba(0, 0, 0, 0.25)'}: {backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
            <div className='checkbox-name'>
                <input type="checkbox" onChange={PutStatus} checked={item.done} />
                <p style={item.done === true? {textDecoration: 'line-through'}: {}}>{item.name}</p>
            </div>

            <div className='date-edit'>
                <small className='date'>{data}</small>

                <p className='icons'>
                    <i className="fa-solid fa-pen-to-square"></i>
                    <i className="fa-solid fa-trash" onClick={DeleteTodo}></i>
                </p>
            </div>
        </li>
    );
};
