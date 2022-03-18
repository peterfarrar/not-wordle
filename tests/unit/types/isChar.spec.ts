import isChar from '@/types/isChar'
describe('isChar', () => {
  it('returns true for a Char', () => {
    expect(isChar('d')).toBe(true)
  })

  it('returns false for a non-Char', () => {
    expect(isChar('$')).toBe(false)
  })
})
