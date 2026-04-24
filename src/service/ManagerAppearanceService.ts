import { Utils } from '../utils/Utils';
import type { ManagerAppearance } from './../types/managerAppearance';

export class ManagerAppearanceService {
    private readonly managerAppearances: ManagerAppearance[];

    constructor(data: { managersAppearance: ManagerAppearance[] }) {
        this.managerAppearances = data.managersAppearance;
    }

    getRandomManagerAppearance(): ManagerAppearance {
        return Utils.getRandomItem(this.managerAppearances);
    }

    getByKeyId(keyId: number): ManagerAppearance {
        const result = this.managerAppearances.find(m => m.key_id === keyId);
        if(!result){
            throw new Error(`ManagerAppearance with id ${keyId} not found`);
        }
        return result;
    }

    getFinalsManagerAppearances(): ManagerAppearance[] {
        return this.managerAppearances.filter(m => m.stage_name === 'final');
    }

    getSemiFinalsManagerAppearances(): ManagerAppearance[] {
        return this.managerAppearances.filter(m => (m.stage_name === 'semi-finals') || (m.stage_name === 'semi-final'));
    }

    getManagerAppearancesByTeam(teamCode: string): ManagerAppearance[] {
        return this.managerAppearances.filter(m => m.team_code === teamCode)
    }

    getManagersByCountry(countryName: string): ManagerAppearance[] {
        return this.managerAppearances.filter(m => m.country_name === countryName);
    }

    getAllManagerAppearances(): ManagerAppearance[] {
        return this.managerAppearances;
    }

}