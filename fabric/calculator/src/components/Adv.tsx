import './components.css'
export default function Advanced() {
    const functions = [
        ['sin', '!'],
        ['cos', 'e',],
        ['tan', 'ln'],
        ['pi', 'log'],
        ['sqr', 'x^2']
    ];

    return (
        <div className='container-div'>
            {functions.map((row, i) => (
                <div key={i} className='btn-div'>
                    {row.map((func, j) =>
                        <button key={j} className='btn'>{func}</button>
                    )}
                </div>
            ))}
        </div>
    )
}
