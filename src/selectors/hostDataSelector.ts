import { hostData } from './../data/hosts';
import { isMensTournament, randomSort } from '../filters/filters';


export const HostsData = {
     hosts: hostData.hosts
            .filter(h => isMensTournament(h.tournament_name))
            .sort(randomSort)
}