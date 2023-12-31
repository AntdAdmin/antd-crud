import './App.css'
import {Tag} from "antd";
import {ConfigProvider} from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import AntdCrud, {Actions, ColumnGroup, ColumnsConfig} from "./components/AntdCrud";

interface Account {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

function App() {

    const columns: ColumnsConfig<Account> = [
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
            placeholder: "请输入姓名",
            groupKey: "test",
            supportSearch: true,
            render: (text) => <a>{text}</a>,
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            groupKey: "test",
            placeholder: "请输入年龄",
            supportSearch: true,
            sorter: true,
        },
        {
            title: '标签',
            dataIndex: 'tag',
            key: 'tag',
            groupKey: "other",
            supportSearch: true,
            form: {
                type: "Select",
                attrs: {
                    // defaultValue:'',
                    options: [
                        {value: '', label: '--请选择--'},
                        {value: 'jack', label: 'Jack'},
                        {value: 'lucy', label: 'Lucy'},
                        {value: 'Yiminghe', label: 'yiminghe'},
                        {value: 'disabled', label: 'Disabled', disabled: true}],
                },
            },
            render: (text) => <a>{text}</a>,
        },
        {
            title: '标题',
            dataIndex: 'address',
            key: 'address',
            groupKey: "other",
            placeholder: "请输入标题",
            supportSearch: true,
            sorter: true,
        },
        {
            title: '地址',
            dataIndex: 'address1',
            key: 'address1',
            supportSearch: true,
        },
        {
            title: '标签',
            key: 'tags',
            dataIndex: 'tags',
            supportSearch: true,
            render: (_, {tags}) => (
                <>
                    {tags.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        }
    ];


    const data: Account[] = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    const actions: Actions<Account> = {
        //获取数据列表
        onFetchList: (currentPage, pageSize, totalPage, searchParams
            , orderByKey, orderByType) => {
            console.log("onFetchList: ", currentPage, pageSize, totalPage, searchParams, orderByKey, orderByType);
        },

        //获取数据详情
        onFetchDetail: (row) => {
            console.log("onFetchDetail: ", row)
            return row;
        },

        //删除单条数据
        onDelete: (row) => {
            console.log("onDelete: ", row)
        },

        //批量删除数据
        onDeleteBatch: (rows) => {
            console.log("onDeleteBatch: ", rows)
        },

        //数据更新
        onUpdate: (row) => {
            console.log("onUpdate: ", row)
        },

        //数据创建
        onCreate: (row) => {
            console.log("onCreate: ", row)
        },

        //初始化搜索框的值
        onSearchValueInit: (key) => {
            console.log("onFormItemValueInit: ", key)
        }
    };

    const groups: ColumnGroup[] = [
        {
            key: "test",
            title: "基本信息",
        },
        {
            key: "other",
            title: "其他信息",
        }];


    return (
        <ConfigProvider locale={zh_CN}>
            <div style={{width: "960px"}}>
                <AntdCrud columns={columns}
                          dataSource={data}
                          actions={actions}
                          pageNumber={1}
                          pageSize={10}
                          groups={groups}
                          totalRow={2342}/>
            </div>
        </ConfigProvider>
    )
}

export default App
