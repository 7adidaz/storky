import "./components.css"
export default function operations() {
    const operators = [
        ['(', ')'], ['-',
            '+'], ['x', '/']
    ];

    return (
        <div className="container-div">
            {operators.map((row, i) => (
                <div key={i} className="btn-div ">
                    {row.map((operator, j) =>
                        <button key={j} className='btn'>{operator}</button>
                    )}
                </div>
            ))}
        </div>
    );
};
