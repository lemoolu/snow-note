import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./index.less";
import Editor from '@/components/Editor';
import Catalog from '@/components/Catalog';
import { Row, Col, Tabs, Space, Button } from 'antd';
import { readDir } from '@/util';
import useStore from '@/store';
import Setting from '@/assets/setting.svg';
import { SettingOutlined, FileTextOutlined } from '@ant-design/icons';
import classnames from 'classnames';

function MenuBtn(props) {
  return (
    <div
      className={classnames("p-4 cursor-pointer hover:bg-slate-200 hover:duration-200", { 'bg-slate-200': props.active })}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  )
}

function App() {

  const { menuActive, setMenuActive } = useStore();

  console.log('menuActive', menuActive)

  return (
    <div className="flex h-full absolute w-full">
      <div className="flex flex-col w-12 bg-slate-50 justify-between items-center">
        <div>
          <MenuBtn active={menuActive === 'app'} onClick={() => setMenuActive('app')}>
            <FileTextOutlined />
          </MenuBtn>

        </div>
        <MenuBtn active={menuActive === 'setting'} onClick={() => setMenuActive('setting')}>
          <SettingOutlined />
        </MenuBtn>

      </div>
      <div className="flex-none w-64">
        <Catalog />
      </div>
      <div className="flex-auto relative w-0">
        <Tabs
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
        />
        {/* <Editor /> */}
      </div>
    </div>
  );
}

export default App;
