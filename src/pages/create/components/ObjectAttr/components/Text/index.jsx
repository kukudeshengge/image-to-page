import React, {useEffect, useState} from 'react';
import styles from './index.module.less';
import classNames from "classnames/bind";
import {InputNumber, Select, Tooltip} from "antd";
import PopoverColor from "../../../Attr/components/PopoverColor";
import {textFastHandleList, textFormatList} from "./config";
import {useFontList} from "./fetch";
import useChangeFontFamily from "../../../../hooks/useChangeFontFamily";
import {observer} from 'mobx-react-lite';

const {Option} = Select
const cs = classNames.bind(styles)

const Text = () => {
    const [showFixType, setShowFixType] = useState(null)
    const {data} = useFontList()
    const {runChange} = useChangeFontFamily()


    useEffect(() => {

    },[])

    const onClick = (e, item) => {
        e.stopPropagation()
        if (item.renderContent) {
            setShowFixType(prev => {
                return prev === item.type ? null : item.type
            })
            return
        }
        console.log(item)
    }

    const onStyleChange = (e, options) => {
        runChange(options.otherOptions)
    }

    return (
        <div className={cs('text-attr')}>
            <div className={cs('item-wrap')}>
                <div className={cs('title')}>字体样式</div>
                <Select onChange={onStyleChange} className={cs('select-style')} placeholder='请选择'>
                    {
                        data.map(item => {
                            return <Option otherOptions={item} value={item.key}>
                                <span>{item.fontlibName}</span>
                            </Option>
                        })
                    }
                </Select>
            </div>
            <div className={cs('item-wrap')}>
                <div className={cs('title')}>字号</div>
                <div className={cs('size')}>
                    <Select placeholder={'请选择'} className={cs('select-size')}>
                        <Option value={12}>12px</Option>
                        <Option value={14}>14px</Option>
                        <Option value={16}>16px</Option>
                        <Option value={18}>18px</Option>
                        <Option value={20}>20px</Option>
                        <Option value={22}>22px</Option>
                        <Option value={24}>24px</Option>
                    </Select>
                    <span className={cs('add-size-btn')}>
                        <img src="https://ossprod.jrdaimao.com/file/1722846354324978.svg" alt=""/>
                    </span>
                    <span>
                        <img src="https://ossprod.jrdaimao.com/file/1722846367110765.svg" alt=""/>
                    </span>
                </div>
            </div>
            <div className={cs('item-wrap')}>
                <div className={cs('title')}>文字颜色</div>
                <PopoverColor color={'#eeeeee'} placement={'left'}>
                    <div className={cs('color-wrap')}>
                        <div className={cs('color-view')}/>
                        <div className={cs('color-icon')}>
                            <img src="https://ossprod.jrdaimao.com/file/1722847203274287.svg" alt=""/>
                        </div>
                    </div>
                </PopoverColor>
            </div>
            <div className={cs('item-wrap', 'text-format-wrap')}>
                {
                    textFormatList.map(item => {
                        return <span
                            style={item.style}
                            key={item.id}
                        >
                        {item.title}
                        </span>
                    })
                }
            </div>
            <div className={cs('item-wrap', 'fast-handle-wrap')}>
                {
                    textFastHandleList.map(item => {
                        return <div
                            onClick={(e) => onClick(e, item)}
                            key={item.type}
                            className={cs('fast-handle-item')}
                        >
                            <Tooltip title={item.title} placement={"top"}>
                                <img src={item.image} alt=""/>
                            </Tooltip>
                            {
                                item.renderContent && showFixType === item.type ?
                                    <div className={cs('fast-handle-item-wrap')}>
                                        {item.renderContent()}
                                    </div> : null
                            }
                        </div>
                    })
                }
            </div>
            <div className={cs('item-wrap')}>
                <div className={cs('text-title')}>透明度</div>
                <InputNumber min={0} max={100} style={{width: 165}} addonAfter='%'/>
            </div>
        </div>
    );
};

export default observer(Text);
