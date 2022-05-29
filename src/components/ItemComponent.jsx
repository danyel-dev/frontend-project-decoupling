import '../styles/itemComponent.css'


export default function ItemComponent({ item }) {
    return (
        <li className='item'>
            <p>
                {item.status? <input type="checkbox" checked />: <input type="checkbox" />}
                { item.name }
            </p>
        </li>
    );
};
