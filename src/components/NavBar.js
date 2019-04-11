import React, { Component, useState } from 'react'
import {Link, withRouter} from 'react-router-dom'

export const NavItem = withRouter(function(props){
    const [hover, setHover] = useState(false)
    
    return (
        <Link to={props.to}>
            <div style={{color: hover || props.location.pathname === props.to?'#fff': '#f4f4f4', fontFamily: 'din-round, sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: 0.8, cursor: 'pointer', marginRight: '8px 15px'}} 
                onMouseOver={()=>{setHover(true)}} 
                onMouseOut={()=>{setHover(false)}}
            >
                <div style={{borderRadius: 20, padding: '5px 15px'}}>
                  <div style={{borderBottom: hover || props.location.pathname === props.to? '2px solid #fff': '2px solid #1cb0f6', borderTop: '6px solid #1cb0f6', lineHeight: '17px'}}>
                    <span>{props.children}</span>
                  </div>
                </div>
            </div>
        </Link>
    )
})

export class NavBar extends Component {
  render() {
    return (
      <div style={{display: 'flex', alignItems:'center', margin: '0 30px'}}>
        {this.props.children}
      </div>
    )
  }
}



export default NavBar
