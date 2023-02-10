import React, { useState } from 'react';
import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import type { FileOrDir } from '@/type';

const treeData: DataNode[] = [
  {
    title: 'parent 1',
    key: '0-0',
    children: [
      {
        title: 'parent 1-0',
        key: '0-0-0',
        disabled: true,
        children: [
          {
            title: 'leaf',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'leaf',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '0-0-1',
        children: [{ title: <span style={{ color: '#1890ff' }}>sss</span>, key: '0-0-1-0' }],
      },
    ],
  },
];

interface CatalogProps {
  treeData: FileOrDir[],
  onFileSelect: (checkedKeys: string) => void;
}

const Catalog: React.FC<CatalogProps> = (props) => {
  const {
    treeData,
    onFileSelect,
  } = props;

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    const { selectedNodes } = info;
    if (selectedNodes.length > 0 && !selectedNodes[0].children) {
      onFileSelect && onFileSelect(selectedKeys[0] as string);
    }
  };

  return (
    <Tree<FileOrDir>
      // checkable
      blockNode
      onSelect={onSelect}
      // onCheck={_onCheck}
      // onSelect={_onCheck}
      // checkedKeys={checkedKeys}
      fieldNames={{
        title: 'name',
        key: 'path',
        children: 'children'
      }}
      treeData={treeData}
      titleRender={(node) => {
        return node.name;
      }}
      style={{ background: 'none' }}
    />
  );
};

export default Catalog;