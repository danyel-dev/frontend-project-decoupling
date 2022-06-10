import { useEffect, useState } from 'react';
import axios from 'axios';

import ListComponent from './components/ListComponent';

import './styles/core.css'


export default function Core() {
  const [lists, setlists] = useState([])
  const [user, setUser] = useState([])

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
      var { user } = await axios.get('http://127.0.0.1:8000/users/', config);

      data = data.map(list => {
        list.item_set = list.item_set.reverse()
        return list
      })

      setlists(data)
      setUser(user)
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
    // const config = {
    //   headers: {
    //     'content-type': 'Application/json',
    //     'Authorization': 'Token ' + localStorage.getItem('token')
    //   }
    // }

    // axios.post('http://127.0.0.1:8000/List/', {
    //     name: inputlist,
    // }, config).then(({ data }) => {
    //     console.log(data)
    // })

    // setInputTodo("")
    event.preventDefault()
  }

  function changeInput(event) {
    setInputList(event.target.value)
  }

  return (
    <div className="main">
      <p>{user.email}</p>
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
          />
        )}
      </div>
    </div>
  );
}
