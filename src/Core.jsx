import { useEffect, useState } from 'react';
import axios from 'axios';

import ListComponent from './components/ListComponent';

import './styles/core.css'


export default function Core() {
  const [lists, setlists] = useState([])
  const [user, setUser] = useState({})

  const [inputList, setInputList] = useState('')

  useEffect(() => {
    const fetchlists = async () => {
      const config = {
        headers: {
          'content-type': 'Application/json',
          'Authorization': 'Token ' + localStorage.getItem('token')
        }
      }

      var { data } = await axios.get('http://127.0.0.1:8000/list/', config);
      var usuario = await axios.get('http://127.0.0.1:8000/getUser/', config);

      data = data.map(list => {
        list.item_set = list.item_set.reverse()
        list.item_set.map((item, indice) => {
          item.number = indice + 1
          return item
        })
        return list
      })
      setlists(data)
      setUser(usuario.data[0])
    } 
    
    fetchlists()
  }, [lists])
  
  function handleSubmitAdditionList(event) {
    const config = {
      headers: {
        'content-type': 'Application/json',
        'Authorization': 'Token ' + localStorage.getItem('token')
      }
    }

    axios.post('http://127.0.0.1:8000/list/', {
      user: user.url,
      name: inputList,
      item_set: []
    }, config).then(({ data }) => {
      setlists([data, ...lists])
    })

    setInputList("")
    event.preventDefault()
  }

  function changeInput(event) {
    setInputList(event.target.value)
  }

  return (
    <div className="main">
      <form onSubmit={handleSubmitAdditionList}>
        <input type="text" value={inputList} onChange={changeInput} placeholder='Crie uma nova tarefa aqui' />
        <button>click</button>
      </form>

      <div className='main-lists'>
        {lists.map(list =>
          <ListComponent
            key={list.id}
            list={list}
          />
        )}
      </div>
    </div>
  );
}
