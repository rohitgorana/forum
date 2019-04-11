import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import { Link} from 'react-router-dom'
import Header from '../../components/Header'
import SignUpForm from '../../components/SignUpForm'
import {Row, Col, Card, Icon, Statistic} from 'antd'
import {fetchProfile} from '../../actions/user'
import FeatureCard from './FeatureCard'

const Picture = styled.img`
    position: absolute;
    top: 90px;
    box-sizing: border-box;
    border: 11px solid #fff;
    box-shadow: 0px 3px 20px 0px #888888;
    max-height: 200px;
    border-radius: 5px;
`

const RoundedRectangle = styled.div`
    border-radius: 5px;
    background: #fff;
    padding: 10px;
    min-width: 120px;
    margin-right: 10px;
    width: ${props => {console.log(props); return props.isMobile?'45%': 'auto'}};
    margin-bottom: 10px;
`


class Home extends React.Component{
    state = {
        loading : false
    }

    componentDidMount(){
        this.props.fetchProfile().then(data => {
            this.setState({loading: false})
        })
    }

    render(){

        const {signup, user, isMobile} = this.props
        return (
            <React.Fragment>
                <Header/>
                {/* {!signup.completed? <SignUpForm/>:
                    <div>
                        <div style={{display:'flex', 'justifyContent': 'center', background: 'linear-gradient(90deg, #3ad4cb, #50b76a)', padding: '5px 0'}}>
                            
                            <Row type="flex" style={{flexDirection: isMobile? 'column': 'row', minWidth: isMobile?0:700}} justify='center' align='middle'>
                                {isMobile? null:
                                <div>
                                    <Picture src={user.picture} /> 
                                </div>}

                                <div style={{marginLeft: isMobile?0: 200, padding: '0 20px'}}>
                                {this.state.loading? null:
                                    <div style={{  display: 'flex', flexDirection: 'column', alignItems: isMobile? 'center': 'start', paddingTop: 20, color: '#fff'}}>
                                        <div style={{fontSize: '1.4em'}}>
                                            <span>{user.name}</span>
                                        </div>
                                        <div style={{fontSize: '1.1em'}}> 
                                            <Icon type="read"/> <span>{user.college}</span>
                                        </div>
                                        <div style={{fontSize: '1.1em'}}> 
                                            <Icon type="star"/> <span>{user.preparing_for}</span>
                                        </div>
                                        <Row type="flex" justify='center' style={{marginTop: 10}}>
                                            <RoundedRectangle isMobile={isMobile}>
                                                <Statistic title="Meetings Done" value={0} />
                                            </RoundedRectangle>
                                            <RoundedRectangle isMobile={isMobile}>
                                                <Statistic title="XP" value={95} />
                                            </RoundedRectangle>
                                            <RoundedRectangle isMobile={isMobile}>
                                                <Statistic title="Reliability" value={'70%'} />
                                            </RoundedRectangle>
                                            <RoundedRectangle isMobile={isMobile}>
                                                <Statistic title="Recommendation Rate" value={'80%'} />
                                            </RoundedRectangle>
                                        </Row>
                                        
                                    </div>}

                                </div>
                            

                            </Row> 
                            
                        </div>
                        
                        
                        <div style={{margin: '0 auto', padding: 10,marginTop: 60, maxWidth: isMobile? '100%': '60%'}}>
                            <Row gutter={32} type='flex' justify='center'>
                                <Col span={12}>
                                    <Link to='/leaderboard'>
                                        <FeatureCard colorIndex={0} icon='trophy'>
                                            <h3>Leaderboard</h3>
                                        </FeatureCard> 
                                    </Link>
                                </Col>
                                <Col span={12}>
                                    <Link to='/dashboard'>
                                        <FeatureCard colorIndex={2} icon='dashboard'>
                                            <h3>Meeting Dashboard</h3>
                                        </FeatureCard> 
                                    </Link>
                                </Col>
                                <Col span={12}>
                                    <Link to='/resources'>
                                        <FeatureCard colorIndex={1} icon='read'>
                                            <h3>Resources</h3>
                                        </FeatureCard> 
                                    </Link>
                                </Col>
                                <Col span={12}>
                                    <Link to='/forum'>
                                        <FeatureCard colorIndex={3} icon='message'>
                                            <h3>Discussion Forum</h3>
                                        </FeatureCard> 
                                    </Link>
                                </Col>
                                
                                
                            
                            
                            </Row>                        
                        </div>
                    
                        
                        
                    
                    </div>  
        
                } */}
            </React.Fragment>
        )
    }

}

const mapDispatchToProps = (dispatch) =>({
    fetchProfile : () => dispatch(fetchProfile())
})

const mapStateToProps = (state) => ({
    isMobile : state.isMobile,
    signup: state.signup,
    user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
