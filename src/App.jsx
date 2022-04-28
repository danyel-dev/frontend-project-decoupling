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
          'Authorization': 'Token 57252f4c68b458f3175c881d0c2cf04b03140f79'
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
