import React from 'react'
import {connect} from 'react-redux' 
import { Card, Row, Col } from 'antd';
import coverImg from '../../images/cover-alt.jpeg'
import styled from 'styled-components';
import LoginForm from './form'


const Background = styled.div`
    background : url(${coverImg});
    width: 100%;
    height: 100vh;
    filter: brightness(50%)
`

const Overlay = styled.div`
    display: flex;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    align-items: center;
`
const MegaText = styled.h1`
    color: white;
    font-size: 4.5em;
    margin-bottom:15px;
`

const SemiText = styled.h2`
    color: #00daff;
    font-size : 2.5em;
    font-weight: 500;
`

const LoginText = styled.h3`
    font-size: 2em;
    text-align: center;
    color: #7d7d7d;
    font-weight: 700;
`


class Login extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            password : '',
            showPassword: false
        }
    }


    render(){
        const {isMobile} = this.props
        return (
            <React.Fragment>
                <Background/>
                <Overlay>
                    <Row type="flex" justify="space-between" style={{width: '100%'}}>
                        { !isMobile && (<Col span={12}  style={{display: 'flex', justifyContent: 'center'}}>
                            <div>
                                <MegaText>CASE LADDR</MegaText>
                                <SemiText>Get into Consulting.</SemiText>
                            </div>
                        </Col>)}
                        <Col span={isMobile?24: 8} offset={isMobile?0: 4}>
                            <Card style={{width: isMobile?'100%': 400, padding: 20}}>
                                <LoginText>Login</LoginText>
                                <LoginForm/>
                            </Card>
                        </Col>
                    </Row>
                </Overlay>
            </React.Fragment>
            

        )
    }

}


const mapDispatchToProps = (dispatch) =>({
   
})

const mapStateToProps = (state) => ({
    isMobile : state.isMobile
})
export default connect(mapStateToProps, mapDispatchToProps)(Login)
