
import React from 'react';
import { ActivityBarItem } from '../ActivityBarItem.tsx';

interface ItemProps {
  isActive: boolean;
  onClick: () => void;
}

export const SearchItem: React.FC<ItemProps> = ({ isActive, onClick }) => (
  <ActivityBarItem
    icon="search"
    label="Search"
    isActive={isActive}
    onClick={onClick}
  />
);
