import { describe, it, expect } from 'vitest';
import { greet } from '../lib/greet.js';

describe('greet', () => {
  it('returns a friendly message', () => {
    expect(greet('Jean-Christophe')).toBe('Hello, Jean-Christophe!');
  });
});
