import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import { EditElement } from './components/EditElement';
import { Home } from './components/Home';
import Navbar  from './components/Navbar';

import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (


    <div >
      <Router>
        < Navbar/>

         <Routes>
           <Route exact path="/" element={<Home />} />
         
           <Route path="/add" element={<EditElement /> } />

           <Route path="/edit/:id" element={<EditElement /> }  /> 
          
         </Routes>
           
        <Routes>
          

        </Routes>
      </Router>
      
      
    </div>
  );
}

export default App;
