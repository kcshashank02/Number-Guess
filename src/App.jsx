import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [target] = useState(Math.floor(Math.random() * 10) + 1);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [guessesLeft, setGuessesLeft] = useState(3);  // **New state to track guesses left**

  const checkGuess = () => {
    if (guessesLeft === 0) return;  // If no guesses are left, do nothing

    if (parseInt(guess) === target) {
      setMessage('Congrats!!! You guessed Correct');
      setGuessesLeft(0);  // End game if correct guess
    } else {
      setGuessesLeft(guessesLeft - 1);
      setMessage(
        guessesLeft - 1 > 0
          ? guess > target
            ? 'Too high'
            : 'Too low'
          : `Game over! The correct number was ${target}.`
      );
    }
    setGuess('');
  };

  // **Auto reload after 3 guesses**
  useEffect(() => {
    if (guessesLeft === 0) {
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }, [guessesLeft]);

  return (
    <>
      <div>
        <h1>Guess The Number Game</h1>
        <p>Guess a number between 1 to 10</p>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)} required
          disabled={guessesLeft === 0}  // Disable input when no guesses left
        />
        <br />
        <br />
        <button onClick={checkGuess} disabled={guessesLeft === 0 || guess === ''}>Check</button>  {/* Disable button when no guesses left */}
        <p>{message}</p>
        <p>Guesses Left: {guessesLeft}</p>  {/* Show remaining guesses */}
      </div>
    </>
  );
}

export default App;
