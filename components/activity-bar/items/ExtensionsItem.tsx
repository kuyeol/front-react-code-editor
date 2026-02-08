
import React from 'react';
import { ActivityBarItem } from '../ActivityBarItem.tsx';

interface ItemProps {
  isActive: boolean;
  onClick: () => void;
}

export const ExtensionsItem: React.FC<ItemProps> = ({ isActive, onClick }) => (
  <ActivityBarItem
    icon="extension"
    label="Extensions"
    isActive={isActive}
    onClick={onClick}
  />
);
