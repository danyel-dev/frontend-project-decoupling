import { useEffect, useState } from 'react';
import axios from 'axios';

import ListComponent from './components/ListComponent';

import './styles/core.css'


export default function Core() {
  const [lists, setlists] = useState([])
  
  useEffect(() => {
    const fetchlists = async () => {
      const config = {
        headers: {
          'content-type': 'Application/json',
          'Authorization': 'Token ' + localStorage.getItem('token')
        }
      }

      const { data } = await axios.get('http://127.0.0.1:8000/list/', config);
      setlists(data)
    } 
    
    fetchlists()
  }, [])

  return (
    <div className="main">
      <div className='main-lists'>
        {lists.map(list =>
          <ListComponent key={list.id} list={list} />
        )}
      </div>
    </div>
  );
}
