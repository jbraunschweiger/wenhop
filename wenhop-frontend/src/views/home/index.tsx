import React from 'react'
import DynamicHeader from './dynamicHeader'
import { Row, Col } from 'antd';

const Home = () => {
    return (
        <div>
            <Row  justify='center' style={{alignItems: "center"}}>
                <Col span={8} >
                    <DynamicHeader />
                </Col>
            </Row>
        </div>
    )
}

export default Home