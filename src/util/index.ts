import { readDir, BaseDirectory, readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { Setting } from '@/type';

export async function getSetting(): Promise<Setting> {
  return {
    root: 'snow-notes',
    fileSaveDebounceWait: 10000,
  }
}

export async function getCatalog() {
  const setting = await getSetting();
  const entries = await readDir(setting.root, { dir: BaseDirectory.Home, recursive: true });
  return entries;
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
