import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import { Row, Col, Tabs } from 'antd';
import Editor from '@/components/Editor';
import Catalog from '@/components/Catalog';
import useStore from '@/store';
import { useAsyncEffect } from 'ahooks';
import { readFile } from '@/util';

function Note() {
  const [file, setFile] = useState('');
  const catalog = useStore(state => state.catalog);
  const setStore = useStore(state => state.setStore);
  const editFile = useStore(state => state.editFile);

  useAsyncEffect(async () => {
    if (editFile) {
      let f = await readFile(editFile);
      setFile(f);
    }
  }, [editFile]);

  return (
    <div className="flex h-full">
      <div className="flex-none w-64 bg-slate-100">
        <Catalog
          treeData={catalog}
          onFileSelect={(filePath) => {
            setStore({ editFile: filePath })
          }}
        />
      </div>
      <div className="flex-auto h-full relative w-0 bg-slate-0 overflow-y-auto">
        {file}
        {/* <Tabs
          defaultActiveKey="1"
          type="editable-card"
          style={{ height: '100%' }}
          items={new Array(30).fill(null).map((_, i) => {
            const id = String(i);
            return {
              label: `Tab-${id}`,
              key: id,
              disabled: i === 28,
              children: <Editor />,
            };
          })}
        /> */}
        {/* <Editor /> */}
      </div>
    </div>
  );
}

export default Note;
