import type { Manager } from "../types/manager";
import { Utils } from "../utils/Utils";

export class ManagerService {

    private readonly managers: Manager[];

    constructor(data: { managers: Manager[] }) {
        this.managers = data.managers;
    }

    getRandomManager(): Manager {
        return Utils.getRandomItem(this.managers);
    }
}