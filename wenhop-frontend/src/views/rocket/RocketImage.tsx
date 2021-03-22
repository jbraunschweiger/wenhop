import React, {useEffect, useState} from 'react'
import Firebase, {withFirebase} from '../../firebase'
import {IPrototype} from '../../types'
import {getRocketImage} from '../../wiki'
import { Typography, Descriptions, Spin, Image } from 'antd';

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
    }, [props.firebase])

    return (
        <Image width={"100%"} src={url} style={imageStyles}/>
    )
}

export default withFirebase(RocketImage)

const imageStyles = {
    padding: 0
}