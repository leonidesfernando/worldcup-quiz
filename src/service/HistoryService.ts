// src/service/HistoryService.ts
export interface HistoryEntry {
  id: string;
  date: string;
  correct: number;
  wrong: number;
  total: number;
  percentage: number;
}

const STORAGE_KEY = 'worldcup_quiz_history';
const MAX_KEEPT_RESULTS = 100;

export const HistoryService = {
  async saveResult(correct: number, total: number): Promise<void> {
    const entry: HistoryEntry = {
      id: Date.now().toString(36) + Math.random().toString(36).substr(2),
      date: new Date().toISOString(),
      correct,
      wrong: total - correct,
      total,
      percentage: Math.round((correct / total) * 100),
    };

    const history = await this.getAll();
    history.unshift(entry); // newest first

    // Keep only last MAX_KEPT_RESULTS results
    if (history.length > MAX_KEEPT_RESULTS) {
        history.length = MAX_KEEPT_RESULTS;
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  },

  async getAll(): Promise<HistoryEntry[]> {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  async clearAll(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY);
  },

  async deleteById(id: string): Promise<void> {
    const history = await this.getAll();
    const filtered = history.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  }
};