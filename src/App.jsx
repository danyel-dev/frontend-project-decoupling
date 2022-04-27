import { useEffect, useState } from 'react';
import axios from 'axios';

import ListComponent from './components/ListComponent';


export default function App() {
  const [lists, setlists] = useState([])
  
  useEffect(() => {
    const fetchlists = async () => {
      const config = {
        headers: {
          'content-type': 'Application/json',
          'Authorization': 'Token 8322fe38adf65966cf3308e1a15024657c1e389b'
        }
      }

      const { data } = await axios.get('http://127.0.0.1:8000/list/', config);
      setlists(data)
    } 
    
    fetchlists()
  }, [])
  
  return (
    <div className="App">
      {lists.map(list =>
          <ListComponent key={list.id} listName={list.name} items={list.item_set} />
      )}
    </div>
  );
}
