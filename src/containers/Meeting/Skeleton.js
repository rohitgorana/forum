import React from 'react'
import {Row, Col, Skeleton} from 'antd'

export default function MySkeleton(props){
    return (
        <Row>
            <Col span={15}>
                
                <React.Fragment>
                    <Skeleton active title={false} paragraph={{rows: 2}}/>
                    <Skeleton active title={false} paragraph={{rows: 4}}/>
                </React.Fragment>

            </Col>
            <Col span={9}>
                
                <React.Fragment>
                    <Skeleton active title={false} paragraph={{rows: 4}}/>
                    <Skeleton active title={false} paragraph={{rows: 3}}/>
                </React.Fragment>
                
            </Col>
        </Row>
    )
}