import React, { Component } from "react";
import {connect} from 'react-redux'
import { withRouter} from 'react-router-dom'
import {checkAuth} from '../actions/user'
import Login from './Login'

class EnsureAuth extends Component{
    constructor(props){
        super(props)
        this.state = {
            loading: true
        }
    }
    componentWillMount(){
        this.props.checkAuth().then(data => {
            this.setState({loading: false})
        })
    }

    render(){
        const {auth} = this.props;
        return (
            this.state.loading === false? 
            auth.loggedIn || this.props.location.pathname === '/linkedin' ? this.props.children: <Login/>:
            null
        )
    }
}

const mapDispatchToProps = (dispatch) =>({
    checkAuth : () => dispatch(checkAuth())
})

const mapStateToProps = (state) => ({
    auth : state.auth
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EnsureAuth));