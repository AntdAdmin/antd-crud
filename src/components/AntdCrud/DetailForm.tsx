import {useEffect, useState} from 'react';
import {
    Col,
    Form,
    Modal,
    Row,
    theme,
} from 'antd';
import {Actions, ColumnsConfig} from "./index";
import DynamicFormItem from "./DynamicFormItem";

export type Props<T> = {
    columns: ColumnsConfig<any>
    onSubmit: (values: T) => void,
    onCancel: () => void,
    actions: Actions<T>,
    row?: T,
    open: boolean
    title: string,
    formItemDisabled:boolean
}

const DetailForm = <T, >({columns, onSubmit, onCancel, actions, row, open, title,formItemDisabled}: Props<T>) => {

    const {token} = theme.useToken();
    const [form] = Form.useForm();

    const [confirmLoading, setConfirmLoading] = useState(false);

    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
        marginBottom: '20px'
    };

    const formItemLayout = {labelCol: {span: 6}, wrapperCol: {span: 14}};

    useEffect(() => {
        if (row && actions.onFetchDetail) {
            const newRow = actions.onFetchDetail(row);
            form.setFieldsValue(newRow);
        } else if (row) {
            form.setFieldsValue(row)
        }
    }, [row])

    const onFinish = (values: T) => {
        try {
            setConfirmLoading(true)
            form.resetFields();
            if (row) {
                actions.onUpdate && actions.onUpdate(values);
            } else {
                actions.onCreate && actions.onCreate(values);
            }
            onSubmit(values);
        } finally {
            setConfirmLoading(false)
        }
    }

    const onCancelClick = () => {
        form.resetFields();
        onCancel();
    };

    return (
        <Modal title={title}
               open={open}
               onOk={form.submit}
               onCancel={onCancelClick}
               confirmLoading={confirmLoading}
               okText="确定"
               cancelText="取消"
               width={"40%"}>
            <Form form={form} style={formStyle} onFinish={onFinish} labelAlign={"right"}
                  {...formItemLayout}>
                <Row gutter={24}>
                    {columns.map((column) => {
                        return (
                            <Col span={20} offset={2} key={column.key}>
                                <DynamicFormItem column={column} disabled={formItemDisabled}/>
                            </Col>
                        )
                    })}
                </Row>
            </Form>
        </Modal>
    );
};

export default DetailForm