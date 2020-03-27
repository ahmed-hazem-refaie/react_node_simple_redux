import React from 'react'

class Header extends React.Component {
    state = {  }
    render() { 
        return ( 

<nav className="navbar navbar-expand-lg navbar-light bg-success">
  <a className="navbar-brand" href="/LogIn">LogIn</a>

   <a className="navbar-brand" href="/admin/profile">Home Admin</a>
  
    <a className="navbar-brand" href="/speaker/profile?_id=<%= locals.id %> ">Home speaker</a>
   
    <a className="navbar-brand" href="/logout">LogOut</a>
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
   
        <li className="nav-item">
          <a className="nav-link" href="/event/list">event list</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/speaker/list">speaker list</a>
        </li>
        <li className="nav-item">
          <a  className="nav-link
          
       
         
        
           float-none" href="/event/add">addevent</a>
        </li>
        <li  style={{'position': 'absolute', 'right': '7%'}} className="float-right nav-item mr-auto">
      
      
      
        </li>
      </ul>
    </div>
  </nav>

        );
    }
}
 
export default Header;