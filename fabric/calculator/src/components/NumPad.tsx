import "./components.css";
export default function NumPad() {
    const numbers = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        ['.', 0, ',']
    ];
    return (
        <div className='container-div'>
            {numbers.map((row, i) => (
                <div key={i} className='btn-div'>
                    {row.map((number, j) =>
                        <button key={j} className='btn' >{number}</button>
                    )}
                </div>
            ))}
        </div>
    )

}
