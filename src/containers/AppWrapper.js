import { Component } from "react";
import {connect} from 'react-redux'
import { setScreen } from '../actions/environment';
import {  enquireScreen } from 'enquire-js'

class AppWrapper extends Component{

    componentDidMount(){
        enquireScreen((b) => {
            this.props.setScreen(!!b)
        });
    }

    render(){
        return (
            this.props.children
        )
    }
}

const mapDispatchToProps = (dispatch) =>({
    setScreen : (isMobile) => dispatch(setScreen(isMobile))
})

const mapStateToProps = (state) => ({
    isMobile : state.isMobile
})


export default connect(mapStateToProps, mapDispatchToProps)(AppWrapper);