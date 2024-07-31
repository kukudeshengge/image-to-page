import React from 'react';
import styles from './index.module.less';
import classNames from "classnames/bind";
import {Button, Checkbox, InputNumber, Tooltip} from "antd";

const cs = classNames.bind(styles)

const Animation = () => {
    return (<div className={cs('animation')}>
        <div className={cs('add-buttons')}>
            <Button type="primary">添加动画</Button>
            <Button>预览动画</Button>
        </div>
        <div className={cs('animation-list')}>
            {
                [1, 2].map((item, index) => {
                    return <div key={index} className={cs('animation-item')}>
                        <div className={cs('animation-item-title')}>
                            <div>
                                <span>动画{index+1}</span>
                                <span>
                                <i>旋转</i>
                                <img src="https://ossprod.jrdaimao.com/file/1722415726616437.svg" alt=""/>
                                <img src="https://ossprod.jrdaimao.com/file/172241573319047.svg" alt=""/>
                            </span>
                            </div>
                            <div>
                                <Tooltip title="预览" placement="top">
                                <span>
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
                                <InputNumber addonAfter="S" controls={false}/>
                            </div>
                            <div>
                                <span>延迟</span>
                                <InputNumber addonAfter="S" controls={false}/>
                            </div>
                        </div>
                        <div className={styles.inputItem}>
                            <div>
                                <span>次数</span>
                                <InputNumber addonAfter="次" controls={false}/>
                            </div>
                            <div className={cs('loop-button')}>
                                <Checkbox>循环播放</Checkbox>
                            </div>
                        </div>
                    </div>
                })
            }
        </div>
    </div>);
};

export default Animation;
