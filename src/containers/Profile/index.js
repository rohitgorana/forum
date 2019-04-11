import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import Header from '../../components/Header'
import { Card, Row, Col, Skeleton, Progress, Icon, Input, Switch, Button} from 'antd'
import {fetchProfile, updateProfile, fetchUserProfile} from '../../actions/user'

const Picture = styled.img`
  max-height: 200px;
  border-radius: 5px;
`

const SectionCard = styled(Card)`
    margin-bottom: 20px !important;
`

const Flex = styled.div`
    display : flex;
    flex-direction: ${props => props.column? 'column': 'row'}
    justify-content: ${props => props.justify? props.justify: 'start'}
    align-items: ${props => props.align? props.align: 'start'}
`

class Profile extends React.Component{
    state = {
        loading: true,
        editable : false,
        profile: {},
        editable: true
    }
    componentDidMount(){
        if(this.props.username !== undefined && this.props.username != this.props.user.username){
            this.props.fetchUserProfile(this.props.username).then(data => {
                this.setState({loading:false})
                if(data.code === 1){
                    this.setState({profile: data.profile, editable: false})
                }
            })
        } else {
            this.props.fetchProfile().then(data =>{
                this.setState({loading: false})
            });
        }
    }

    handleEditable = (editable) => {
        this.setState({editable})
    }

    handleSaveChanges = () => {
        this.props.updateProfile({bio: this.bio.value}).then(data => {
            this.setState({editable: false})
        })
    }


    render(){
        const {isMobile} = this.props
        const user = this.props.username?this.state.profile:this.props.user
        
        return (
            <React.Fragment>
                <Header/>
                <div style={{display:'flex', 'justifyContent': 'center', background: '#f7f7f7', padding: '40px 0'}}>
                    <div style={{width: isMobile?'100%':'70%'}}>
                        <Row gutter={32}>
                            <Col xs={24} sm={24} md={18} lg={18}>
                                <SectionCard>
                                    <Row gutter={32}>
                                        <Col xs={24} sm={24} md={6} style={{display: 'flex', justifyContent: isMobile? 'center': 'start'}} >
                                            <Picture src={user.picture} /> 
                                        </Col>
                                        <Col xs={24} sm={24} md={18}>
                                        {this.state.loading? <Skeleton active title={false} paragraph={{rows: 4}}/>:
                                            <div style={{ padding: '20px 40px', display: 'flex', flexDirection: 'column', alignItems: isMobile? 'center': 'start'}}>
                                                <p style={{fontSize: '1.7em'}}>{user.name}</p>
                                                <div style={{fontSize: '1.1em'}}> 
                                                    <p><strong>Username : </strong>{user.username}</p>
                                                    <p><strong>Email : </strong>{user.email}</p>
                                                    <p><strong>College : </strong>{user.college}</p>
                                                </div>
                                            </div>}
                                        </Col>
                                    </Row>                           
                                </SectionCard>
                                <SectionCard title="Details" extra={this.state.editable?null:<Flex><span style={{marginRight: 10 }}>Edit</span> <Switch checked={this.state.editable} onChange={this.handleEditable} /></Flex>}>
                                    <p style={{fontSize: '16px'}}><strong>Bio</strong></p>
                                    {this.state.editable === false? <p>{user.bio}</p>:
                                    <div>
                                        <Input.TextArea defaultValue={user.bio} ref={el => this.bio = el != null? el.textAreaRef: null} />
                                        <Button style={{marginTop: 10}} type="primary" onClick={this.handleSaveChanges}>Save</Button>
                                    </div>
                                    }
                                </SectionCard>
                            </Col>
                            <Col xs={24} sm={24} md={6} lg={6}>
                                <SectionCard>
                                    <Flex align ="center" column>
                                        <Progress type="circle" percent={0} />
                                        <p style={{margin: '10px 0'}}>Recommendation Rate</p>
                                    </Flex>
                                </SectionCard>

                                <SectionCard>
                                    <Flex align ="center" column>
                                        <p style={{fontSize: '2em'}}><Icon type="message" /> {0}</p>
                                        <p >Meetings Completed</p>
                                    </Flex>
                                </SectionCard>
                                <SectionCard>
                                    <Flex align ="center" column>
                                        <p style={{fontSize: '2em'}}>N/A</p>
                                        <p >Reliability</p>
                                    </Flex>
                                </SectionCard>
                                <SectionCard>
                                    <Flex align ="center" column>
                                        <p style={{fontSize: '2em'}}>{user.case_experience}</p>
                                        <p >Case Experience</p>
                                    </Flex>
                                </SectionCard>
                            </Col>
                        </Row>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

const mapDispatchToProps = (dispatch) =>({
    fetchProfile: () => dispatch(fetchProfile()),
    updateProfile: (data) => dispatch(updateProfile(data)),
    fetchUserProfile: (username) => dispatch(fetchUserProfile(username))
})

const mapStateToProps = (state) => ({
    isMobile : state.isMobile,
    user : state.user,
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
