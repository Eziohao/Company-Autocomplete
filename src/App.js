import React from 'react';
import logo from './logo.svg';
import './App.css';


class App extends React.Component {
  constructor(props){
   super(props);
   this.handleInput=this.handleInput.bind(this);
   this.state={searchName:'',company:''}; 
  }
  handleInput(event){
    let companyName=event.target.value;
    this.setState({searchName:companyName});
    fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${companyName}`)
    .then(res=>{
      if(res.ok){
        return res.json();
      }
      throw new Error(res.statusText)
    })
    .then(companies=>{
      this.setState({company:companies})
    })
    .catch(err=>{
      //console.log(err.message);
      this.setState({company:''})
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
     <ShowCompany companies={this.state.company}/>
    </header>
   
  </div> );
  }
}
 class ShowCompany extends React.Component{
   constructor(props){
     super(props);
   }
   render(){
     const companies=this.props.companies;
    if(companies){
      const listItems=companies.map((company)=>{
        return(
         <tr key={company.domain}>
         <td>{company.name}</td>
         <td><a href={company.domain} className="App-link">{company.domain}</a></td>
         <td><img src={company.logo} /></td>
       </tr>
        )
      })
      return(
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Domain</th>
              <th>Logo</th>
            </tr>
         {listItems}
          </tbody>
        </table>
      )
    }
   else{
     return('')
   }
  
   }
 }
 


export default App;
