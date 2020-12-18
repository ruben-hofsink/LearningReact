import {Square} from "./Square";
import React from "react";

export const Board = (props) => (
    <>
        {[0, 1, 2].map(row => (
            <div key={row} className="board-row">
                {[0, 1, 2].map(col => (
                    <Square
                        key={col}
                        value={props.squares[row * 3 + col]}
                        onClick={() => props.onClick(row * 3 + col)}
                    />
                ))}
            </div>
        ))}
    </>
)

const props = {
    onClick: "iets",
    squares: "iets"
}

const { onClick, squares } = props;

const [a, b, c] = [0, 1, 2]

export const Example = () => {
    const data = [0, 2, 3, 4]

    const renderDataElement = (data) => <div> { data }</div>;

    return (
        <>
            { data.map(renderDataElement) }
        </>
    )
}

//
// render() {
//     //this will contain the 3 rows with squares in them
//     const rows = [];
//     for (let row = 0; row < 3; row++) {
//         const currentRow = [];
//         for (let col = 0; col < 3; col++) {
//             currentRow.push(this.renderSquare(row * 3 + col));
//         }
//         rows.push(<div key={row} className="board-row"> {currentRow}</div>)
//     }
//     return (
//         <div>
//             {rows}
//         </div>
//     )
//
// }


// renderSquare(i) {
//     return <Square
//         key={i}
//         value={this.props.squares[i]}
//         onClick={() => this.props.onClick(i)}
//     />;
// }
