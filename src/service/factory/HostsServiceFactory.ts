// src/service/matchesServiceFactory.ts
import { HostsData } from '../../selectors/hostDataSelector';
import type { Hosts } from '../../types/worldcup';
import { HostService } from '../HostService';

interface HostsDataInput {
  hosts: Hosts[];
}

export function createHostsService(
  data: HostsDataInput = {
    hosts: HostsData.hosts
  }
): HostService {
  return new HostService(data);
} 