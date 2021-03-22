import React from 'react'
import DynamicHeader from './dynamicHeader'
import { Row, Col } from 'antd';

const Home = () => {
    return (
        <div>
            <Row  justify='center' style={{alignItems: "center"}}>
                <Col xs={18} sm={12} md={10} lg={8} >
                    <DynamicHeader />
                </Col>
            </Row>
        </div>
    )
}

export default Home