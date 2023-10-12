# Antd-Crud

一个基于 React + Ant.Design 的增删改查组件。

![](./docs/assets/images/01.png)

### 特征

- 1、极轻量，只依赖于 Ant.Design 再无其他任何依赖
- 2、支持基本的【增删改查】和【批量删除】功能
- 3、支持搜索、自定义分页和自定义排序等功能
- 4、支持刷新、导出 Excel、数据打印、行高设置等功能
- 5、更多的 DIY 配置


### 开始使用

```tsx
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
```

#### `ColumnConfig` 类型说明：

> `ColumnConfig` 继承了 Antd 的 Table 的 Column 的所有配置，参考：https://ant-design.antgroup.com/components/table-cn#column

在此基础上，增加了自己的配置：

* **placeholder**: 搜索框和编辑页面的占位内容
* **supportSearch**: 是否支持搜素
* **form**: 编辑表单的 form 设置，类型为 `FormConfig`
* **dict**: form 的数据字典设置，类型为 `DictConfig`


#### `FormConfig` 类型说明：

```ts
type FormConfig = {
    
    //类型
    type: string,

    //验证规则
    rules?: any[],
}
```


#### `DictConfig` 类型说明：

```ts
type DictConfig = {
    //数据字典的数据
    values?:{
        label: string,
        value: string,
    }[],
    //数据字典请求的 URL
    url?:string,
}
```


#### `Actions` 类型说明：

> `Actions` 是用于定义 AntdCrud 组件的监听方法

`Actions`  定义的类型如下：

```ts
type Actions<T> = {
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

    //初始化搜索框的值
    onSearchItemValueInit?:(key:string) => any
}
```
需要用户在 `Actions` 定义以上方法，用于对数据进行操作或查询。