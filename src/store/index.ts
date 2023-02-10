import { create } from 'zustand';
import { FileOrDir } from '@/type';

interface Store {
  menuActive: string;
  catalog: FileOrDir[];
  /** 当前编辑的文件path */
  editFilePath: string | null;
  /** 当前已经打开的文档队列 */
  // openFilesArray: string[],
  setStore: (value: Partial<Omit<Store, 'setStore'>>) => void;
}

const useStore = create<Store>((set) => ({
  menuActive: 'note',
  catalog: [],
  editFilePath: null,
  setStore: (value: any) => {
    set({ ...value });
  },
}));

export default useStore;