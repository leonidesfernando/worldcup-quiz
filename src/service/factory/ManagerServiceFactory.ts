import { managerData } from "../../data/manager";
import type { Manager } from "../../types/manager";
import { ManagerService } from "../ManagerService";

interface ManagerDataInput {
    managers: Manager[];
}

export function createManagerService(
    data: ManagerDataInput = {
        managers: managerData.managers
    }
): ManagerService{
    return new ManagerService(data);
}