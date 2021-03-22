import React, {useEffect, useState} from 'react'
import Firebase, {withFirebase} from '../../firebase'
import {getRocketTabs} from '../../wiki'
import { Typography, Tabs, Skeleton } from 'antd';

const { TabPane } = Tabs;

type RocketTabsProps = {
    firebase: Firebase,
    rocketName: string
}

const RocketTabs = (props: RocketTabsProps) => {
    const [data, setData] = useState<{
        title: string;
        content: string;
        items: any[];
    }[] | null>(null);
    useEffect(() => {
        if(props.firebase) {
            getRocketTabs(props.rocketName).then((data) => setData(data));
        }
    }, [props.firebase, props.rocketName])

    const ignoredHeadings = ['See also', 'References', 'Bibliography', 'External links']
    const filteredData = (data ? data.filter((value)=>{
        if(ignoredHeadings.includes(value.title)) {
            return false
        } 
        if (value.content === '') {
            return false
        }
        return true
    }) : [])
    return (
        <Tabs defaultActiveKey="0" onChange={()=>console.log("poop")}>
            { filteredData 
                ? filteredData.map((tab, index) => 
                    <TabPane tab={tab.title} key={index}>
                        {tab.content}
                        {tab.items && tab.items.map((item, index) => 
                            <div key={index}>
                                <Typography.Title level={4} style={headerStyles}>{item.title}</Typography.Title>
                                <Typography.Text>{item.content}</Typography.Text>
                            </div>
                        )}
                    </TabPane>
                )
                : <TabPane tab="Loading" key={'loading'} disabled> 
                    <Skeleton />
                </TabPane>
            }
        </Tabs>
    )
}

export default withFirebase(RocketTabs)

const headerStyles = {
    marginTop: 10
}