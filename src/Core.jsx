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

      const { data } = await axios.get('https://example-deploy-django.herokuapp.com/list/', config);
      setlists(data)
    } 
    
    fetchlists()
  }, [])

  return (
    <div className="main">
      <div className='main-lists'>
        {lists.map(list =>
          <ListComponent key={list.id} listName={list.name} items={list.item_set} />
        )}
      </div>
    </div>
  );
}
