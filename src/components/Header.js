import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import { Row, Col, Dropdown, Menu, Avatar, Icon, Popover } from 'antd';
import {logout} from '../actions/user'
import Navbar, { NavItem } from './NavBar'
import BellIcon from '../images/icons/juicy-bell.svg'
import LingotIcon from '../images/icons/juicy-lingot.svg'
import StreakIcon from '../images/icons/juicy-streak.svg'

class Header extends React.Component{
    state = {
        menuVisible: false,
    };



    logout = () => {
        console.log('Logging out')
        this.props.logout();
    }

    handleShowMenu = () => {
        this.setState({menuVisible: !this.state.menuVisible})
    }



    render(){

        const menuMode = this.props.isMobile? 'inline' : 'horizontal'
        const {user, isMobile} = this.props
        const dropdown = (
            <Menu style={{minWidth: 120}}>
              <Menu.Item key="0">
                <Link to={`/profile`}>Profile</Link>
              </Menu.Item>
              <Menu.Item key="1">
                <a href="#" onClick={this.logout}>Logout</a>
              </Menu.Item>
            </Menu>
        );
        const menu = (
            <Menu mode={menuMode} id="nav" key="nav" selectedKeys={['dashboard']}>
              <Menu.Item key="dashboard">
                <Link to='/dashboard'>Meetings</Link>
              </Menu.Item>
              <Menu.Item key="resources">
                <Link to='/resources'>Resources</Link>
              </Menu.Item>
              <Menu.Item key="forum">
                  <Link to='/forum'>Forum</Link>
              </Menu.Item>
              <Menu.Item key="leaderboard">
                  <Link to='/leaderboard'>Leaderboard</Link>
              </Menu.Item>
            </Menu>
          );
      

        return (
            <div id="header" className="header">
                

                <Row type='flex' justify='space-between' style={{width: isMobile? 'auto': '70%', minWidth: isMobile? 'auto': 1080, margin: '0 auto'}}>
                    <div>
                        <Row type='flex'>
                            <div id="logo" to="/">
                                <Link to={`/`}>
                                    <div style={{display: 'flex', alignItems: 'center', height: '100%'}}>
                                        <span style={{fontSize: 32, fontFamily: 'Nordique Pro Bold', color: '#fff'}}>forum</span>
                                    </div>
                                </Link>
                            
                            </div>
                            
                            {/* {menuMode === 'inline' ? null: 
                            <Navbar>
                                <NavItem to='/dashboard'>MEETINGS</NavItem>
                                <NavItem to='/resources'>RESOURCES</NavItem>
                                <NavItem to='/forum'>FORUM</NavItem>
                                <NavItem to='/leaderboard'>LEADERBOARD</NavItem>
                            </Navbar>} */}
                        </Row>
                    </div>
                    <div style={{paddingRight: 10}}>
                        <Row type='flex'>
                            <div style={{height: 70, display: 'flex', alignItems: 'center', color: '#fff', fontFamily: 'din-round, sans-serif', fontWeight: 600, fontSize: 15}}>
                                
                                <Dropdown overlay={dropdown} trigger={['click']} placement="bottomRight">
                                    <div style={{display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                        {/* <span style={{fontSize: '1.1em', marginRight: 10, fontWeight: 600}}>Rohit Gorana</span> */}
                                        <Avatar size={40} src={user.picture} style={{border : '2px solid hsla(0,0%,90%,.5)'}}/>
                                        {!isMobile && <div style={{margin: '0 5px'}}>{user.name}</div>}
                                        {!isMobile && <Icon type='down' style={{fontSize: 14}}/>}
                                    </div>
                                </Dropdown>
                                {!isMobile && <div style={{marginLeft: 20, display: 'flex'}}>
                                    <div style={{margin: '0 5px', display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                        <img src={StreakIcon}/>
                                        <span style={{fontSize: 16}}>0</span>
                                    </div>
                                    <div style={{margin: '0 5px', display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                        <img src={LingotIcon}/>
                                        <span style={{fontSize: 16}}>0</span>
                                    </div>
                                    <div style={{margin: '0 5px', display: 'flex', alignItems: 'center', cursor: 'pointer'}}>
                                        <img src={BellIcon}/>
                                        <span style={{fontSize: 16}}>0</span>
                                    </div>
                                </div>}
                                {/* {menuMode === 'inline' ? (

                                    <Popover
                                        overlayClassName="popover-menu"
                                        placement="bottomRight"
                                        content={menu}
                                        trigger="click"
                                        visible={this.state.menuVisible}
                                        arrowPointAtCenter
                                    >
                                        <Icon
                                        className="nav-phone-icon"
                                        type="menu"
                                        onClick={this.handleShowMenu}
                                        style={{fontSize: '1.5em', marginLeft: 10, color: '#fff'}}
                                        />
                                    </Popover>
                                ) : null} */}

                            
                            
                            </div>
                            
                        </Row>
                    </div>
                </Row>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) =>({
    logout : () => {dispatch(logout())}
})

const mapStateToProps = (state) => ({
    isMobile : state.isMobile,
    signup: state.signup,
    user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)