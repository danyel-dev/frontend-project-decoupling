import { useEffect, useState } from 'react';
import axios from 'axios';

import ListComponent from './components/ListComponent';
import LoginComponent from './components/LoginComponent';


export default function App() {
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
  }, [lists])
  
  const token = localStorage.getItem('token');

  if (!token) {
    return <LoginComponent />
  } else {
      return (
        <div className="App">
          {lists.map(list =>
              <ListComponent key={list.id} listName={list.name} items={list.item_set} />
          )}
        </div>
      );
    }
}
