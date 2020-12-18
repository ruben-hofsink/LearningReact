import React from "react";
import { Board } from "./Board";

export class Game extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            history: [{
                squares: Array(9).fill(null),
                moveList: [],
            }],
            winningLine: undefined,
            xIsNext: true,
            stepNumber: 0,
            ascendingMoveSort: true,
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

        if (this.calculateWinner() || squares[i]) {
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

    flipSortDirection = () => {

    }

    calculateWinner() {
        const { stepNumber } = this.state;
        const { squares } = this.state.history[stepNumber];

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

        const winningLine = lines.find(([a, b, c]) => squares[a] && squares[a] === squares[b] && squares[b] === squares[c])

        return winningLine ? squares[winningLine[0]] : null
    }

    render() {
        const { history } = this.state;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner();

        const moves = history.map((step, moveNumber) => {
            const row = Math.floor(step.moveList / 3);
            const column = step.moveList % 3;
            const description = moveNumber ?
                `Go to move #${moveNumber}, row: ${row}, col: ${column}` :
                'Go to game start';
            return (
                <li key={moveNumber}>
                    <button
                        style={{fontWeight: moveNumber === this.state.stepNumber ? "bold" : ""}}
                        onClick={() => this.jumpTo(moveNumber)}
                    >
                        {description}
                    </button>
                </li>
            )
        })

        if (!this.state.ascendingMoveSort) {
            moves.reverse();
        }


        const sortButton = <button
            onClick={this.flipSortDirection}
        >
            Switch sort
        </button>;

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
                    <div>
                        <button onClick={this.flipSortDirection}>
                            Switch sort
                        </button>
                    </div>
                    <ul>{moves}</ul>
                </div>
            </div>
        );
    }
}
