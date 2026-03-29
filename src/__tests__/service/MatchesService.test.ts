import { describe, it, expect } from 'vitest';
import { createMatchesService } from '../../service/fatory/MatchesServiceFactory';

describe('MatchesService', () => {
  const service = createMatchesService();

  it('getFinals should return only finals', () => {
    const finals = service.getFinals();

    const invalid = finals.filter(
      m => m.stage_name !== 'final'
    );

    expect(invalid).toHaveLength(0);
  });
});