import { describe, it, expect } from 'vitest';
import { PlayerAppearancesData } from '../../selectors/playerAppearanceDataSelector';


describe('Players Appearance Data Integrity', () => {
    it('Find player by name matches', () => {
        const players = PlayerAppearancesData.playerApparences;
        const cafuPlayer = players.filter(p => p.family_name === 'Cafu');

        expect(cafuPlayer).toHaveLength(20);
    })
})