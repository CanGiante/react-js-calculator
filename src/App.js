import React, { useState } from "react";
import reactDom from 'react-dom';
import './App.css';
import iconDel from './icons8-backspace-60.png';

function App() {

  const initialValue = '0';
  const [input, setInput] = useState(initialValue);
  const splittedCurrentInput = input.split(/\+|-|\*|\//);

  const appendJustOneDotPerNumber = (e) => {

    const inputPiece = splittedCurrentInput[splittedCurrentInput.length - 1];

    if (inputPiece === '') {
      return;

    } else if (!inputPiece.includes('.')) {
      setInput(input + e.target.value);

    } else { return; }
  }

  const handleOperation = (e) => {

    const currentValue = e.target.value;
    const lastChar = input.slice(-1);

    if (lastChar === '' || lastChar === '.') {
      return;

    } else if (lastChar === '+' || lastChar === '*' || lastChar === '/') {

      if (currentValue === '-') {
        return setInput(input + currentValue);

      } else {
        return setInput(removeLastChars(input, 1) + currentValue);
      }

    } else if (lastChar === '-') {

      const lastNumber = parseFloat(splittedCurrentInput[splittedCurrentInput.length - 2]);

      if (isNaN(lastNumber)) {
        // if input ends with two consecutive operators remove the two last chars and replace with currentValue
        return setInput(removeLastChars(input, 2) + currentValue);

      } else {
        // else remove only one char
        return setInput(removeLastChars(input, 1) + currentValue);
      }

    } else {
      return setInput(input + currentValue);
    }
  }
  
  const handleNumpadClick = (e) => {
    const currentValue = e.target.value;
    const last2Chars = input.slice(-2);
    
    if (input === '0') {
      return setInput(removeLastChars(input, 1) + currentValue);
    } else if ( currentValue && (last2Chars === '+0' || last2Chars === '-0' || last2Chars === '*0' || last2Chars === '/0')) {
      return;
    } else {
      setInput(input + currentValue);
    }
  }

  const numbers = [];
  [
    { id: 'one', value: 1 },
    { id: 'two', value: 2 },
    { id: 'three', value: 3 },
    { id: 'four', value: 4 },
    { id: 'five', value: 5 },
    { id: 'six', value: 6 },
    { id: 'seven', value: 7 },
    { id: 'eight', value: 8 },
    { id: 'nine', value: 9 },
    { id: 'zero', value: 0 }

  ].forEach((number) => {
    numbers.push(
      <button
        onClick={(e) => handleNumpadClick(e)}
        value={number.value}
        key={number.id}
        id={number.id}

      > {String(number.value)} </button>
    );
  });

  return (
    <div className="wrapper">
      <div className="calculator">

        <div id='display' className="show-input">{input}</div>

        <div className="digits">

          {/* start numpad */}

            {numbers}

          {/* end numpad */}

          {/* dot btn */}
          <button
            onClick={(e) => appendJustOneDotPerNumber(e)}
            id="decimal"
            value={'.'}
          > . </button>

        </div>

        <div className="modifiers subgrid">

          {/* backspace */}
          <button id='backspace'
            onClick={() => setInput(removeLastChars(input, 1))}
          > <img src={iconDel} className="icon-del"/> </button>

          {/* clear all */}
          <button id='clear' 
            onClick={() => setInput(initialValue)}
          > AC </button>

        </div>

        <div className="operations subgrid">

          {/* equals btn */}
          <button
            id="equals"
            value="="
            onClick={() => {
              try {
                // eslint-disable-next-line
                input ? setInput(String(eval(input))) : setInput(initialValue);

              } catch (e) {
                console.log(e);
              }
            }}

          > = </button>

          {/* plus button */}
          <button id="add" onClick={(e) => handleOperation(e)} value="+">
            +
          </button>

          {/* minus btn */}
          <button id="subtract" onClick={(e) => handleOperation(e)} value="-">
            -
          </button>

          {/* asterisk btn */}
          <button id="multiply" onClick={(e) => handleOperation(e)} value="*">
            *
          </button>

          {/* slash btn */}
          <button id="divide" onClick={(e) => handleOperation(e)} value="/">
            /
          </button>

        </div>
      </div>
    </div>
  );
}

//___HELPERS___ //
function removeLastChars(str, charsAmountToRemove) {
  return str.substr(0, str.length - charsAmountToRemove);
};

export default App;