import { useEffect, useState } from 'react';
import axios from 'axios'


export default function App() {
  const [listas, setListas] = useState([])
  
  useEffect(() => {
    const fetchListas = async () => {
      const { data } = await axios.get('http://127.0.0.1:8000/list/');
      setListas(data)
      console.log(listas)
    } 
    
    fetchListas()
  }, [])
  
  return (
    <div className="App">
      { listas.map(item => 
        <p>{ item.name }</p>
      ) }
    </div>
  );
}
