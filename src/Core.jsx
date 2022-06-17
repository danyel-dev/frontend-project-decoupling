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

      var { data } = await axios.get('https://example-deploy-django.herokuapp.com/list/', config);
      var usuario = await axios.get('https://example-deploy-django.herokuapp.com/getUser/', config);

      data = data.map(list => {
        list.item_set = list.item_set.reverse()
        return list
      })
      
      setlists(data)
      setUser(usuario.data[0])
    } 
    
    fetchlists()
  }, [])
  
  
  function handleAdditionTodo(listId, Todo) {
    const newLists = lists.map(list => {
      if(list.id === listId) 
        list.item_set.unshift(Todo)
      return list
    })
    
    setlists(newLists)
  }

  function handleDeleteTodo(listId, todoId) {
    const newLists = lists.map(list => {
      if (list.id === listId) 
        list.item_set = list.item_set.filter(item => item.id !== todoId)
      return list
    })
    
    setlists(newLists)
  }
  
  function handleChangeStatus(listId, todoId) {
    const newLists = lists.map(list => {
      if (list.id === listId) { 
        list.item_set = list.item_set.map(item => {
          if(item.id === todoId) 
            item.done = !item.done
          return item
        })
      } return list
    })
    
    setlists(newLists)
  }

  function handleSubmitAdditionList(event) {
    const config = {
      headers: {
        'content-type': 'Application/json',
        'Authorization': 'Token ' + localStorage.getItem('token')
      }
    }

    axios.post('https://example-deploy-django.herokuapp.com/list/', {
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

  function handleDeleteList(listId) {
    const newLists = lists.filter(list => {
      if (list.id !== listId) 
        return list
    })

    setlists(newLists)
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
            handleAdditionTodo={handleAdditionTodo}
            handleDeleteTodo={handleDeleteTodo}
            handleChangeStatus={handleChangeStatus}
            handleDeleteList={handleDeleteList}
          />
        )}
      </div>
    </div>
  );
}
