import '../styles/itemComponent.css'


export default function ItemComponent({ item }) {
    return (
        <li className='item'>
            {item.status? <input type="checkbox" checked />: <input type="checkbox" />}
            
            <p>
                { item.name }
            </p>
        </li>
    );
};
