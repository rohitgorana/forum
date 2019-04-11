import React from 'react'
import {connect} from 'react-redux'
import { Form , DatePicker, Button, TimePicker, Select, message} from 'antd'
import {fetchCases} from '../../actions/cases'
import {addMeeting} from '../../actions/meeting'
import { Exception } from 'handlebars';

const Option = Select.Option




class MeetingForm extends React.Component{

    constructor(props){
        super(props)
        this.state ={
            loading : false
        }
    }

    componentDidMount(){
        this.props.fetchCases();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            this.setState({loading: true})
            
            this.props.addMeeting(values).then((data) => {
                console.log(data)
                if(data.code === 1){
                    this.props.form.resetFields();
                    this.setState({loading: false})
                    message.success('Meeting proposal has been sent.')
                }
            }).catch(error => {
                this.setState({loading: false})
                message.error('Something went wrong. Please try again.');
            })
      
          } 
        });
    }

    render(){

        const {cases, isMobile} = this.props
        const { getFieldDecorator } = this.props.form;
        return (
            
            <Form style={{display: 'flex', flexDirection: isMobile?'column': 'row', justifyContent:'space-between'}} layout="inline" onSubmit={this.handleSubmit}>
                <Form.Item label="Language">
                    {getFieldDecorator('language', {
                        rules: [{ required: true, message: 'Please select an option' }],
                    })(
                        <Select
                            placeholder="Select a Language"
                            style={{width: 180}}
                        >
                            <Option value='english'>English</Option>
                        </Select>
                        
                    )}
                </Form.Item>
                <Form.Item label="Case">
                    {getFieldDecorator('case', {
                        rules: [{ required: true, message: 'Please select an option' }],
                    })(
                        <Select
                            showSearch
                            placeholder="Select a case"
                            style={{width: 180}}
                            optionFilterProp="case"
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {cases.map( caseItem => (
                                <Option key={caseItem.id} value={caseItem.id}>{caseItem.title}</Option>
                            ))}
                        </Select>
                    )}
                </Form.Item>
                <Form.Item label="Date">
                    {getFieldDecorator('date', {
                        rules: [{ required: true, message: 'Pick a Date' }],
                    })(
                        <DatePicker/>
                    )}
                </Form.Item>
                <Form.Item label="Time">
                    {getFieldDecorator('time', {
                        rules: [{ required: true, message: 'Pick a Time' }],
                    })(
                        <TimePicker use12Hours format="h:mm a"  />
                    )}
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        loading = {this.state.loading}
                    >
                        Submit
                    </Button>
                </Form.Item>
            </Form>

        )
    }

}

const mapDispatchToProps = (dispatch) =>({
    fetchCases : () => {dispatch(fetchCases())},
    addMeeting: (details) => {return dispatch(addMeeting(details))}
})

const mapStateToProps = (state) => ({
    isMobile : state.isMobile,
    cases: state.cases,
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'meeting_form' })(MeetingForm))
