import ItemComponent from "./ItemComponent";
import '../styles/listComponent.css'
import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: 0,
    boxShadow: 24,
    p: 4,
};


export default function ListComponent({ list }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div className="list-container">
            <h1 className="title-list">{ list.name }</h1>

            <Button onClick={handleOpen}>Open modal</Button>
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h1 className="title-list">{ list.name }</h1>
                    
                    <form method="POST" className="form-add-todo">
                        <input type="text" placeholder="Digite aqui o nome da tarefa" />
                        <button>Criar</button>
                    </form>

                    <ul className="list-todos">
                        {list.item_set.map(item => 
                            <ItemComponent item={item} />    
                        )}
                    </ul>
                </Box>
            </Modal>
        </div>
    );
};
