import React, {useEffect, useState} from 'react'
import Firebase, {withFirebase} from '../../firebase'
import {IPrototype} from '../../types'
import {getPrototypes} from '../../controllers/prototypes'
import { Typography, Skeleton } from 'antd';

type DynamicHeaderProps = {
    firebase: Firebase
}

const DynamicHeader = (props: DynamicHeaderProps) => {
    const [prototypes, setPototypes] = useState<IPrototype[]>([]);
    useEffect(() => {
        if(props.firebase) {
            getPrototypes(props.firebase).then((prototypes) => setPototypes(prototypes));
        }
    }, [])

    const getText = (prototype: IPrototype) => {
        if(!prototype) {
            return ''
        }
        var text = prototype.name
        if (prototype.staticFire && prototype.flight) {
            const now = new Date()
            const staticFire = prototype.staticFire.toDate()
            const flight = prototype.flight.toDate()
            const staticFireComplete = staticFire < now
            const flightComplete = flight < now
            if(flightComplete) {
                text += " completed its test flight on "
            } else {
                text += " is scheduled for a test flight on "
            }
            const flightString = flight.toDateString()
            text += flightString.substring(0, flightString.length-5)
            if(staticFireComplete) {
                text += " after a successful static fire on "
            } else {
                text += " depending on results of the static fire on "
            }
            const staticFireString = staticFire.toDateString()
            text += staticFireString.substring(0, staticFireString.length-5)
        } else if(prototype.staticFire) {
            text += " is awaiting FAA clearance for launch pending results of the static fire on "
            text += prototype.staticFire
        } else {
            text += " is awaiting FAA clearance for testing"
        }
        text = text + '.'
        return text
    }

    return (
        <Typography style={{textAlign: 'center'}}>
            <Typography.Title level={1} style={headerStyles}>
                Wenhop?
            </Typography.Title>
            <Typography.Title level={1} style={emojiStyles}>
                🚀
            </Typography.Title>
            { prototypes ?
                <Typography.Title level={1} style={titleStyles}>
                    {getText(prototypes[0])}
                </Typography.Title>
                :
                <Skeleton active />
            }
        </Typography>
    )
}

export default withFirebase(DynamicHeader)

const headerStyles = {
    fontSize: 75,
    marginTop: 30,
    marginBottom: 30
}

const emojiStyles = {
    fontSize: 100,
    marginTop: 40,
    marginBottom: 40
}

const titleStyles = {
    fontFamily: "Poppins"
}