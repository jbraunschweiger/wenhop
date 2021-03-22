import {useEffect, useState} from 'react'
import Firebase, {withFirebase} from '../../firebase'
import {getRocketImage} from '../../wiki'
import { Button, Image, Row } from 'antd';
import { LinkOutlined } from '@ant-design/icons'

type RocketImageProps = {
    firebase: Firebase,
    rocketName: string
}

const RocketImage = (props: RocketImageProps) => {
    const [url, setUrl] = useState<any | null>(null);
    useEffect(() => {
        if(props.firebase) {
            getRocketImage(props.rocketName).then((url) => setUrl(url));
        }
    }, [props.firebase, props.rocketName])

    return (
        <div>
            <Row>
                <Image width={"100%"} src={url} style={imageStyles}/>
            </Row>
            <Row justify='end'>
                <Button type="primary" href={url} icon={<LinkOutlined style={iconStyles} />} size='middle' style={buttonStyles}>
                </Button>
            </Row>
        </div>
    )
}

export default withFirebase(RocketImage)

const imageStyles = {
    borderRadius: 3
}

const iconStyles = {
    marginLeft:2,
    marginBottom:2
}

const buttonStyles = {
    marginTop: 5,
}