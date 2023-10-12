import React, {useEffect, useState} from "react";
import {Button, Popconfirm, Space, Table} from "antd";
import {ColumnGroupType, ColumnType, SorterResult, TableRowSelection} from "antd/es/table/interface";
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

export type DictConfig = {
    values?: {
        label: string,
        value: string,
    }[],

    url?: string,
}

export type ColumnConfig<RecordType = unknown> = ((ColumnGroupType<RecordType> | ColumnType<RecordType>) & {
    //编辑类型
    form?: FormConfig,

    //数据字典
    dict?: DictConfig,

    //占位字符
    placeholder?: string,

    //是否支持搜索
    supportSearch?: boolean,
});

export type ColumnsConfig<RecordType = unknown> = ColumnConfig<RecordType> [];

export type Actions<T> = {
    //获取数据列表
    onFetchList?: (currentPage: number, pageSize: number, totalPage: number, searchParams: any, orderByKey?: string | null, orderByType?: "asc" | "desc" | null) => void,

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

    //初始化搜索框的值
    onSearchItemValueInit?: (key: string) => any
}

type AntdCrudProps<T> = {

    //列配置
    columns: ColumnsConfig<T>,

    //操作方法
    actions: Actions<T>,

    //数据源
    dataSource: any,

    pageNumber: number,

    pageSize: number,

    totalRow: number
}


function AntdCrud<T>({columns, dataSource, actions, pageNumber, pageSize, totalRow}: AntdCrudProps<T>) {

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [selectedRows, setSelectedRows] = useState<T[]>([]);
    const [selectCount, setSelectCount] = useState(0);
    const [modalTitle, setModalTitle] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalRow, setModalRow] = useState<T | null>(null);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [searchParams, setSearchParams] = useState();
    const [pagination, setPagination] = useState(pageNumber);
    const [currentPageSize, setCurrentPageSize] = useState(pageSize);
    const [sortKey, setSortKey] = useState<string | null>();
    const [sortType, setSortType] = useState<"asc" | "desc" | null>();


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

    useEffect(() => {
        if (actions.onFetchList) {
            const totalPage = totalRow % pageSize == 0 ? (totalRow / pageSize) : (totalRow / pageSize + 1);
            actions.onFetchList(pagination, currentPageSize, totalPage, searchParams, sortKey, sortType);
        }
    }, [searchParams, pagination, currentPageSize, sortKey, sortType])


    return (
        <div>
            <SearchForm columns={columns} colSpan={6}
                        onSearch={(values: any) => {
                            setSearchParams(values);
                        }}
                        onSearchItemValueInit={actions.onSearchItemValueInit!}/>

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
                   onChange={(pagination, _, sorter) => {
                       setPagination(pagination.current || 1);
                       setCurrentPageSize(pagination.pageSize || 10);
                       if (sorter) {
                           const result = sorter as SorterResult<any>;
                           setSortKey(result.field as string);
                           if (result.order) {
                               setSortType(result.order === "ascend" ? "asc" : "desc");
                           } else {
                               setSortKey(null);
                               setSortType(null);
                           }
                       }
                   }}
                   rowSelection={{
                       type: 'checkbox',
                       selectedRowKeys,
                       onChange: (selectedRowKeys: React.Key[], selectedRows: T[]) => {
                           setSelectedRows(selectedRows);
                           setSelectedRowKeys([...selectedRowKeys]);
                           setSelectCount(selectedRows.length);
                       }
                   } as TableRowSelection<any>}
                   pagination={
                       {
                           position: ["bottomCenter"],
                           pageSize: currentPageSize,
                           showQuickJumper: true,
                           defaultCurrent: pageNumber || 1,
                           total: totalRow || 0,
                           showTotal: (total) => `共 ${total} 条数据`,
                       }
                   }
            />
        </div>
    )
}

export default AntdCrud
