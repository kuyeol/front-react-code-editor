
import React from 'react';
import { ActivityBarItem } from '../ActivityBarItem.tsx';

interface ItemProps {
  isActive: boolean;
  onClick: () => void;
}

export const SourceControlItem: React.FC<ItemProps> = ({ isActive, onClick }) => (
  <ActivityBarItem
    icon="account_tree"
    label="Source Control"
    isActive={isActive}
    onClick={onClick}
  />
);
