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
    readOnly?: boolean
}> = ({
          column, onFormItemValueInit = () => {
    }, readOnly = false
      }) => {

    function renderInput(column: ColumnConfig) {
        switch (column.form?.type) {
            case "Hidden":
                return (
                    <Input type={"hidden"} {...column.form?.attrs} readOnly={readOnly}/>
                )
            case "Radio":
                return (
                    <Radio {...column.form?.attrs} readOnly={readOnly}/>
                )
            case "Checkbox":
                return (
                    <Checkbox {...column.form?.attrs} readOnly={readOnly}/>
                )
            case "Rate":
                return (
                    <Rate {...column.form?.attrs} readOnly={readOnly}/>
                )
            case "Switch":
                return (
                    <Switch {...column.form?.attrs} readOnly={readOnly}/>
                )
            case "DatePicker":
                return (
                    <DatePicker placeholder={column.placeholder} {...column.form?.attrs} readOnly={readOnly}/>
                )
            case "InputNumber":
                return (
                    <InputNumber placeholder={column.placeholder} {...column.form?.attrs} readOnly={readOnly}/>
                )
            case "Select":
                return (
                    <Select placeholder={column.placeholder} {...column.form?.attrs} readOnly={readOnly}/>
                )
            case "Slider":
                return (
                    <Slider {...column.form?.attrs} readOnly={readOnly}/>
                )
            case "Upload":
                return (
                    <Upload {...column.form?.attrs} readOnly={readOnly}/>
                )
            default:
                return (
                    <Input placeholder={column.placeholder} {...column.form?.attrs} readOnly={readOnly}
                           style={{...column.form?.attrs?.style, cursor: readOnly ? "not-allowed" : ""}}/>
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