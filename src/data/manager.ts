import type { Manager } from '../types/manager';
import data from './db/managers.json' with {type: 'json'};

export const managerData = {
    managers: data.managers as Manager[]
} as const;
