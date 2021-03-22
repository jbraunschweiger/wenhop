import React, {useState} from 'react'
import { Row, Col, Button, Input, Typography } from 'antd';
import {getRocketInfobox, getRocketTabs} from '../../wiki'
import RocketImage from './RocketImage'
import RocketInfobox from './RocketInfobox'
import RocketTabs from './RocketTabs'
import {useParams} from 'react-router-dom'

const { Search } = Input;

const Rocket = () => {
    let { name } = useParams() as any;
    console.log(name);
    return (
        <div>
            <Row  justify='center' style={{alignItems: "center"}}>
                <Col sm={24} md={16} lg={12} >
                    <Typography.Title level={1}>{name}</Typography.Title>
                </Col>
            </Row>
            <Row  justify='center' style={{alignItems: "center"}}>
                <Col sm={24} md={8} lg={6}>
                    <RocketImage rocketName={name}/>
                </Col>
                <Col sm={24} md={8} lg={6}>
                    <RocketInfobox rocketName={name}/>
                </Col>
            </Row>
            <Row  justify='center' style={{alignItems: "center"}}>
                <Col sm={24} md={16} lg={12} >
                    <RocketTabs rocketName={name}/>
                </Col>
            </Row>
        </div>
    )
}

export default Rocket

const searchStyles = {
    marginTop: 40
}