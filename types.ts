
export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  children?: FileNode[];
  color?: string;
  icon?: string;
  isOpen?: boolean;
}

export interface Tab {
  id: string;
  name: string;
  icon: string;
  iconColor: string;
  isActive: boolean;
}
