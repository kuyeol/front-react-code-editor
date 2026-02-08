
import { useState, useCallback, useEffect } from 'react';

export const useLayoutResize = () => {
  const [sidebarWidth, setSidebarWidth] = useState(256);
  const [terminalHeight, setTerminalHeight] = useState(240);
  const [previewWidth, setPreviewWidth] = useState(320);
  const [isResizing, setIsResizing] = useState<null | 'sidebar' | 'terminal' | 'preview'>(null);

  const startResizing = (panel: 'sidebar' | 'terminal' | 'preview') => (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(panel);
  };

  const stopResizing = useCallback(() => {
    setIsResizing(null);
  }, []);

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;

    if (isResizing === 'sidebar') {
      const newWidth = Math.max(160, Math.min(600, e.clientX - 48));
      setSidebarWidth(newWidth);
    } else if (isResizing === 'preview') {
      const newWidth = Math.max(200, Math.min(800, window.innerWidth - e.clientX));
      setPreviewWidth(newWidth);
    } else if (isResizing === 'terminal') {
      const newHeight = Math.max(100, Math.min(window.innerHeight - 150, window.innerHeight - e.clientY - 24));
      setTerminalHeight(newHeight);
    }
  }, [isResizing]);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', stopResizing);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopResizing);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [isResizing, onMouseMove, stopResizing]);

  return {
    sidebarWidth,
    terminalHeight,
    previewWidth,
    isResizing,
    startResizing
  };
};
