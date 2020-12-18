import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//     render() {
//         return (
//             <button
//                 className="square"
//                 onClick={() => this.props.onClick()}
//             >
//                 {this.props.value}
//             </button>
//         );
//     }
// }

function Square(props) {
    return (
        <button
            className="square"
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square
            key={i}
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
        />;
    }

    render() {
        //this will contain the 3 rows with squares in them
        const rows = [];
        for (let row = 0; row < 3; row++) {
            const currentRow = [];
            for (let col = 0; col < 3; col++) {
                currentRow.push(this.renderSquare(row * 3 + col));
            }
            rows.push(<div key={row} className="board-row"> {currentRow}</div>)
        }
        return (
            <div>
                {rows}
            </div>
        )

    }

    // render() {
    //     return (
    //         <div>
    //             <div className="board-row">
    //                 {this.renderSquare(0)}
    //                 {this.renderSquare(1)}
    //                 {this.renderSquare(2)}
    //             </div>
    //             <div className="board-row">
    //                 {this.renderSquare(3)}
    //                 {this.renderSquare(4)}
    //                 {this.renderSquare(5)}
    //             </div>
    //             <div className="board-row">
    //                 {this.renderSquare(6)}
    //                 {this.renderSquare(7)}
    //                 {this.renderSquare(8)}
    //             </div>
    //         </div>
    //     );
    // }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                moveList: [],
            }],
            xIsNext: true,
            stepNumber: 0,
        }
    }

    jumpTo(moveNumber) {
        this.setState({
            stepNumber: moveNumber,
            xIsNext: (moveNumber % 2) === 0,
        });
    }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                moveList: i,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, moveNumber) => {
            const row = Math.floor(step.moveList / 3);
            const column = step.moveList % 3;
            const description = moveNumber ?
                `Go to move #${moveNumber}, row: ${row}, col: ${column}` :
                'Go to game start';
            return (
                <li key={moveNumber} >
                    <button
                        style={{background: moveNumber === this.state.stepNumber ? "red" : ""}}
                        onClick={() => this.jumpTo(moveNumber)}
                    >
                        {description}
                    </button>
                </li>
            )
        })

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
