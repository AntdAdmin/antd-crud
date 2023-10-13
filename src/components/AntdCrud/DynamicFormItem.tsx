import React from 'react';
import {
    Checkbox,
    DatePicker,
    Form,
    Input, InputNumber, Radio, Rate, Select, Slider, Switch, Upload,
} from 'antd';
import {ColumnConfig} from "./index";


const DynamicFormItem: React.FC<{
    column: ColumnConfig<any>,
    onFormItemValueInit?: (key: string) => any,
}> = ({column, onFormItemValueInit = () => {} }) => {

    function renderInput(column: ColumnConfig) {
        switch (column.form?.type) {
            case "Hidden":
                return (
                    <Input type={"hidden"} {...column.form?.attrs}/>
                )
            case "Radio":
                return (
                    <Radio {...column.form?.attrs}/>
                )
            case "Checkbox":
                return (
                    <Checkbox {...column.form?.attrs}/>
                )
            case "Rate":
                return (
                    <Rate {...column.form?.attrs}/>
                )
            case "Switch":
                return (
                    <Switch {...column.form?.attrs}/>
                )
            case "DatePicker":
                return (
                    <DatePicker placeholder={column.placeholder} {...column.form?.attrs}/>
                )
            case "InputNumber":
                return (
                    <InputNumber placeholder={column.placeholder} {...column.form?.attrs}/>
                )
            case "Select":
                return (
                    <Select placeholder={column.placeholder} {...column.form?.attrs} />
                )
            case "Slider":
                return (
                    <Slider {...column.form?.attrs}/>
                )
            case "Upload":
                return (
                    <Upload {...column.form?.attrs}/>
                )
            default:
                return (
                    <Input placeholder={column.placeholder} {...column.form?.attrs}/>
                )
        }
    }

    return (
        <Form.Item name={column.key! as string} label={column.title! as string}
                   style={{display: column.form?.type == "Hidden" ? "none" : ""}}
                   initialValue={onFormItemValueInit(column.key! as string) || ""}>
            {renderInput(column)}
        </Form.Item>
    );
};


export default DynamicFormItem