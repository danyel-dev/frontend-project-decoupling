import * as React from 'react';
import axios from 'axios';
import { useState } from 'react';

import ItemComponent from "./ItemComponent";
import '../styles/listComponent.css'

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '40%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: 0,
    boxShadow: 24,
    borderRadius: '5px',
    p: 4,
};


export default function ListComponent({ list, handleAdditionTodo, handleDeleteTodo, handleChangeStatus, handleDeleteList, handleChangeTodoName }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [inputTodo, setInputTodo] = useState("")
    
    const itemset_count = list.item_set.length

    function handleChangeInputTodo(event) {
        setInputTodo(event.target.value)
    }

    function PostTodo(event) {
        // Não esquecer de mudar o endereço quando tiver em produção
        const config = {
            headers: {
              'content-type': 'Application/json',
              'Authorization': 'Token ' + localStorage.getItem('token')
            }
        }

        axios.post('http://127.0.0.1:8000/item/', {
            List: list.url,
            name: inputTodo,
        }, config)

        setInputTodo("")
        event.preventDefault()
    }

    function deleteListAPI() {
        const config = {
            headers: {
              'content-type': 'Application/json',
              'Authorization': 'Token ' + localStorage.getItem('token')
            }
        }

        axios.delete(`http://127.0.0.1:8000/list/${list.id}/`, config)
    }

    return (
        <div className="list-container">
            <small className='number-tasks'>Número de tarefas: {itemset_count}</small>

            <h1 className="title-list">{list.name}</h1>

            <Button onClick={handleOpen}>Open modal</Button>
            
            <button onClick={deleteListAPI}>Deletar lista de tarefas</button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} className="box-modal">
                    <i className="fa-solid fa-xmark" onClick={handleClose}></i>
                    <h1 className="title-list-modal">{list.name}</h1>
                    
                    <form method="POST" className="form-add-todo" onSubmit={PostTodo}>
                        <input type="text"
                            value={inputTodo}
                            onChange={handleChangeInputTodo}
                            placeholder="Digite aqui o nome da tarefa"
                        />
                        
                        <i className="fa-solid fa-circle-plus"></i>
                    </form>
                    
                    {list.item_set.length === 0?
                        <h4 className='list-empty'>Está lista está vazia</h4>
                        :
                        <ul className="list-todos">
                            {list.item_set.map(item => 
                                <ItemComponent
                                    key={item.id}
                                    listId={list.id}
                                    item={item}
                                />
                            )}
                        </ul>
                    }
                </Box>
            </Modal>
        </div>
    );
};
