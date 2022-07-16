import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RoutesApp from './routes'
       
//

function App() {
  return (
    <div className='App' >
      <ToastContainer autoClose={3000}/>
      <RoutesApp/>

    </div>
  );
}

export default App;
