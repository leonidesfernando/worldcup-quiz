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


  it('semiFinals should only contain semi-final matches', () => {
    const invalid = matchesData.semiFinals.filter(
      m =>
        m.stage_name !== 'semi-final' &&
        m.stage_name !== 'semi-finals'
    );

    expect(invalid).toHaveLength(0);
  });
});