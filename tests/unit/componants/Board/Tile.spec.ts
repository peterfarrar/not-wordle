import { Wrapper, createLocalVue, mount } from '@vue/test-utils'
import Vuex, { Store, GetterTree } from 'vuex'
import Tile from '@/components/Board/Tile.vue'
import { TileData } from '@/types'

const localVue = createLocalVue()
localVue.use(Vuex)

function* allWordsGenerator(): IterableIterator<TileData[][] | void> {
  const twoRows: TileData[][] = [
    [
      { value: 's', status: 'right-position' },
      { value: 'n', status: 'invalid-letter' },
      { value: 'a', status: 'wrong-position' },
      { value: 'k', status: 'invalid-letter' },
      { value: 'w', status: 'invalid-letter' },
    ],
    [
      { value: 'b', status: 'invalid-letter' },
      { value: 'i', status: 'invalid-letter' },
      { value: 'r', status: 'invalid-letter' },
      { value: 'd', status: 'invalid-letter' },
      { value: 's', status: 'wrong-position' },
    ],
  ]

  const allWords = [[], [], [], [], [], [], twoRows]
  for (let i = 0; i < allWords.length; i++) {
    yield allWords[i]
  }
}
const nextAllWordsData = allWordsGenerator()

function* currentPropsDataGenerator(): IterableIterator<TileData | void> {
  const currentPropsData: TileData[] = [
    { value: '', status: 'empty' },
    { value: 'a', status: 'active-entry' },
    { value: 'a', status: 'invalid-letter' },
    { value: 'a', status: 'wrong-position' },
    { value: 'a', status: 'right-position' },
    { value: '', status: 'empty' },
    { value: 'a', status: 'right-position' },
  ]
  for (let i = 0; i < currentPropsData.length; i++) {
    yield currentPropsData[i]
  }
}
const getProps = currentPropsDataGenerator()

describe('Tile.vue', () => {
  let getters: GetterTree<unknown, unknown>
  let store: Store<unknown>
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    getters = {
      activeRow: () => 1,
      allWords: () => nextAllWordsData.next().value,
    }
    store = new Vuex.Store({
      getters,
    })
    const propsData = { tileData: getProps.next().value, tileId: '1', rowId: '2' }
    wrapper = mount(Tile, { store, localVue, propsData })
  })

  it('can be empty', () => {
    expect(wrapper.text()).toBe('')
  })

  it('can have a letter value', () => {
    expect(wrapper.find('.tile-face').text()).toBe('a')
  })

  it('can have an invalid letter', () => {
    expect(wrapper.find('.invalid-letter').exists()).toBe(true)
  })

  it('can have a valid letter in the wrong place', () => {
    expect(wrapper.find('.wrong-position').exists()).toBe(true)
  })

  it('can have a valid letter in the right place', () => {
    expect(wrapper.find('.right-position').exists()).toBe(true)
  })

  it('has two faces', () => {
    expect(wrapper.findAll('.tile-face').length).toBe(2)
  })

  it('rotates when status is validated', () => {
    const rotateTile = jest.fn()
    wrapper.setMethods({ rotateTile })
    expect(rotateTile).toHaveBeenCalled()
  })
})
