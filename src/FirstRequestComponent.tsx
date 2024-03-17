import React,  { useState, useRef, useEffect } from "react";
const URL = 'https://catfact.ninja/fact'

interface Fact {
    fact: string,
    length: number,
  }

export default function FirstRequestComponent () {
    const [value, setValue] = useState("");
    const inputRef = useRef() as React.RefObject<HTMLInputElement>; //RefObject<HTMLInputElement> |
    
    useEffect(() =>{
      let arrayOfStrings = value.split(' ');
      let shift = arrayOfStrings[0].length;
      inputRef.current?.setSelectionRange(shift, shift);
      inputRef.current?.focus();
      console.log(inputRef.current);
    }, [value]);
  
    const handleSubmit = () => {
      fetch(URL)
      .then((res) => res.json() as Promise<Fact>)
      .then((data) => {
        if ((data === undefined) || (data === null)){
            throw new Error("Ошибка в полученных данных");
        } else {
            setValue(data.fact);
        }
      })
      .catch((err) => {
          console.log(`Ошибка передачи данных: ${err}`);
          setValue("Ошибка в полученных данных");
      })
    };
  
    return(
      <div className="request-container">
        <p>Запрос к https://catfact.ninja/fact</p>
        <button type="button" onClick={handleSubmit}>
          Отправить
        </button>
        <input
          className="request-input"
          type="text"
          placeholder="Здесь будет факт про кошек"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          ref={inputRef}
        />
      </div>
    )
  }