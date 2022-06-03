import '../styles/itemComponent.css'
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/pt-br'


export default function ItemComponent({ item }) {
    // 2022-06-01T23:57:44.987350
    moment.locale('pt-br')
    const data = moment(item.created_at).format('LLLL')
    
    function handleChangeStatus() {
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
        }, config)
    }

    function handleDeleteTodo() {
        const config = {
            headers: {
                'content-type': 'Application/json',
                'Authorization': 'Token ' + localStorage.getItem('token')
            }
        }

        axios.delete(`http://127.0.0.1:8000/item/${item.id}/`, config)
    }


    return (
        <li className='item' style={item.done === true? {backgroundColor: 'rgba(0, 0, 0, 0.25)'}: {backgroundColor: 'rgba(0, 0, 0, 0.1)'}}>
            <div className='checkbox-name'>
                <input type="checkbox" onClick={handleChangeStatus} checked={item.done} />
                <p style={item.done === true? {textDecoration: 'line-through'}: {}}>{item.name}</p>
            </div>

            <div className='date-edit'>
                <small className='date'>{data}</small>

                <p className='icons'>
                    <i class="fa-solid fa-pen-to-square"></i>
                    <i class="fa-solid fa-trash" onClick={handleDeleteTodo}></i>
                </p>
            </div>
        </li>
    );
};
