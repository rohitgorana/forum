import React, { Component } from 'react'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import {Row, Col, Tabs, Button, Input, List, Avatar} from 'antd'
import NewPostForm from '../../components/NewPostForm'
import { fetchDiscussions, searchDiscussion} from '../../actions/discussion'
import DiscussionList from './DiscussionList'

const {TabPane} = Tabs



export class Forum extends Component {

    constructor(props){
        super(props)
        this.state = {
            formHidden : true,
            loading: true,
            searching: false
        }
    }

    componentDidMount(){
        this.props.fetchDiscussions('popular').then(data => {
            this.setState({loading : false})
        })
    }

    togglePostForm = () => {
        this.setState({formHidden: !this.state.formHidden})
    }

    handleTabChange = (key) => {
        this.setState({loading : true})
        this.props.fetchDiscussions(key).then(data => {
            this.setState({loading : false})
        })
    }

    searchDiscussion = (e) => {
        const key = e.target.value;
        if(key === ''){
            this.setState({searching:false})
        } else {
            this.setState({loading: true, searching: true})
            this.props.searchDiscussion(key).then(data => {
                this.setState({loading: false})
            })
        }
    }


  render() {
    const {isMobile} = this.props
    const NewPostButton = <Button
            size='large'
            onClick={this.togglePostForm}
            style={{background: '#78c800', borderRadius: 15, borderBottom: '5px solid #58a700', fontWeight: 700, fontSize: 16, color: '#fff'}}
        >
            NEW POST
        </Button>

    return (
        <div>
            <Header/>
            <div style={{display:'flex', 'justifyContent': 'center', background: '#fdfdfd', padding: '40px 10px'}}>
                    <div style={{width: isMobile?'100%':'70%'}}>
                        <Row gutter={64}>
                            <Col xs={24} sm={24} md={17} lg={17}>
                              
                                   {this.state.formHidden && !this.state.searching && <>
                                        <h1 style={{color: '#000000a6'}}>Discussions</h1>

                                        <Tabs tabBarExtraContent={NewPostButton} size='large' animated={false} tabBarStyle={{fontWeight: 700}} onChange={this.handleTabChange}>
                                            <TabPane tab="POPULAR" key="popular">
                                                <DiscussionList data={this.props.discussions.popular} filter="popular"/>
                                            </TabPane>
                                            <TabPane tab="NEW" key="new">
                                                <DiscussionList data={this.props.discussions.new} filter="new"/>
                                            </TabPane>
                                            <TabPane tab="TOP ALL TIME" key="top">
                                                <DiscussionList data={this.props.discussions.top} filter="top"/>
                                            </TabPane>
                                            <TabPane tab="FOLLOWING" key="following">
                                                <DiscussionList data={this.props.discussions.following} filter="following"/>
                                            </TabPane>
                                        </Tabs>
                                    </>}

                                    {
                                        !this.state.formHidden && !this.state.searching && <NewPostForm onCancel={this.togglePostForm}/>
                                    }

                                    {
                                        this.state.searching && <>
                   
                                            <h1 style={{color: '#000000a6'}}>Discussions</h1>
                                            {
                                                !this.state.loading && <>
                                                    <p>{this.props.discussions.search.length} results</p>
                                                    <DiscussionList data={this.props.discussions.search} filter="search"/>
                                                </>
                                            }
                                        </>
                                    }
                                
                             
                            </Col>
                            <Col xs={24} sm={24} md={7} lg={7}>
                                <Input
                                    placeholder="search"
                                    size="large"
                                    onPressEnter={this.searchDiscussion}
                                    allowClear
                                    onChange={this.searchDiscussion}
                                    className='design-input'
                                />
                            </Col>
                        </Row>
                    </div>
                </div>
        </div>
    )
  }
}

const mapStateToProps = state => ({
  isMobile : state.isMobile,
  discussions: state.discussions
})

const mapDispatchToProps = dispatch =>  ({
  fetchDiscussions : (filter) => dispatch(fetchDiscussions(filter)),
  searchDiscussion : (key) => dispatch(searchDiscussion(key)),
  
})

export default connect(mapStateToProps, mapDispatchToProps)(Forum)
