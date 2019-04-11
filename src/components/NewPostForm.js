import React from 'react'
import {connect} from 'react-redux'
import { Form , Button, Input, message} from 'antd'
import TagGroup from './TagGroup'

import {postDiscussion, editDiscussion} from '../actions/discussion'

class NewPostForm extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            tags: ['caseladdr']
        }

        if(this.props.type === 'edit'){
            this.state.tags = this.props.post.tags.split(',');
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
            let discussion = Object.assign({}, values, {tags: this.state.tags.join(',')})
            if(this.props.type === 'edit'){
                this.props.editDiscussion(this.props.post.id, discussion).then(data => {
                    this.props.onCancel()
                })
            } else{
                this.props.postDiscussion(discussion).then(data => {
                    if(data.code === 1){
                        window.location = `/discussion/${data.id}`
                    } else{
                        message.warning('Something went wrong. Please try again')
                    }
                }) 
            }
          } 
        });
    }

    onTagsChange = (tags) => {
        this.setState({tags})
    }

    render(){

        const { getFieldDecorator } = this.props.form;
        const {type, post} = this.props
        console.log(this.props)
        return (
            <>
                <h1 style={{color: '#000000a6'}}>New Post</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item>
                        <TagGroup tags={this.state.tags} onChange={this.onTagsChange}/>
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('title', {
                            rules: [{ required: true, message: 'Please provide a title' }],
                            initialValue: type == 'edit'? post.title: ''
                        })(
                            <Input size='large' placeholder='Title' autoComplete='off' />
                            
                        )}
                    </Form.Item>
                    
                    <Form.Item >
                        {getFieldDecorator('content', {
                            rules: [{ required: true, message: 'Please provide some post content.' }],
                            initialValue: type == 'edit'? post.post: ''
                        })(
                            <Input.TextArea placeholder="Post Contents" autosize={{ minRows: 4, maxRows: 8 }} />
                            
                        )}
                    </Form.Item>
                
                    <Form.Item>
                        <Button
                            type="default"
                            shape='round'
                            size='large'
                            onClick={this.props.onCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            shape='round'
                            size='large'
                            style={{margin: 10}}
                        >
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </>  
        )
    }

}

const mapDispatchToProps = (dispatch) =>({
    postDiscussion : (discussion) => dispatch(postDiscussion(discussion)),
    editDiscussion : (id, discussion) => dispatch(editDiscussion(id, discussion))
})

const mapStateToProps = (state) => ({
    isMobile : state.isMobile,
})

export default connect(mapStateToProps, mapDispatchToProps)(Form.create({ name: 'new_post_form' })(NewPostForm))
