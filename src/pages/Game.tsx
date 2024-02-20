import React, {useEffect, useRef} from 'react';
import {CANVAS_HEIGHT_DEFAULT, CANVAS_WIDTH_DEFAULT} from "../game/constants";
import {ProcessContent} from "../game/mainCanvas";
import '../styles/Game.css';

const Game: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        console.log("canvasRef", canvasRef);
        console.log("canvasRef.current", canvasRef.current);
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = CANVAS_WIDTH_DEFAULT;
            canvas.height = CANVAS_HEIGHT_DEFAULT;
            ProcessContent().then((r) => console.log(`CANVAS INITIALIZATION DONE: ${r}`));
        }
    }, []);
    return (
        <div className="main-content">
            <div className="game">
                <h1>Welcome to David Liang's Game</h1>
                <main className="main">
                    <canvas ref={canvasRef} id="canvas" width="1280" height="640"></canvas>
                </main>
            </div>
        </div>
    );
}

            export default Game;