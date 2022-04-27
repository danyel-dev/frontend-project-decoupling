import { useEffect, useState } from 'react';
import axios from 'axios';

import ListComponent from './components/ListComponent';


export default function App() {
  const [listas, setListas] = useState([])
  
  useEffect(() => {
    const fetchListas = async () => {
      const { data } = await axios.get('http://127.0.0.1:8000/list/');
      setListas(data)
    } 
    
    fetchListas()
  }, [listas])
  
  return (
    <div className="App">
      <ListComponent ListName='Minha lista 1' />
      <ListComponent ListName='Minha lista 2' />
    </div>
  );
}
