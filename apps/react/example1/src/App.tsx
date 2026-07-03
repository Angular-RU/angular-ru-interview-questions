import './App.css';

function Greeting({name}: {name: string}) {
    return <h1>Hello, {name}</h1>;
}

export default function App() {
    return (
        <>
            <div className="main">
                <Greeting name="world" />
            </div>
        </>
    );
}
