
import React from 'react';
import { ActivityBarItem } from '../ActivityBarItem.tsx';

interface ItemProps {
  isActive: boolean;
  onClick: () => void;
}

export const TerminalItem: React.FC<ItemProps> = ({ isActive, onClick }) => (
  <ActivityBarItem
    icon="terminal"
    label="Terminal"
    isActive={isActive}
    onClick={onClick}
  />
);
