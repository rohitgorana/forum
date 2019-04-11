import React, { Component } from 'react'
import {Card, Icon} from 'antd'
import styled from 'styled-components'
import Cover from '../../images/feature-cover.jpg'


const OverlayIcon = styled(Icon)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    text-align: center;

`


export class FeatureCard extends Component {
  render() {

    const hue = this.props.colorIndex != undefined? 90*this.props.colorIndex: 0;

    return (
      <div style={{marginBottom: 20}}>
        <Card hoverable cover={
            <div style={{position: 'relative'}}>
                <img src={Cover} style={{width: '100%', filter: `hue-rotate(${hue}deg)`}}/>
                <OverlayIcon type={this.props.icon} style={{fontSize: '3.5em', color: '#fff'}}/>
            </div>

        }>
            {this.props.children}
        </Card>
      </div>
    )
  }
}

export default FeatureCard
