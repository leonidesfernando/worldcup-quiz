import data from '../../public/data/hosts_countries.json' assert { type: 'json' };
import type { Hosts } from '../types/worldcup';


export const hostData = {
  hosts: data.hosts as Hosts[],
} as const;

