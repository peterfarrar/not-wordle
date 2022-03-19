import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
import Vuex, { Store, ActionTree, GetterTree } from 'vuex'
import Row from '@/components/Board/Row.vue'
import Tile from '@/components/Board/Tile.vue'
import { Char } from '@/types'

const localVue = createLocalVue()
localVue.use(Vuex)

function* currentRowGenerator(): IterableIterator<number | void> {
  const currentRow = [0, 0, 1, 2, 4]
  for (let i = 0; i < currentRow.length; i++) {
    yield currentRow[i]
  }
}
const nextRow = currentRowGenerator()

function* allWordsGenerator(): IterableIterator<Char[][] | void> {
  const partial: Char[][] = [
    ['s', 'n', 'a', 'k', 'e'],
    ['b', 'i', 'r', 'd', 's'],
    ['d', 'r'],
  ]

  const allWords = [[], [], partial, partial, []]
  for (let i = 0; i < allWords.length; i++) {
    yield allWords[i]
  }
}
const nextAllWordsData = allWordsGenerator()

describe('Row.vue', () => {
  let actions: ActionTree<unknown, unknown>
  let getters: GetterTree<unknown, unknown>
  let store: Store<unknown>
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    actions = {}
    getters = {
      activeRow: () => nextRow.next().value,
      currentLetters: () => ['b', 'i', 'r'],
      allWords: () => nextAllWordsData.next().value,
    }
    store = new Vuex.Store({
      getters,
      actions,
    })
    const propsData = { rowId: 1 }

    wrapper = mount(Row, { propsData, store, localVue })
  })

  it('contains tiles', () => {
    expect(wrapper.findComponent(Tile).exists()).toBe(true)
  })

  it('contains five tiles', () => {
    const tiles = wrapper.findAllComponents(Tile)
    expect(tiles.length).toBe(5)
  })

  it('can be the current row', () => {
    const tiles = wrapper.findAllComponents(Tile)
    expect(tiles.at(0).text()).toBe('b')
    expect(tiles.at(1).text()).toBe('i')
    expect(tiles.at(2).text()).toBe('r')
    expect(tiles.at(3).text()).toBe('')
    expect(tiles.at(4).text()).toBe('')
  })

  it('can be the a completed row', () => {
    const tiles = wrapper.findAllComponents(Tile)
    expect(tiles.at(0).text()).toBe('b')
    expect(tiles.at(1).text()).toBe('i')
    expect(tiles.at(2).text()).toBe('r')
    expect(tiles.at(3).text()).toBe('d')
    expect(tiles.at(4).text()).toBe('s')
  })

  it('can be the an empty row', () => {
    const tiles = wrapper.findAllComponents(Tile)
    expect(tiles.at(0).text()).toBe('')
    expect(tiles.at(1).text()).toBe('')
    expect(tiles.at(2).text()).toBe('')
    expect(tiles.at(3).text()).toBe('')
    expect(tiles.at(4).text()).toBe('')
  })
})
