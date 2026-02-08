
import { MOCK_FILES_MAP } from './mockFiles.ts';

/**
 * Simulates an API call to fetch all project files
 */
export const fetchProjectFiles = async (): Promise<Record<string, string>> => {
  // Simulate network latency
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ ...MOCK_FILES_MAP });
    }, 800);
  });
};

/**
 * Simulates an API call to save a file's content
 */
export const saveFileContent = async (fileName: string, content: string): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`[API] Saved ${fileName}`);
      // In a real app, we would update the "database" here
      MOCK_FILES_MAP[fileName] = content;
      resolve({ success: true });
    }, 300);
  });
};
