import React from 'react';
import styles from './index.module.less';
import classNames from "classnames/bind";
import {triggeredList} from "./config";
import {observer} from "mobx-react-lite";
import {createStore} from "../../../../../../store/create";
import {Input} from "antd";

const cs = classNames.bind(styles)

const Handle = () => {
    const {canvas, pageList, objectTriggered} = createStore
    const activeObject = canvas?.getActiveObject() || {}
    const cache = objectTriggered[activeObject.id || ''] || {triggeredType: 0}

    const changeTriggered = item => {
        if (!activeObject || !activeObject.id) return
        createStore.objectTriggered = {
            [activeObject.id]: {
                title: item.title,
                triggeredType: item.value,
                type: item.type,
                inputProps: item.inputProps,
                value: null
            }
        }
    }

    const onChange = e => {
        const id = activeObject.id
        createStore.objectTriggered[id] = {
            ...createStore.objectTriggered[id],
            value: e.target.value
        }
    }

    return (
        <div className={styles.handle}>
            <div className={styles.handleList}>
                {
                    triggeredList.map(item => {
                        return <div
                            onClick={() => changeTriggered(item)}
                            className={cs({active: item.value === cache.triggeredType})}
                            key={item.value}
                        >
                            <img src={item.icon} alt=""/>
                            <img src={item.selectIcon} alt=""/>
                            <span>{item.title}</span>
                        </div>
                    })
                }
            </div>
            <div className={cs('content')}>
                {
                    cache.triggeredType ? <div className={cs('content-item')}>
                        <div className={cs('content-item-title')}>
                            <span>{cache.title}</span>
                        </div>
                        {
                            cache.type === 'input' ?
                                <Input
                                    ref={e => e?.focus()}
                                    value={cache.value}
                                    onChange={onChange}
                                    {...cache.inputProps}
                                /> :
                                cache.type === 'jumpPage' ?
                                    <div className={styles.pages}>
                                        {
                                            pageList.map((item, index) => {
                                                    return <span
                                                        className={cs({active: index === cache.value})}
                                                        key={item.id}
                                                        onClick={() => onChange({target: {value: index}})}
                                                    >
                                                        {index + 1}
                                                    </span>
                                                }
                                            )
                                        }
                                    </div> :
                                    null
                        }
                    </div> : null
                }
            </div>
        </div>
    );
};

export default observer(Handle);
