import '../styles/itemComponent.css'


export default function ItemComponent({ itemName, status }) {
    return (
        <li className='item'>
            <p>
                {status? <input type="checkbox" checked />: <input type="checkbox" />}
                { itemName }
            </p>
        </li>
    );
};
