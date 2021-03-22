import {useState} from 'react'
import DynamicHeader from './dynamicHeader'
import { Row, Col, Input } from 'antd';
import {getRocketInfobox} from '../../wiki'

const { Search } = Input;

const Home = () => {
    const [rocketName, setRocketName] = useState("")
    return (
        <div>
            <Row  justify='center' style={{alignItems: "center"}}>
                <Col xs={20} sm={12} md={10} lg={8} >
                    <DynamicHeader />
                    <Search
                        placeholder="Rocket"
                        enterButton="Test"
                        size="large"
                        onSearch={()=>{
                            getRocketInfobox(rocketName).then((response) => console.log(response))
                        }}
                        onChange={(e)=>{
                            setRocketName(e.target.value)
                        }}
                        style={searchStyles}
                        />
                </Col>
            </Row>
        </div>
    )
}

export default Home

const searchStyles = {
    marginTop: 40
}