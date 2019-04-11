import React from 'react'
import {connect} from 'react-redux' 
import {
    Form, Input, Button,  Select, Card
  } from 'antd';

import { authUser, signup } from '../actions/user'
import Axios from 'axios';
import styled from 'styled-components';


const SemiText = styled.h2`
    color: #00daff;
    font-size : 1.8em;
    font-weight: 500;
    margin-bottom: 30px;
`

const { Option } = Select;
  class NormalLoginForm extends React.Component {

    constructor(props){
      super(props)
      this.state = {
        username: {
          status: null,
          feedback: false
        }

      }
    }

    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.signup(values)
        } 
      });
    }

    handleUsername = (e) => {

      this.setState({username:{status: 'validating', feedback: true}})
      var params = new URLSearchParams();
      let token = localStorage.getItem('token');
      params.append('access_token', token)
      Axios.post(process.env.REACT_APP_API + 'api/user/check_username/'+e.target.value, params).then(({data}) => {
        console.log(data)
        if(data.code === 1){
          this.setState({username: {...this.state.username, status: 'warning'}})
        } else{
          this.setState({username : {...this.state.username, status: 'success'}})
        }
      })
    }

    render() {
      const { getFieldDecorator } = this.props.form;
      const { isMobile } = this.props;
      const {username} = this.state;
      return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '60px 0'} }>
            <SemiText >Just a few details to get you started.</SemiText>
            <Card style={{width: isMobile? '100%': 600}}>
            
              <Form onSubmit={this.handleSubmit} className="login-form" layout="vertical">
                <Form.Item label="Username" hasFeedback={username.feedback} validateStatus={username.status} help={username.status === 'warning'?"Username already exists":null}>
                  {getFieldDecorator('username', {
                    rules: [{ required: true, message: 'Please enter a username.' }],
                  })(
                    <Input placeholder="Username" onChange={this.handleUsername}/>
                  )}
                </Form.Item>

                <Form.Item label="College">
                  {getFieldDecorator('college', {
                    rules: [{ required: true, message: 'College name is required.' }],
                  })(
                    <Input placeholder="College Name" />
                  )}
                </Form.Item>
                
                <Form.Item
                  label="Case Interview Experience"
                >
                  {getFieldDecorator('experience', {
                    rules: [
                      { required: true, message: 'Please select one option!' }, 
                    ],
                  })(
                    <Select placeholder="Your experience in case interviews">
                      <Option value="Pro">Pro</Option>
                      <Option value="Medium">Medium</Option>
                      <Option value="Rookie">Rookie</Option>
                    </Select>
                  )}
                </Form.Item>

                <Form.Item
                  label="Preparing For"
                >
                  {getFieldDecorator('companies', {
                    rules: [
                      { required: true, message: 'Please select one option!' }, 
                    ],
                  })(
                    <Select placeholder="Type of companies you are preparing for">
                      <Option value="Tire 1 consulting">Tire 1 Consulting</Option>
                      <Option value="Tire 2 consulting">Tire 2 Consulting</Option>
                      <Option value="Product Companies">Product Companies</Option>
                    </Select>
                  )}
                </Form.Item>

                <Form.Item label="Short Bio">
                  {getFieldDecorator('bio', {
                    rules: [{ required: true, message: 'Please provide a short bio.' }],
                  })(
                    <Input.TextArea placeholder="Bio" />
                  )}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" disabled={username.status==='success'? false: true}>Continue</Button>
                </Form.Item>
              </Form>
            </Card>
        </div>
      );
    }
  }
  
  const mapDispatchToProps = (dispatch) => ({
    authUser : (code) => {dispatch(authUser(code))},
    signup : (data) => {dispatch(signup(data))}
  })


export default connect(null, mapDispatchToProps)(Form.create({ name: 'normal_login' })(NormalLoginForm))
  
  