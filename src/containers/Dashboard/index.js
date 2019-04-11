import React from 'react'
import {connect} from 'react-redux'
import {Menu, Icon } from 'antd'
import Meetings from './Meetings'
import Invitations from './Invitations';
import Header from '../../components/Header'


class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            current: 'meetings',
        }
    }

    handleClick = (e) => {
        this.setState({
          current: e.key,
        });
    }

    render(){
        const {current} = this.state
        const {isMobile} = this.props
        return (
            <React.Fragment>
                <Header/>
                <Menu
                    onClick={this.handleClick}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    theme="dark"
                >
                    <Menu.Item key="meetings">
                        <Icon type="schedule" />My Meetings
                    </Menu.Item>
                    <Menu.Item key="invitation">
                        <Icon type="mail" />Invitations
                    </Menu.Item>
                    <Menu.Item key="analytics">
                        <Icon type="bar-chart" />Analytics
                    </Menu.Item>
                    
                </Menu>
                <div style={{display:'flex', 'justifyContent': 'center', background: '#f7f7f7'}}>
                    <div style={{width: isMobile?'100%':'70%'}}>
                        {current === 'meetings' && <Meetings/>}
                        {current === 'invitation' && <Invitations/>}
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

const mapDispatchToProps = () =>({

})

const mapStateToProps = (state) => ({
    isMobile : state.isMobile,
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
