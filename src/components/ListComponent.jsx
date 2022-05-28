import ItemComponent from "./ItemComponent";
import '../styles/listComponent.css'


export default function ListComponent({ listName, items }) {
    function handleChangeModal() {
        const modal = document.querySelector('.modal')
        modal.classList.toggle('change-modal')
    }

    function closedModal(e) {
        if (e.target.id == 'modal') {
            handleChangeModal()
        }
    }

    return (
        <div className="list-container">
            <h1>{ listName }</h1>

            <button onClick={handleChangeModal}>Ver tarefas</button>

            <div id="modal" className="modal change-modal" onClick={closedModal}>
                <div className="modal-todos">
                    <button onClick={handleChangeModal}>x</button>
                    
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nisi maiores asperiores vero assumenda distinctio voluptate quam possimus dignissimos. Veniam vitae quisquam maiores pariatur consequatur amet totam, odio fugit quia debitis.</p>
                </div>
            </div>
        </div>
    );
};
