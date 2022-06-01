import '../styles/itemComponent.css'
import axios from 'axios';


export default function ItemComponent({ item }) {
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

    return (
        <li className='item'>
            <input type="checkbox" onClick={handleChangeStatus} checked={item.done} />
            <p>{item.name}</p>
        </li>
    );
};
