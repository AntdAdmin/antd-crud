import './App.css'
import AntdCrud, {Actions, ColumnsConfig} from "./components/AntdCrud";
import {Tag} from "antd";

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
            placeholder:"请输入姓名",
            supportSearch:true,
            render: (text) => <a>{text}</a>,
        },
        {
            title: '年龄',
            dataIndex: 'age',
            key: 'age',
            supportSearch:true,
        },
        {
            title: '标题',
            dataIndex: 'address',
            key: 'address',
            supportSearch:true,
        },
        {
            title: '地址',
            dataIndex: 'address1',
            key: 'address1',
            supportSearch:true,
        },
        {
            title: '标签',
            key: 'tags',
            dataIndex: 'tags',
            supportSearch:true,
            render: (_, { tags }) => (
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

    const actions:Actions<Account> = {
        onCreate:(row)=>{
            console.log("onCreate",row.age);
        }
    };


    return (
        <div style={{width:"960px"}}>
            <AntdCrud<Account> columns={columns} dataSource={data} actions={actions} />
        </div>
    )
}

export default App
