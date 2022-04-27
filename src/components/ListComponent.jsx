import ItemComponent from "./ItemComponent";


export default function ListComponent({ list }) {
    return (
        <div>
            <h1>{ list.name }</h1>

            <ul>
                { list.item_set.map(item => 
                    <ItemComponent key={ item.id } item={ item } />
                ) }
            </ul>
        </div>
    );
};
