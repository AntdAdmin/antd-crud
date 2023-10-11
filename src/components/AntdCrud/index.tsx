import React, {useState} from "react";
import {Button, Popconfirm, Space, Table} from "antd";
import {ColumnGroupType, ColumnType, TableRowSelection} from "antd/es/table/interface";
import SearchForm from "./SearchForm";
import {
    ColumnHeightOutlined,
    DeleteOutlined,
    DownloadOutlined,
    EditOutlined,
    EyeOutlined, FormatPainterOutlined,
    ReloadOutlined,
    RestOutlined, SwapOutlined
} from "@ant-design/icons";
import DetailForm from "./DetailForm";

export type FormConfig = {
    type: string,

    //验证规则
    rules?: any[],
}

export type DictInfo = {
    label: string,
    value: string,
}

export type ColumnConfig<RecordType = unknown> = ((ColumnGroupType<RecordType> | ColumnType<RecordType>) & {
    //编辑类型
    form?: FormConfig,

    //数据字典
    dict?: string | DictInfo[],

    //占位字符
    placeholder?: string,

    //是否支持搜索
    supportSearch?: boolean,
});

export type ColumnsConfig<RecordType = unknown> = ColumnConfig<RecordType> [];

export type Actions<T> = {
    //获取数据列表
    onFetchList?: (currentPage: number, pageSize: number, totalPage: number, searchParams: any, orderByKey: string, orderByType: "asc" | "desc") => void,

    //获取数据详情
    onFetchDetail?: (row: T) => T,

    //删除单条数据
    onDelete?: (row: T) => void,

    //批量删除数据
    onDeleteBatch?: (rows: T[]) => void,

    //数据更新
    onUpdate?: (row: T) => void,

    //数据创建
    onCreate?: (row: T) => void,
}

type AntdCrudProps<T> = {

    //列配置
    columns: ColumnsConfig<T>,

    //操作方法
    actions: Actions<T>,

    //数据源
    dataSource: any,
}


function AntdCrud<T>({columns, dataSource, actions}: AntdCrudProps<T>) {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRows, setSelectedRows] = useState<T[]>([]);
    const [selectCount, setSelectCount] = useState(0);
    const [modalTitle, setModalTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalRow, setModalRow] = useState<T | null>(null);
    const [confirmLoading, setConfirmLoading] = useState(false);

    const selectNone = () => {
        setSelectedRowKeys([]);
        setSelectedRows([]);
        setSelectCount(0);
    };


    const actionColumns = columns.concat({
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 210,
        render: (_, row) => (
            <Space size="middle">
                <a onClick={() => {
                    setModalRow(row)
                    setModalTitle("查看")
                    setIsModalOpen(true)
                }}> <EyeOutlined/> 查看 </a>

                <a onClick={() => {
                    setModalRow(row)
                    setModalTitle("编辑")
                    setIsModalOpen(true)
                }}> <EditOutlined/> 编辑 </a>


                <Popconfirm
                    title="确定删除？"
                    description="您确定要删除这条数据吗？"
                    okButtonProps={{loading: confirmLoading}}
                    onConfirm={() => {
                        setConfirmLoading(true)
                        actions.onDelete && actions.onDelete(row)
                        setConfirmLoading(false)
                    }}
                    okText="确定"
                    cancelText="取消"
                >
                    <a> <RestOutlined/> 删除 </a>
                </Popconfirm>

            </Space>
        ),
    });

    return (
        <div>
            <SearchForm onSearch={() => {
            }} columns={columns} onInit={() => {
            }} colSpan={6}/>

            <DetailForm title={modalTitle}
                        columns={columns}
                        open={isModalOpen}
                        onSubmit={() => {
                            setIsModalOpen(false)
                        }}
                        onCancel={() => {
                            setModalRow(null)
                            setIsModalOpen(false)
                        }}
                        actions={actions}
                        row={modalRow as T}
            />

            <Space style={{display: "flex", justifyContent: "space-between", padding: "10px 0"}}>
                <Space align={"center"}>
                    <Button type="primary" onClick={() => {
                        setModalRow(null);
                        setModalTitle("新增")
                        setIsModalOpen(!isModalOpen)
                    }}>新增</Button>

                    {selectCount > 0 &&
                        <div style={{
                            border: "1px solid #abdcff",
                            borderRadius: "6px",
                            padding: "0 10px",
                            margin: "-1px",
                            background: "#f0faff",
                            height: "32px",
                            display: "flex",
                            fontSize: "14px"
                        }}>
                            <Space>
                                <div>
                                    已选择 {selectCount} 项
                                </div>
                                <Popconfirm
                                    title="确定删除？"
                                    description="您确定要全部删除所选的数据吗？"
                                    okButtonProps={{loading: confirmLoading}}
                                    onConfirm={() => {
                                        setConfirmLoading(true)
                                        actions.onDeleteBatch && actions.onDeleteBatch(selectedRows);
                                        setConfirmLoading(false)
                                    }}
                                    okText="确定删除"
                                    cancelText="取消"
                                >
                                    <a style={{color: "red"}}>
                                        <DeleteOutlined/>全部删除
                                    </a>

                                </Popconfirm>

                                <a style={{paddingLeft: "20px"}} onClick={selectNone}> 取消选择 </a>
                            </Space>
                        </div>
                    }
                </Space>

                <Space align={"center"} size={"middle"}>
                    <ReloadOutlined/>
                    <DownloadOutlined/>
                    <ColumnHeightOutlined/>
                    <FormatPainterOutlined/>
                    <SwapOutlined/>
                </Space>

            </Space>

            <Table columns={actionColumns} dataSource={dataSource}
                   rowSelection={{
                       type: 'checkbox',
                       selectedRowKeys,
                       onChange: (selectedRowKeys: React.Key[], selectedRows: T[]) => {
                           setSelectedRows(selectedRows);
                           setSelectedRowKeys([...selectedRowKeys]);
                           setSelectCount(selectedRows.length);
                       },
                       getCheckboxProps: (record: any) => ({
                           disabled: record.name === 'Disabled User', // Column configuration not to be checked
                           name: record.name,
                       }),
                   } as TableRowSelection<any>}/>
        </div>
    )
}

export default AntdCrud
