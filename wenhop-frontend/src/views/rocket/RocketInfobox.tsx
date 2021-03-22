import {useEffect, useState} from 'react'
import Firebase, {withFirebase} from '../../firebase'
import {getRocketInfobox} from '../../wiki'
import { Descriptions, Spin } from 'antd';

type RocketInfoboxProps = {
    firebase: Firebase,
    rocketName: string
}

const RocketInfobox = (props: RocketInfoboxProps) => {
    const [data, setData] = useState<any | null>(null);
    useEffect(() => {
        getRocketInfobox(props.rocketName).then((data) => {
            console.log("SETTING DATA ", data)
            setData(data)
        });
    }, [])

    var mappedData: any[] = [];
    if(data) {
        var tempData = {...data}
        delete tempData.image
        delete tempData.caption
        delete tempData.sp
        delete tempData.capacities
        mappedData = Object.entries(tempData)
        mappedData = (mappedData.length > 10 ? mappedData.slice(0,9) : mappedData)
    }
    console.log(mappedData)
    console.log(data)
    return (
        <div>
            { mappedData.length > 0 
                ? 
                    <Descriptions  bordered>
                        {mappedData.map((entry, value) =>{ 
                            return <Descriptions.Item span={24} key={entry[0]} label={entry[0]}>{entry[1]}</Descriptions.Item>
                        })}
                    </Descriptions>
                : <Spin />
            }
        </div>
    )
}

export default withFirebase(RocketInfobox)