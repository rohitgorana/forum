import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'
import {Row, Col} from 'antd'

const TabSelector = styled.div`
    font-size: 14px;
    padding: 10px 20px;
    text-align: center;
    background: ${props => props.active? '#1890ff': '#001529'};
    color: #fff;
    border-left: 1px solid #616161;
    cursor: pointer;
`

export class Tab extends React.Component{
    render(){
        return this.props.children || null
    }
}


class Tabs extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            tabNames: []
        }
    }



    componentWillMount(){
        let {children} = this.props
        if(children !== undefined){
            if(Array.isArray(children)){
                let names = children.map(child => child.props.title);
                this.setState({
                  tabNames : names,
                })
            } else{
                this.setState({
                    tabNames : [children.props.title],
                })
            }
        }
    }

    render(){
        const {tabNames} =  this.state
        const {current} = this.props
        return (
            <React.Fragment>
                <Row>
                    {tabNames.map(title => (
                        <Col key={title} span={8}>
                            <TabSelector active={current === title} onClick={() => this.props.handleTabChange(title)}>{title}</TabSelector>
                        </Col>
                    ))}
                </Row>
                <Row>
                    {Array.isArray(this.props.children)? 
                        this.props.children.filter(child => child.props.title === current)
                        : this.props.children
                    }
                </Row>
            </React.Fragment>
        )
    }

}

Tabs.propTypes = {
    children: function (props, propName, componentName) {
        const prop = props[propName]
    
        let error = null
        React.Children.forEach(prop, function (child) {
          if (child.type !== Tab) {
            error = new Error('`' + componentName + '` children should be of type Tab.');
          }
        })
        return error
    }
}

const mapDispatchToProps = () =>({

})

const mapStateToProps = (state) => ({
    isMobile : state.isMobile,
})

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)
