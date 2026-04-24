import type { ManagerAppearance } from '../types/managerAppearance';
import data from './db/manager_appearances.json' with {type: 'json'};

export const managerAppearanceData = {
    managersAppearance: data.managers as ManagerAppearance[]
} as const;