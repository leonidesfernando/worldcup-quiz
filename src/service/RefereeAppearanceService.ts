import type { RefereeAppearances } from './../types/refereeAppearances';

export class RefereeAppearanceService {
    private readonly refereeAppearances: RefereeAppearances[];

    constructor(data: { refereeAppearances: RefereeAppearances[] }) {
        this.refereeAppearances = data.refereeAppearances;
    }

    getReferees(): RefereeAppearances[] {
        return this.refereeAppearances;
    }

    getFinalReferees(): RefereeAppearances[] {
        return this.refereeAppearances.filter(r => r.stage_name === 'final');
    }

    getSemiFinalReferees(): RefereeAppearances[] {
        return this.refereeAppearances.filter(r => r.stage_name === 'semi-finals');
    }

    getByTournamentId(tournamentId: string): RefereeAppearances[] {
        return this.refereeAppearances.filter(r => r.tournament_id === tournamentId);
    }
}