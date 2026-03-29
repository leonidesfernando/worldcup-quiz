
//import { HostsData } from "../selectors/hostDataSelector";
import type { Hosts } from "../types/worldcup";
import { Utils } from "../utils/Utils";

export class HostService {

  private readonly hosts: Hosts[];
  constructor(data: {hosts: Hosts[]}){
    this.hosts = data.hosts;
  }

  getHosts() {
    //return HostsData.hosts
    return this.hosts;
  }

  getRandomHost(): Hosts {
    return Utils.getRandomItem(this.getHosts());
  }
}