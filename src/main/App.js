import React from 'react';

import Navbar from '../components/navbar'
import Rotas from '../main/rotas'

import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import 'toastr/build/toastr.min.js'

class App extends React.Component {
    
  render() {  
    return (
      <>
        <Navbar />        
        <div className="container">
          <Rotas />
        </div>   
      </>
    )
  }
  
}

export default App;
