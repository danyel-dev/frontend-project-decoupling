export default function ItemComponent({ itemName, status }) {
    return (
        <li>
            <p>{itemName}</p>
            status: {status ? <small>Finalizado</small>: <small>Não finalizado</small> }
        </li>
    );
};
