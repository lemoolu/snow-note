// @ts-nocheck
import React, { Component, useState, useRef } from 'react';
import { useAsyncEffect } from 'ahooks';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import './index.less';

// https://github.com/ckeditor/ckeditor5-demos/blob/master/markdown/index.js
// https://ckeditor.com/ckeditor-5/demo/markdown/
// https://www.getoutline.com/

export default function ({
  data,
  onChange,
}) {
  const [html, setHtml] = useState('');
  const inputEl = useRef(null);

  useAsyncEffect(async () => {
    inputEl.current.getInstance().setMarkdown(data)
  }, [data]);

  return (
    <Editor
      initialValue="hello react editor world!2323"
      previewStyle="vertical"
      height="100%"
      initialEditType="wysiwyg" // markdown
      useCommandShortcut={true}
      onChange={(v) => {
        onChange(inputEl.current.getInstance().getMarkdown())
      }}
      ref={inputEl}
    />
  )
};