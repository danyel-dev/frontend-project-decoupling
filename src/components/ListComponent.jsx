import ItemComponent from "./ItemComponent";
import '../styles/listComponent.css'


export default function ListComponent({ listName, items }) {
    return (
        <div className="list-container">
            <h1>{listName}</h1>

            <ul>
                {items.map(item => 
                    <ItemComponent key={item.id} itemName={item.name} status={item.done} />
                )}
            </ul>
        </div>
    );
};
