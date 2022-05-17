import '../styles/itemComponent.css'


export default function ItemComponent({ itemName }) {
    return (
        <li className='item'>
            <p><input type="checkbox" /> {itemName}</p>
        </li>
    );
};
