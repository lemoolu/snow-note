import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import Catalog from '@/components/Catalog';
import useStore from '@/store';
import { useAsyncEffect, useDebounceFn } from 'ahooks';
import { readFile, writeFile, getSetting } from '@/util';
import ReactMdRender from "@/components/ReactMdRender";

function Note() {
  const [file, setFile] = useState('');
  const catalog = useStore(state => state.catalog);
  const setStore = useStore(state => state.setStore);
  const editFilePath = useStore(state => state.editFilePath);

  useAsyncEffect(async () => {
    if (editFilePath) {
      let f = await readFile(editFilePath);
      setFile(f);
    }
  }, [editFilePath]);

  const {
    run,
  } = useDebounceFn(writeFile, { wait: 1000 });

  return (
    <div className="flex h-full">
      <div className="flex-none w-64 bg-slate-100 overflow-auto">
        <Catalog
          treeData={catalog}
          onFileSelect={(filePath) => {
            setStore({ editFilePath: filePath })
          }}
        />
      </div>
      <div className="flex-auto h-full relative w-0 bg-slate-0 overflow-y-auto p-0">
        <ReactMdRender
          data={file}
          onChange={data => {
            // console.log(data)
            run(editFilePath as string, data);
          }}
        />
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
