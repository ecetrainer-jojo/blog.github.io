import React, { useEffect, useRef } from 'react';
import { ProcessContent } from './game/mainCanvas';
import { CANVAS_WIDTH_DEFAULT, CANVAS_HEIGHT_DEFAULT } from './game/constants';
import './App.css';

const App: React.FC = () => {

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
        <div className="App">
            <header className="header">
                <h1>Welcome to David Liang's Blog</h1>
            </header>
            <main className="main">
                <canvas ref={canvasRef} id="canvas" width="1280" height="640"></canvas>
                <article>
                    <h2>Blog Post #1</h2>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </article>
                {/* Add More Articles Here */}
            </main>
            <footer className="footer">
                <p>&copy; 2023 David Liang</p>
            </footer>
        </div>
    );
}

export default App;