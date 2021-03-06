import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

var turn = 0

function Square(props) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

function calculateWinner(squares) {
    const winningPositions = [
        [0, 1, 2],      // horizontal wins
        [3, 4, 5], 
        [6, 7, 8], 
        [0, 3, 6],      // vertical wins (transpose of horizontal wins matrix)
        [1, 4, 7], 
        [2, 5, 8], 
        [0, 4, 8],      // diagonal wins 
        [2, 4, 6]
    ];

    for (let line of winningPositions)
    {   
        if (squares[line[0]] && squares[line[0]] === squares[line[1]] && squares[line[1]] === squares[line[2]])
        {
            return squares[line[0]];
        }
    }
}

class Board extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
        };
    }

    handleClick(i) {
        const squares = this.state.squares.slice();

        if (calculateWinner(squares) || squares[i])
        {
            return;
        }

        if (squares[i] == null) {

            squares[i] = (turn % 2 === 0 ? 'X' : 'O');

            turn++;

        }
        

        this.setState({squares: squares});
    }
    
    renderSquare(i) {
        return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)} />;
    }

    render() {

        const winner = calculateWinner(this.state.squares);

        let status;

        if (winner)
        {
            status = 'Winner: ' + winner;
        }

        else
        {
            status = 'Next Player: ' + (turn % 2 === 0 ? 'X': 'O');
        }

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ============================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);