import type { DataNode, TreeProps } from 'antd/es/tree';

export interface Setting {
  root: string;
  fileSaveDebounceWait: number;
}

export interface FileOrDir extends DataNode {
  name: string;
  path: string;
  children?: FileOrDir[]
}
