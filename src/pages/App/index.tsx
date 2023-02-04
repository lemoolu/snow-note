import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./index.less";
import { Row, Col, Tabs, Space, Button } from 'antd';
import useStore from '@/store';
import { SettingOutlined, FileTextOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import Note from '@/pages/Note';
import Setting from '@/pages/Setting';
import { getCatalog } from '@/util';
import { useAsyncEffect } from 'ahooks';

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

  const menuActive = useStore(state => state.menuActive);
  const setStore = useStore(state => state.setStore);

  console.log('menuActive', menuActive)
  const child = {
    'note': <Note />,
    'setting': <Setting />
  }

  useAsyncEffect(async () => {
    const catalog = await getCatalog();
    setStore({ catalog });
    // console.log(catalog)
  }, []);

  console.log('menuActive', menuActive)

  return (
    <div className="flex h-full absolute w-full">
      <div className="flex flex-col w-12 bg-slate-300 justify-between items-center">
        <div>
          <MenuBtn active={menuActive === 'note'} onClick={() => setState({ menuActive: 'note' })}>
            <FileTextOutlined style={{ position: 'relative', top: -4 }} />
          </MenuBtn>

        </div>
        <MenuBtn active={menuActive === 'setting'} onClick={() => setState({ menuActive: 'setting' })}>
          <SettingOutlined style={{ position: 'relative', top: -4 }} />
        </MenuBtn>
      </div>
      <div className="flex-auto relative w-0">
        {child[menuActive]}
      </div>
    </div>
  );
}

export default App;
