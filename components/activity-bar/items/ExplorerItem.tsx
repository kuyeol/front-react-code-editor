
import React from 'react';
import { ActivityBarItem } from '../ActivityBarItem.tsx';

interface ItemProps {
  isActive: boolean;
  onClick: () => void;
}

export const ExplorerItem: React.FC<ItemProps> = ({ isActive, onClick }) => (
  <ActivityBarItem
    icon="file_copy"
    label="Explorer"
    isActive={isActive}
    onClick={onClick}
  />
);
