import { describe, it, expect } from 'vitest';

import { matchesData } from '../../selectors/matchDataSelector';

describe('matchesData integrity', () => {
  it('finals should only contain final matches', () => {
    const finals = matchesData.finals;
    const invalid = finals.filter(
      m => m.stage_name !== 'final'
    );

    expect(invalid).toHaveLength(0);
  });

  it('number of finals matches from 1930 till 2022', () => {
    const finals = matchesData.finals;

    const nCups = ((2022 - 1930)/4) - 2;
    expect(finals.length).toBe(nCups);
  });

  it('semiFinals should only contain semi-final matches', () => {
    const invalid = matchesData.semiFinals.filter(
      m =>
        m.stage_name !== 'semi-final' &&
        m.stage_name !== 'semi-finals'
    );

    expect(invalid).toHaveLength(0);
  });
});