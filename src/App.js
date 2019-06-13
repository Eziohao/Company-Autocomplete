import React from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {
  constructor(props){
   super(props);
   this.handleInput=this.handleInput.bind(this)
   this.state={searchName:''}; 
  }
  handleInput(event){
    let companyName=event.target.value;
    this.setState({searchName:companyName});
    fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${companyName}`)
    .then(res=>{
      if(res.ok){
        return res.blob();
      }
      throw new Error(res.statusText)
    })
    .then(companies=>{
      //console.log(companies);
      this.props.ShowCompany(companies);
    })
    .catch(err=>{
      //console.log(err.message);
      alert(err.message);
    })
  }
  render() { 
    return (  
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>What company do you want to search?</h2>
      <input type="text"  className="App-input" placeholder="Company name" onChange={this.handleInput}/>
      <p>Name:{this.state.searchName}</p>
    </header>
   
  </div> );
  }
}
 


export default App;
