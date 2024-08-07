import React, {useEffect, useState} from 'react';
import styles from './index.module.less';
import classNames from "classnames/bind";
import {Button, Checkbox, InputNumber, Tooltip} from "antd";
import {observer} from 'mobx-react-lite'
import {createStore} from "../../../../../../store/create";

const cs = classNames.bind(styles)

const Animation = () => {
    const {selectObjects,workspace} = createStore
    const [animationList, setAnimationList] = useState([])

    useEffect(() => {
        const activeObject = selectObjects[0]
        setAnimationList(activeObject.animateList)
    }, [selectObjects])

    const onChange = (key, value, id) => {
        console.log(id)
        setAnimationList(prevState => {
            const item = prevState.find(item => item.id === id)
            if (!item) return prevState
            item[key] = value
            return [...prevState]
        })
    }

    const previewAnimation = item => {
        workspace.animation.carryAnimations(item)
    }

    return (<div className={cs('animation')}>
        <div className={cs('add-buttons')}>
            <Button type="primary">添加动画</Button>
            <Button>预览动画</Button>
        </div>
        <div className={cs('animation-list')}>
            {
                animationList.map((item, index) => {
                    return <div key={item.id} className={cs('animation-item')}>
                        <div className={cs('animation-item-title')}>
                            <div>
                                <span>动画{index + 1}</span>
                                <span>
                                <i>{item.name}</i>
                                <img src="https://ossprod.jrdaimao.com/file/1722415726616437.svg" alt=""/>
                                <img src="https://ossprod.jrdaimao.com/file/172241573319047.svg" alt=""/>
                            </span>
                            </div>
                            <div>
                                <Tooltip title="预览" placement="top">
                                <span onClick={() => previewAnimation(item)}>
                                    <img src="https://ossprod.jrdaimao.com/file/1722416383496609.svg" alt=""/>
                                    <img src="https://ossprod.jrdaimao.com/file/1722416372157351.svg" alt=""/>
                                </span>
                                </Tooltip>
                                <Tooltip title="删除" placement="top">
                                <span>
                                    <img src="https://ossprod.jrdaimao.com/file/1722416589947825.svg" alt=""/>
                                    <img src="https://ossprod.jrdaimao.com/file/1722416599451846.svg" alt=""/>
                                </span>
                                </Tooltip>
                            </div>
                        </div>
                        <div className={styles.inputItem}>
                            <div>
                                <span>时间</span>
                                <InputNumber
                                    value={item.time}
                                    onChange={(e) => onChange('time', e, item.id)}
                                    addonAfter="S"
                                    controls={false}
                                />
                            </div>
                            <div>
                                <span>延迟</span>
                                <InputNumber
                                    value={item.delay}
                                    onChange={(e) => onChange('delay', e, item.id)}
                                    addonAfter="S"
                                    controls={false}
                                />
                            </div>
                        </div>
                        <div className={styles.inputItem}>
                            <div>
                                <span>次数</span>
                                <InputNumber
                                    value={item.count}
                                    onChange={(e) => onChange('count', e, item.id)}
                                    addonAfter="次"
                                    controls={false}
                                />
                            </div>
                            <div
                                className={cs('loop-button')}
                                onClick={() => onChange('loop', !item.loop, item.id)}
                            >
                                <Checkbox checked={item.loop}>循环播放</Checkbox>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    </div>);
};

export default observer(Animation);
