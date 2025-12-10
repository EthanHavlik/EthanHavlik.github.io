"use strict";

import { useState } from "react";
import "./App.css";

function Corner() {
    return (
        <div className="corner"></div>
    );
}

function Hline({currentColor, onHClick}) {
    const fullClass = "hline " + currentColor;

    return (
        <button className={fullClass} onClick={onHClick}></button>
    );
}

function Vline({currentColor, onVClick}) {
    const fullClass = "vline " + currentColor;

    return (
        <button className={fullClass} onClick={onVClick}></button>
    );
}

function Box({currentColor}) {
    const fullClass = "box " + currentColor;

    return (
        <div className={fullClass}></div>
    );
}

function LineRow({row, colors, onHClick}) {
    return (
        <div className="row">
            <Corner />
            <Hline currentColor={colors[0]} onHClick={() => onHClick(0, row)} />
            <Corner />
            <Hline currentColor={colors[1]} onHClick={() => onHClick(1, row)} />
            <Corner />
            <Hline currentColor={colors[2]} onHClick={() => onHClick(2, row)} />
            <Corner />
            <Hline currentColor={colors[3]} onHClick={() => onHClick(3, row)} />
            <Corner />
            <Hline currentColor={colors[4]} onHClick={() => onHClick(4, row)} />
            <Corner />
            <Hline currentColor={colors[5]} onHClick={() => onHClick(5, row)} />
            <Corner />
        </div>
    );
}

function BoxRow({row, lineColors, boxColors, onVClick}) {
    return (
        <div className="row">
            <Vline currentColor={lineColors[0]} onVClick={() => onVClick(0, row)} />
            <Box currentColor={boxColors[0]} />
            <Vline currentColor={lineColors[1]} onVClick={() => onVClick(1, row)} />
            <Box currentColor={boxColors[1]} />
            <Vline currentColor={lineColors[2]} onVClick={() => onVClick(2, row)} />
            <Box currentColor={boxColors[2]} />
            <Vline currentColor={lineColors[3]} onVClick={() => onVClick(3, row)} />
            <Box currentColor={boxColors[3]} />
            <Vline currentColor={lineColors[4]} onVClick={() => onVClick(4, row)} />
            <Box currentColor={boxColors[4]} />
            <Vline currentColor={lineColors[5]} onVClick={() => onVClick(5, row)} />
            <Box currentColor={boxColors[5]} />
            <Vline currentColor={lineColors[6]} onVClick={() => onVClick(6, row)} />
        </div>
    );
}

function Scoreboard({redPoints, bluePoints}) {
    return (
        <h3>Red: {redPoints} <span>|</span> Blue: {bluePoints}</h3>
    );
}

function App() {
    const [turn, setTurn] = useState("red");
    const [redPoints, setRedPoints] = useState(0);
    const [bluePoints, setBluePoints] = useState(0);
    const [goAgain, setGoAgain] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [hLineColors, setHLineColors] = useState([
        Array(6).fill("white"),
        Array(6).fill("white"),
        Array(6).fill("white"),
        Array(6).fill("white"),
        Array(6).fill("white")
    ]);
    const [vLineColors, setVLineColors] = useState([
        Array(7).fill("white"),
        Array(7).fill("white"),
        Array(7).fill("white"),
        Array(7).fill("white")
    ]);
    const [boxColors, setBoxColors] = useState([
        Array(6).fill("white"),
        Array(6).fill("white"),
        Array(6).fill("white"),
        Array(6).fill("white")
    ]);
    const [boxPoints, setBoxPoints] = useState([
        Array(6).fill(0),
        Array(6).fill(0),
        Array(6).fill(0),
        Array(6).fill(0)
    ]);

    function handleHClick(column, row) {
        if (hLineColors[row][column] !== "white" || gameOver) return;

        const newHLineColors = hLineColors.map(r => [...r]);
        const newBoxColors = boxColors.map(r => [...r]);
        const newBoxPoints = boxPoints.map(r => [...r]);
        let pointsScored = 0;

        newHLineColors[row][column] = turn;

        if (row !== 0) {
            newBoxPoints[row - 1][column]++;
            if (newBoxPoints[row - 1][column] === 4) {
                newBoxColors[row - 1][column] = turn;
                pointsScored++;
            }
        }
        
        if (row !== 4) {
            newBoxPoints[row][column]++;
            if (newBoxPoints[row][column] === 4) {
                newBoxColors[row][column] = turn;
                pointsScored++;
            }
        }
        
        setHLineColors(newHLineColors);
        setBoxPoints(newBoxPoints);
        setBoxColors(newBoxColors);
        
        if (pointsScored > 0) {
            turn === "red" 
                ? setRedPoints(redPoints + pointsScored) 
                : setBluePoints(bluePoints + pointsScored);
            setGoAgain(true);
        } else {
            setTurn(turn === "red" ? "blue" : "red");
            setGoAgain(false);
        }
    }

    function handleVClick(column, row) {
        if (vLineColors[row][column] !== "white" || gameOver) return;

        const newVLineColors = vLineColors.map(r => [...r]);
        const newBoxColors = boxColors.map(r => [...r]);
        const newBoxPoints = boxPoints.map(r => [...r]);
        let pointsScored = 0;

        newVLineColors[row][column] = turn;

        if (column !== 0) {
            newBoxPoints[row][column - 1]++;
            if (newBoxPoints[row][column - 1] === 4) {
                newBoxColors[row][column - 1] = turn;
                pointsScored++;
            }
        }
        
        if (column !== 6) {
            newBoxPoints[row][column]++;
            if (newBoxPoints[row][column] === 4) {
                newBoxColors[row][column] = turn;
                pointsScored++;
            }
        }
        
        setVLineColors(newVLineColors);
        setBoxPoints(newBoxPoints);
        setBoxColors(newBoxColors);
        
        if (pointsScored > 0) {
            turn === "red" 
                ? setRedPoints(redPoints + pointsScored) 
                : setBluePoints(bluePoints + pointsScored);
            setGoAgain(true);
        } else {
            setTurn(turn === "red" ? "blue" : "red");
            setGoAgain(false);
        }
    }

    const winner = calculateWinner(redPoints, bluePoints);
    let status;
    if (winner) {
        status = "Winner: " + winner;
        if (!gameOver) {
            setGameOver(true);
        }
    } else if (redPoints == 12 && bluePoints == 12) {
        status = "Tie";
        if (!gameOver) {
            setGameOver(true);
        }
    } else {
        status = "Current turn: " + turn;
    }

    return (
        <>
            <h1>Dots and Boxes</h1>
            <p>Take turns clicking on lines. When you complete a square on your turn, you get a point and take another turn. Your goal is 13 points. Refresh this page to reset.</p>
            <h2 className={gameOver ? turn : ""}>{status}</h2>
            <section>
                <LineRow row={0} colors={hLineColors[0]} onHClick={handleHClick} />
                <BoxRow row={0} lineColors={vLineColors[0]} boxColors={boxColors[0]} onVClick={handleVClick} />
                <LineRow row={1} colors={hLineColors[1]} onHClick={handleHClick} />
                <BoxRow row={1} lineColors={vLineColors[1]} boxColors={boxColors[1]} onVClick={handleVClick} />
                <LineRow row={2} colors={hLineColors[2]} onHClick={handleHClick} />
                <BoxRow row={2} lineColors={vLineColors[2]} boxColors={boxColors[2]} onVClick={handleVClick} />
                <LineRow row={3} colors={hLineColors[3]} onHClick={handleHClick} />
                <BoxRow row={3} lineColors={vLineColors[3]} boxColors={boxColors[3]} onVClick={handleVClick} />
                <LineRow row={4} colors={hLineColors[4]} onHClick={handleHClick} />
            </section>
            <Scoreboard redPoints={redPoints} bluePoints={bluePoints} />
        </>
    );
}

function calculateWinner(redPoints, bluePoints) {
    if (redPoints > 12) return "red";
    if (bluePoints > 12) return "blue";
    return null;
}

export default App;