import React, {useRef} from 'react';
import {Image} from 'antd';
import type {ActionType, ProColumns} from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {searchUsers} from "@/services/ant-design-pro/api";

const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: 'Username',
    dataIndex: 'username',
    copyable: true,
  },
  {
    title: 'Avatar',
    dataIndex: 'avatarUrl',
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} width={100}></Image>
      </div>
    ),
  },{
    title: 'Gender',
    dataIndex: 'gender',
    copyable: true,
    valueEnum: {
      0: { text: 'Female', status: 'Default' },
      1: {
        text: 'Male',
        status: 'Success',
      },
    },
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    copyable: true,
  },
  {
    title: 'Created At',
    dataIndex: 'createTime',
    valueType: 'dateTime',
    copyable: true,
  },
  {
    title: 'User Role',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      0: { text: 'Regular User', status: 'Default' },
      1: {
        text: 'Admin',
        status: 'Success',
      },
    },
  },
  {
    title: 'Planet Code',
    dataIndex: 'planetCode',
  },
  /*
 {
   disable: true,
   title: 'State',
   dataIndex: 'state',
   filters: true,
   onFilter: true,
   valueType: 'select',
   valueEnum: {
     all: { text: 'All', status: 'Default' },
     open: {
       text: 'Unresolved',
       status: 'Error',
     },
     closed: {
       text: 'Resolved',
       status: 'Success',
       disabled: true,
     },
     processing: {
       text: 'Processing',
       status: 'Processing',
     },
   },
 },
 {
   disable: true,
   title: 'Labels',
   dataIndex: 'labels',
   search: false,
   renderFormItem: (_, { defaultRender }) => {
     return defaultRender(_);
   },
   render: (_, record) => (
     <Space>
       {record.labels.map(({ name, color }) => (
         <Tag color={color} key={name}>
           {name}
         </Tag>
       ))}
     </Space>
   ),
 },
 {
   title: 'Created At',
   key: 'showTime',
   dataIndex: 'created_at',
   valueType: 'dateTime',
   sorter: true,
   hideInSearch: true,
 },
 {
   title: 'Created At',
   dataIndex: 'created_at',
   valueType: 'dateRange',
   hideInTable: true,
   search: {
     transform: (value) => {
       return {
         startTime: value[0],
         endTime: value[1],
       };
     },
   },
 },
 {
   title: 'Options',
   valueType: 'option',
   key: 'option',
   render: (text, record, _, action) => [
     <a
       key="editable"
       onClick={() => {
         action?.startEditable?.(record.id);
       }}
     >
       Edit
     </a>,
     <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
       View
     </a>,
     <TableDropdown
       key="actionGroup"
       onSelect={() => action?.reload()}
       menus={[
         { key: 'copy', name: 'Copy' },
         { key: 'delete', name: 'Delete' },
       ]}
     />,
   ],
 },
 */
];

const UserManage: React.FC = () => {
  const actionRef = useRef<ActionType>(null);
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params = {}, sort, filter) => {
        console.log(sort, filter);
        const response = await searchUsers();
        const userList = response?.data || [];
        return {
          data:userList
        }
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      form={{
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="Advanced Table"

    />
  );
};

export default UserManage;
