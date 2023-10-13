import React, {useState} from 'react';
import {
    Button,
    Col,
    Form,
    Row,
    theme,
} from 'antd';
import {ColumnsConfig} from "./index";
import {CaretDownOutlined, CaretUpOutlined} from "@ant-design/icons";
import DynamicFormItem from "./DynamicFormItem";

const removeEmpty = (obj: any) => {
    const newObj: any = {};
    Object.keys(obj).forEach((key) => {
        if (obj[key] === Object(obj[key])) newObj[key] = removeEmpty(obj[key]);
        else if (obj[key] !== undefined && obj[key] !== null && obj[key] !== '') newObj[key] = obj[key].trim();
    });
    return newObj;
};

const SearchForm: React.FC<{
    onSearch: (values: any) => void,
    onFormItemValueInit: (key: string) => any,
    columns: ColumnsConfig<any>
    colSpan: number
}> = ({onSearch, onFormItemValueInit = ()=>{}, columns, colSpan}) => {

    const {token} = theme.useToken();
    const [form] = Form.useForm();
    const [showAll, setShowAll] = useState(false);

    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
        marginBottom: '20px'
    };

    const onFinish = (values: any) => {
        onSearch(removeEmpty(values));
    };

    //支持搜索的数量
    let supportSearchCount = 0;
    columns.map((column) => {
        if (column.supportSearch) supportSearchCount++;
    });

    //第一行显示的表单数据
    const firstLineCount = (24 / colSpan) - 1;
    let firstLineCountVar = firstLineCount;

    //是否显示 "更多" 按钮
    const showMoreButton = supportSearchCount > firstLineCount;


    return (
        <Form name="form_search" style={formStyle} onFinish={onFinish} form={form}>
            <Row gutter={24}>
                {columns.map((column) => {
                    return showMoreButton && !showAll
                        ? column.supportSearch && (firstLineCountVar-- > 0) &&
                        <Col span={colSpan} key={column.key}>
                            <DynamicFormItem column={column} onFormItemValueInit={onFormItemValueInit} />
                        </Col>
                        : column.supportSearch && (
                        <Col span={colSpan} key={column.key}>
                            <DynamicFormItem column={column} onFormItemValueInit={onFormItemValueInit} />
                        </Col>
                    )
                })}

                <Col span={colSpan} style={{display: "flex", justifyContent: "flex-end"}}
                     offset={!showAll ? (18 - firstLineCount * colSpan) : (24 - ((supportSearchCount + 1) * colSpan) % 24)}>
                    <Button type="primary" htmlType="submit">
                        搜索
                    </Button>
                    <Button style={{margin: '0 5px'}} onClick={() => {
                        form.resetFields();
                    }}>
                        重置
                    </Button>
                    {showMoreButton && (<a onClick={() => {
                        setShowAll(!showAll)
                    }} style={{height: "33px", lineHeight: "33px"}}>
                        {!showAll ? (<><CaretDownOutlined/> 更多</>) : (<><CaretUpOutlined/> 收起</>)}
                    </a>)}
                </Col>
            </Row>
        </Form>
    );
};


export default SearchForm