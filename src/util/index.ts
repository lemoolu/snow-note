import { readDir, BaseDirectory, readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { Setting } from '@/type';

export async function getSetting(): Promise<Setting> {
  return {
    root: 'snow-notes',
    fileSaveDebounceWait: 10000,
  }
}

function loadDir(entries: any[]) {
  entries.forEach(e => {
    console.log(e)
    if (/.*\.md/.test(e.name)) {
      e.type = 'file';
    } else {
      e.type = 'dir';
    }
    if(entries.children) {
      loadDir(entries.children);
    }
  });
  return entries;
}

export async function getCatalog() {
  const setting = await getSetting();
  const entries = await readDir(setting.root, { dir: BaseDirectory.Home, recursive: true });
  return [{
    name: setting.root,
    path: '',
    type: 'dir',
    children: loadDir(entries)
  }];
}

export async function readFile(filePath: string) {
  const file = await readTextFile(filePath);
  return file;
}

export async function writeFile(filePath: string, fileContent: string,) {
  console.log('filePath', filePath)
  const file = await writeTextFile(filePath, fileContent);
  console.log(file)
  return file;
}
