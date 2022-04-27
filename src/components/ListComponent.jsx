import ItemComponent from "./ItemComponent";


export default function ListComponent(props) {
    return (
        <div>
            <h1>{ props.ListName }</h1>

            <ul>
                <ItemComponent name="item 1" />
                <ItemComponent name="item 2" />
            </ul>
        </div>
    );
};
