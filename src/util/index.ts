import { readDir, BaseDirectory, readTextFile } from '@tauri-apps/api/fs';
import { Setting } from '@/type';

export async function getSetting(): Promise<Setting> {
  return {
    root: 'snow-notes'
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
