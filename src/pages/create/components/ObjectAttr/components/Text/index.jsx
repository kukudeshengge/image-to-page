import React, {useEffect, useState} from 'react';
import styles from './index.module.less';
import classNames from "classnames/bind";
import {InputNumber, Select, Tooltip} from "antd";
import PopoverColor from "../../../Attr/components/PopoverColor";
import {textFastHandleList, textFormatList} from "./config";
import {useFontList} from "./fetch";
import useChangeFontFamily from "../../../../hooks/useChangeFontFamily";
import {observer} from 'mobx-react-lite';
import {createStore} from "../../../../../../store/create";
import {useSetState} from "ahooks";
import useAttr from "../../../../hooks/useAttr";

const {Option} = Select
const cs = classNames.bind(styles)

const Text = () => {
    const {selectObjects} = createStore
    const [showFixType, setShowFixType] = useState(null)
    const [state, setState] = useSetState({
        fontFamily: undefined,
        fontSize: undefined,
        fill: '',
        opacity: '',
        fontWeight: '',
        fontStyle: '',
        underline: '',
        linethrough: ''
    })
    const {setAttr} = useAttr()
    const {data} = useFontList()
    const {runChange} = useChangeFontFamily()

    useEffect(() => {
        if (!selectObjects) return
        const activeObject = selectObjects[0]

        setState({
            fontFamily: activeObject.fontFamily === 'serif' ? undefined : activeObject.fontFamily,
            fontSize: activeObject.fontSize,
            fill: activeObject.fill,
            opacity: 100 - activeObject.opacity * 100,
            fontWeight: activeObject.fontWeight,
            fontStyle: activeObject.fontStyle,
            underline: activeObject.underline,
            linethrough: activeObject.linethrough,
            textAlign: activeObject.textAlign,
        })
    }, [selectObjects])

    const onClick = (e, item) => {
        e.stopPropagation()
        if (item.renderContent) {
            setShowFixType(prev => {
                return prev === item.type ? null : item.type
            })
            return
        }
        setShowFixType(null)
        console.log(item)
        switch (item.type) {
            case 'weight':
                const fontWeight = state.fontWeight === 'bold' || state.fontWeight > 500 ? 'normal' : 'bold'
                asyncEditAttr({fontWeight})
                break
            case 'italic':
                const fontStyle = state.fontStyle === 'normal' ? 'italic' : 'normal'
                asyncEditAttr({fontStyle})
                break
            case 'underline':
                asyncEditAttr({underline: !state.underline})
                break
            case 'linethrough':
                asyncEditAttr({linethrough: !state.linethrough})
                break
            case 'left':
                asyncEditAttr({textAlign: 'left'})
                break
            case 'justify-center':
                asyncEditAttr({textAlign: 'justify-center'})
                break
            case 'right':
                asyncEditAttr({textAlign: 'right'})
                break
            case 'clear':
                asyncEditAttr({
                    fontWeight: 'normal',
                    fontStyle: 'normal',
                    underline: false,
                    linethrough: false
                })
                break
            default:
                return false
        }
    }

    // 修改属性
    const asyncEditAttr = (value) => {
        setAttr(value)
        setState(value)
    }

    // 修改字体样式
    const onStyleChange = (e, options) => {
        runChange(options.otherOptions)
        setState({fontFamily: e})
    }

    // 修改字体size
    const onSizeChange = e => {
        asyncEditAttr({fontSize: e})
    }

    const onSizeClickChange = (type) => {
        let size = selectObjects[0].fontSize
        if (type === 'add') {
            size += 2
        } else {
            size = size - 2 < 10 ? 10 : size - 2
        }
        asyncEditAttr({fontSize: size})
    }

    // 颜色
    const onColorChange = e => {
        const fill = e.hex
        asyncEditAttr({fill})
    }

    // 标题
    const onSetTitleChange = item => {
        asyncEditAttr(item.style)
    }

    // 透明度
    const onOpacityChange = e => {
        setAttr({opacity: 1 - e / 100})
        setState({opacity: e})
    }

    const getFastHandleActive = (item) => {
        switch (item.type) {
            case 'weight':
                return state.fontWeight > 500 || state.fontWeight === 'bold'
            case 'italic':
                return state.fontStyle === 'italic'
            case 'underline':
                return state.underline
            case 'linethrough':
                return state.linethrough
            case 'left':
                return state.textAlign === 'left'
            case 'justify-center':
                return state.textAlign === 'justify-center'
            case 'right':
                return state.textAlign === 'right'
            default:
                return false
        }
    }

    return (
        <div className={cs('text-attr')}>
            <div className={cs('item-wrap')}>
                <div className={cs('title')}>字体样式</div>
                <Select
                    value={state.fontFamily}
                    onChange={onStyleChange}
                    className={cs('select-style')}
                    placeholder='请选择'
                >
                    {
                        data.map(item => {
                            return <Option key={item.key} otherOptions={item} value={item.key}>
                                <span>{item.fontlibName}</span>
                            </Option>
                        })
                    }
                </Select>
            </div>
            <div className={cs('item-wrap')}>
                <div className={cs('title')}>字号</div>
                <div className={cs('size')}>
                    <Select
                        value={state.fontSize}
                        onChange={onSizeChange}
                        className={cs('select-size')}
                        placeholder={'请选择'}
                    >
                        <Option value={10}>10px</Option>
                        <Option value={12}>12px</Option>
                        <Option value={14}>14px</Option>
                        <Option value={16}>16px</Option>
                        <Option value={18}>18px</Option>
                        <Option value={20}>20px</Option>
                        <Option value={22}>22px</Option>
                        <Option value={24}>24px</Option>
                    </Select>
                    <span onClick={() => onSizeClickChange('add')} className={cs('add-size-btn')}>
                        <img src="https://ossprod.jrdaimao.com/file/1722846354324978.svg" alt=""/>
                    </span>
                    <span onClick={() => onSizeClickChange('minus')}>
                        <img src="https://ossprod.jrdaimao.com/file/1722846367110765.svg" alt=""/>
                    </span>
                </div>
            </div>
            <div className={cs('item-wrap')}>
                <div className={cs('title')}>文字颜色</div>
                <PopoverColor color={state.fill} onChange={onColorChange} placement={'left'}>
                    <div className={cs('color-wrap')}>
                        <div style={{background: state.fill}} className={cs('color-view')}/>
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
                            onClick={() => onSetTitleChange(item)}
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
                        const active = getFastHandleActive(item)
                        return <div
                            onClick={(e) => onClick(e, item)}
                            key={item.type}
                            className={cs('fast-handle-item')}
                        >
                            <Tooltip title={item.title} placement={"top"}>
                                <img src={active ? item.selectImage : item.image} alt=""/>
                            </Tooltip>
                            {
                                item.renderContent && showFixType === item.type ?
                                    <div className={cs('fast-handle-item-wrap')}>
                                        {item.renderContent({onClick, getFastHandleActive})}
                                    </div> : null
                            }
                        </div>
                    })
                }
            </div>
            <div className={cs('item-wrap')}>
                <div className={cs('title')}>透明度</div>
                <InputNumber
                    value={state.opacity}
                    onChange={onOpacityChange}
                    min={0}
                    max={100}
                    style={{width: 165}}
                    addonAfter='%'
                />
            </div>
        </div>
    );
};

export default observer(Text);
