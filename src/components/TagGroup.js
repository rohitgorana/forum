import React, {Component} from 'react'
import {
    Tag, Input, Tooltip, Icon,
} from 'antd';
  
class EditableTagGroup extends Component {
    state = {
      inputVisible: false,
      inputValue: '',
    };
  
    handleClose = (removedTag) => {
      const tags = this.props.tags.filter(tag => tag !== removedTag);
      this.props.onChange(tags)
    }
  
    showInput = () => {
      this.setState({ inputVisible: true }, () => this.input.focus());
    }
  
    handleInputChange = (e) => {
      this.setState({ inputValue: e.target.value });
    }
  
    handleInputConfirm = () => {
      const { inputValue } = this.state;
      let { tags } = this.props;
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue.toLowerCase()];
      }
      this.setState({
        inputVisible: false,
        inputValue: '',
      });

      this.props.onChange(tags);
    }
  
    saveInputRef = input => this.input = input
  
    render() {
      const { inputVisible, inputValue } = this.state;
      const {tags} = this.props
      return (
        <div>
          {tags.map((tag, index) => {
            const isLongTag = tag.length > 20;
            const tagElem = (
              <Tag key={tag} closable={true} onClose={() => this.handleClose(tag)} style={{padding: 10, height: 'auto', fontSize: 16, borderRadius: 20}} >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </Tag>
            );
            return isLongTag ? <Tooltip title={tag} key={tag}>{tagElem}</Tooltip> : tagElem;
          })}
          {inputVisible && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="large"
              style={{ width: 78 }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )}
          {!inputVisible && (
            <Tag
              onClick={this.showInput}
              style={{ background: '#fff', borderStyle: 'dashed', padding: 10, height: 'auto', fontSize: 16, borderRadius: 20 } }
            >
              <Icon type="plus" /> New Tag
            </Tag>
          )}
        </div>
      );
    }
}

export default EditableTagGroup
  