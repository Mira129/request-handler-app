import { useForm } from "react-hook-form";
import  { useState, useEffect, useRef } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { QueryClient} from '@tanstack/react-query';
import RequestResultInput from "./RequestResult";
import { useDebouncedCallback } from 'use-debounce';

const schema = yup.object().shape({
    name: yup.string().matches(/^[aA-zZ\s]*$/, "Only english alphabets are allowed for this field ").required(),
  });

interface SecondRequestComponentProps {
    queryClient: QueryClient;
}

export default function SecondRequestComponent ({queryClient}: SecondRequestComponentProps) {
    const [name, setName] =  useState("");
    const [text, setText]  = useState('');
    const inputRef = useRef() as React.RefObject<HTMLButtonElement>;
    const debounced = useDebouncedCallback((value) => {
        if (value !== ""){
            setText(value);
        }
      }, 3000);

    useEffect (()=>{
        if (text !== ""){
            inputRef.current?.click();
            console.log("useEffect ",text);
        }
    }, [text])

    debounced("");
    
    const { 
      register, 
      handleSubmit,
      formState: { errors },  
    } = useForm({resolver: yupResolver(schema),});
  
    const onClickHandler = (data:{name: string}) => {  // data from input (name)
      console.log("onClickHandler",data);
      setName(data.name);
    };

    return (
      <div className="request-container">
        <form onSubmit={handleSubmit(onClickHandler)}>
          <h2>Определение возраста по имени</h2>
          <br />
          <input 
            {...register("name", {
                onChange: (event) => {debounced(event.target.value);},
            })} 
            placeholder="Введите имя" 
            type="text" 
            required
           
          />
          <br />
          <p>{errors.name?.message}</p>
          <br />
          <button type="submit" ref={inputRef} onClick={handleSubmit(onClickHandler)}>Искать</button>
        </form>
        <RequestResultInput name={name} queryClient={queryClient}/>
      </div>
    )
  }