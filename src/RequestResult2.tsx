import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryFunction,
    QueryKey,
    UseQueryResult,
  } from '@tanstack/react-query'

interface Person {
    count: number,
    name: string,
    age: number,
  }
  
interface RequestResultInputProps {
name: string;
}
  /*
export default function RequestResultInput ({name}:RequestResultInputProps) {
    console.log('name',name);

    const { status, error, data} = useQuery<Person, Error>({ ///}: UseQueryResult<Person, Error>
        queryKey: ['person', name], 
        queryFn: () =>{
            
            },
        enabled: !!name,
      });



    if (status === "pending") {
        return <button>Cancel</button>;
    }
  
    if (status === "error"){
      console.log(error?.message);
      return(
        <span>error?.message</span>
      )
    }
  
    return(
      <div>
        <p>Возраст</p>
        <p> {data?.age} </p>
      </div>
    )
}*/

type Params = {
    queryKey: [string, { name: string }];
  };


interface PromiseWithCancel<T> extends Promise<T> {
cancel: () => void;
}

async function getCharacter(params: Params) {
    const [, {name}] = params.queryKey;
    const controller = new AbortController();
    const signal = controller.signal;
    const promise = new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`https://api.agify.io/?name=${name}`, {
          method: "get",
          signal,
        });
        if (!response.ok) {
          reject(new Error("Problem fetching data"));
        }
        const data = await response.json();
        //assertIsCharacter(data);
        resolve(data);

      } catch (ex: unknown) {
        if (isAbortError(ex)) {
          reject(new Error("Request cancelled"));
        }
      }
    });

    (promise as PromiseWithCancel<Person>).cancel = () => {
      controller.abort();
    };
    return promise; //as PromiseWithCancel<Person| symbol | QueryFunction<Person, QueryKey, never> | undefined>;
  }

function isAbortError(error: any): error is DOMException {
    if (error && error.name === "AbortError") {
        return true;
    }
    return false;
}
  



  function assertIsCharacter(character: any): asserts character is Person {
    if (!("age" in character)) {
      throw new Error("Not character");
    }
  }