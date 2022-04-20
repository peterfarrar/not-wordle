export type Char =
  | 'a'
  | 'b'
  | 'c'
  | 'd'
  | 'e'
  | 'f'
  | 'g'
  | 'h'
  | 'i'
  | 'j'
  | 'k'
  | 'l'
  | 'm'
  | 'n'
  | 'o'
  | 'p'
  | 'q'
  | 'r'
  | 's'
  | 't'
  | 'u'
  | 'v'
  | 'w'
  | 'x'
  | 'y'
  | 'z'
  | ''

export type KeyData = {
  label: Char | string
  type: string
}

export type LetterStatus =
  | 'empty'
  | 'active-entry'
  | 'invalid-letter'
  | 'wrong-position'
  | 'right-position'

export type TileData = {
  value: Char
  status: LetterStatus
}
