import React from 'react';
import './App.css';
import Chessboard, {helpMethod} from './components/chessboard/chessboard';
import {ErrorBoundaries} from "./components/errorBoundaries";

function startGame() {
    window.location.reload();
}

function App() {
    return (
        <div id="app">
            <ErrorBoundaries>
                <Chessboard/>
                <div className="flex-container">
                    <div>
                        <button className= "submit" onClick={startGame}>Start Game</button>
                    </div>
                    <button className="help" type="submit" name="formBtn"
                            onClick={(event) => helpMethod( event)}>Help</button>
                </div>
            </ErrorBoundaries>
        </div>
    );
}

export default App;


