import data from './db/hosts_countries.json' with  {type: 'json'};
import type { Hosts } from '../types/worldcup';


export const hostData = {
  hosts: data.hosts as Hosts[],
} as const;

