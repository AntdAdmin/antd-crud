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
    disabled?:boolean
}> = ({column, onFormItemValueInit = () => {},disabled = false }) => {

    function renderInput(column: ColumnConfig) {
        switch (column.form?.type) {
            case "Hidden":
                return (
                    <Input type={"hidden"} {...column.form?.attrs} disabled={disabled}/>
                )
            case "Radio":
                return (
                    <Radio {...column.form?.attrs} disabled={disabled}/>
                )
            case "Checkbox":
                return (
                    <Checkbox {...column.form?.attrs} disabled={disabled}/>
                )
            case "Rate":
                return (
                    <Rate {...column.form?.attrs} disabled={disabled}/>
                )
            case "Switch":
                return (
                    <Switch {...column.form?.attrs} disabled={disabled}/>
                )
            case "DatePicker":
                return (
                    <DatePicker placeholder={column.placeholder} {...column.form?.attrs} disabled={disabled}/>
                )
            case "InputNumber":
                return (
                    <InputNumber placeholder={column.placeholder} {...column.form?.attrs} disabled={disabled}/>
                )
            case "Select":
                return (
                    <Select placeholder={column.placeholder} {...column.form?.attrs} disabled={disabled}/>
                )
            case "Slider":
                return (
                    <Slider {...column.form?.attrs} disabled={disabled}/>
                )
            case "Upload":
                return (
                    <Upload {...column.form?.attrs} disabled={disabled}/>
                )
            default:
                return (
                    <Input placeholder={column.placeholder} {...column.form?.attrs} disabled={disabled}/>
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