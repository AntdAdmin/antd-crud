import {useEffect, useState} from 'react';
import {
    Col,
    Divider,
    Form,
    Row,
    theme,
} from 'antd';
import {Actions, ColumnGroup, ColumnsConfig} from "./index";
import DynamicFormItem from "./DynamicFormItem";
import MyModal from "./MyModal";

export type Props<T> = {
    columns: ColumnsConfig<any>
    onSubmit: (values: T) => void,
    onCancel: () => void,
    actions: Actions<T>,
    row?: T,
    open: boolean
    title: string,
    formReadOnly: boolean,
    groups?: ColumnGroup[],
}

const DetailForm = <T, >({
                             columns,
                             onSubmit,
                             onCancel,
                             actions,
                             row,
                             open,
                             title,
                             formReadOnly,
                             groups
                         }: Props<T>) => {

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
        <MyModal
            type={"modal"}
            title={title}
            open={open}
            placement="right"
            onOk={form.submit}
            onClose={onCancelClick}
            onCancel={onCancelClick}
            confirmLoading={confirmLoading}
            okText="确定"
            cancelText="取消"
            width={"40%"}>
            <Form form={form} style={formStyle} onFinish={onFinish} labelAlign={"right"}
                  {...formItemLayout}>
                <Row gutter={24}>
                    {groups && groups.map((group) => {
                        return (
                            <>
                                <Divider orientation="left">{group.title}</Divider>
                                {columns.filter((column) => column.groupKey == group.key)
                                    .map((column) => {
                                        return (
                                            <Col span={column.colSpan || 20} offset={column.colOffset || 2}
                                                 key={column.key}>
                                                <DynamicFormItem column={column} readOnly={formReadOnly}/>
                                            </Col>
                                        )
                                    })}
                            </>
                        )
                    })}

                    {columns.filter((column) => !column.groupKey)
                        .map((column) => {
                            return (
                                <Col span={column.colSpan || 20} offset={column.colOffset || 2} key={column.key}>
                                    <DynamicFormItem column={column} readOnly={formReadOnly}/>
                                </Col>
                            )
                        })}

                </Row>
            </Form>
        </MyModal>
    );
};

export default DetailForm