import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./index.less";
import Editor from '@/components/Editor';
import Catalog from '@/components/Catalog';
import { Row, Col } from 'antd';

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container">
      <Row>
        <Col flex={'200px'}>
          <Catalog />
        </Col>
        <Col flex={'auto'}>
          <Editor />
        </Col>
      </Row>


      <button type="button" onClick={() => greet()}>
        Greet
      </button>
      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
