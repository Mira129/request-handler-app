import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import './App.css';
import FirstRequestComponent from "./FirstRequestComponent";
import SecondRequestComponent from "./SecondRequestComponent";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="App">
      <FirstRequestComponent/>
      <QueryClientProvider client={queryClient}>
        <SecondRequestComponent queryClient={queryClient}/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
