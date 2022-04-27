import ItemComponent from "./ItemComponent";


export default function ListComponent({ listName, items }) {
    return (
        <div>
            <h1>{ listName }</h1>

            <ul>
                { items.map(item => 
                    <ItemComponent key={ item.id } item={ item } />
                ) }
            </ul>
        </div>
    );
};
