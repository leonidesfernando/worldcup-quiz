
import { HostsData } from "../selectors/hostDataSelector";
import type { Hosts } from "../types/worldcup";
import { Utils } from "../utils/Utils";

export class HostService {

  getHosts() {
    return HostsData.hosts
  }

  getRandomHost(): Hosts {
    return Utils.getRandomItem(this.getHosts());
  }
}