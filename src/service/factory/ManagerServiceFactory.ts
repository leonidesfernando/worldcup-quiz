import { ManagerData } from "../../selectors/managerDataSelector";
import type { Manager } from "../../types/manager";
import { ManagerService } from "../ManagerService";

interface ManagerDataInput {
    managers: Manager[];
}

export function createManagerService(
    data: ManagerDataInput = {
        managers: ManagerData.managers
    }
): ManagerService{
    return new ManagerService(data);
}