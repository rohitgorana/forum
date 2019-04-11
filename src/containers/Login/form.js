import React from 'react'
import {connect} from 'react-redux' 
import {
    Form, Icon, Input, Button, Checkbox,
  } from 'antd';

import { LinkedIn } from 'react-linkedin-login-oauth2';
import { authUser } from '../../actions/user'

  class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }

    handleSuccess = (data) => {
      this.props.authUser(data.code)
    }
  
    handleFailure = (error) => {
      console.log(error)
    }
  
    render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            {/* <a className="login-form-forgot" href="#" style={{float: 'right'}}>Forgot password</a> */}
            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
              Log in
            </Button>
            <div style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
              <span>Or</span>
              <LinkedIn
                clientId="81096mtku35m2j"
                onFailure={this.handleFailure}
                onSuccess={this.handleSuccess}
                redirectUri= {process.env.REACT_APP_ROOT + "linkedin"}
                state = 'skjfalsd'
                scope = 'r_liteprofile r_emailaddress r_basicprofile'
              >
              </LinkedIn>
            </div>
          </Form.Item>
         
        </Form>
      );
    }
  }
  
  const mapDispatchToProps = (dispatch) => ({
    authUser : (code) => {dispatch(authUser(code))}
  })

export default connect(null, mapDispatchToProps)(Form.create({ name: 'normal_login' })(NormalLoginForm))
  
  