import {
    useQuery,
    QueryClient,
    UseQueryResult,
  } from '@tanstack/react-query'

interface Person {
    count: number,
    name: string,
    age: number,
  }
  
interface RequestResultInputProps {
    name: string;
    queryClient: QueryClient;
}
  
export default function RequestResultInput ({name, queryClient}:RequestResultInputProps) {
    console.log('name',name);

    const { status, error, data}: UseQueryResult<Person, Error> = useQuery<Person, Error>({
        queryKey: ['person', name], 
        queryFn: async () => {
            const res = await fetch(`https://api.agify.io/?name=${name}`);
            return res.json();
            
        },
        enabled: !!name,
      });


    // if (status === "pending") {
    //     return <button >Cancel</button>;
    // }
  
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
}

