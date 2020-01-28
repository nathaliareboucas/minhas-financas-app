import React from 'react';

import Navbar from '../components/navbar'
import Rotas from '../main/rotas'

import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'

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
