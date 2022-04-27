import { useEffect, useState } from 'react';
import axios from 'axios';

import ListComponent from './components/ListComponent';


export default function App() {
  const [listas, setListas] = useState([])
  
  useEffect(() => {
    const fetchListas = async () => {
      const config = {
        headers: {
          'content-type': 'Application/json',
          'Authorization': 'Token 8322fe38adf65966cf3308e1a15024657c1e389b'
        }
      }

      const { data } = await axios.get('http://127.0.0.1:8000/list/', config);
      setListas(data)
    } 
    
    fetchListas()
  }, [listas])
  
  return (
    <div className="App">
      
    </div>
  );
}
