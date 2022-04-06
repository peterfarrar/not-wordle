import { createLocalVue, mount, Wrapper } from '@vue/test-utils'
// import Vuex, { Store, ActionTree, GetterTree } from 'vuex'
import Vuex from 'vuex'
import Row from '@/components/KeyBoard/Row.vue'
import Key from '@/components/KeyBoard/Key.vue'
import { KeyData } from '@/types'
import { row1Data, row2Data, row3Data } from '@/components/KeyBoard/keyBoardRows'

const localVue = createLocalVue()
localVue.use(Vuex)

function* rowDataGenerator(): IterableIterator<KeyData[] | void> {
  const currentTest: KeyData[][] = [row1Data, row1Data]
  for (let i = 0; i < currentTest.length; i++) {
    yield currentTest[i]
  }
}
const rowData = rowDataGenerator()

// function* allWordsGenerator(): IterableIterator<TileData[][] | void> {
//   const partial: TileData[][] = [
//     [
//       { value: 's', status: 'right-position' },
//       { value: 'n', status: 'invalid-letter' },
//       { value: 'a', status: 'wrong-position' },
//       { value: 'k', status: 'invalid-letter' },
//       { value: 'e', status: 'invalid-letter' },
//     ],
//     [
//       { value: 'b', status: 'invalid-letter' },
//       { value: 'i', status: 'invalid-letter' },
//       { value: 'r', status: 'invalid-letter' },
//       { value: 'd', status: 'invalid-letter' },
//       { value: 's', status: 'wrong-position' },
//     ],
//   ]

//   const allWords = [[], [], [], partial, []]
//   for (let i = 0; i < allWords.length; i++) {
//     yield allWords[i]
//   }
// }
// const nextAllWordsData = allWordsGenerator()

describe('Row.vue', () => {
  describe('Top Row', () => {
    // let actions: ActionTree<unknown, unknown>
    // let getters: GetterTree<unknown, unknown>
    // let store: Store<unknown>
    let wrapper: Wrapper<Vue>
    beforeEach(() => {
      // actions = {}
      // getters = {
      //   activeRow: () => nextRow.next().value,
      //   currentLetters: () => ['b', 'i', 'r'],
      //   allWords: () => nextAllWordsData.next().value,
      // }
      // store = new Vuex.Store({
      //   getters,
      //   actions,
      // })
      const propsData = { keysData: row1Data }

      // wrapper = mount(Row, { propsData, store, localVue })
      wrapper = mount(Row, { propsData, localVue })
    })

    it('contains keys', () => {
      expect(wrapper.findComponent(Key).exists()).toBe(true)
    })

    it('contains ten keys', () => {
      const tiles = wrapper.findAllComponents(Key)
      expect(tiles.length).toBe(10)
    })

    it('contains the correct keys', () => {
      const keys = wrapper.findAllComponents(Key)
      expect(keys.at(0).text()).toBe('Q')
      expect(keys.at(1).text()).toBe('W')
      expect(keys.at(2).text()).toBe('E')
      expect(keys.at(3).text()).toBe('R')
      expect(keys.at(4).text()).toBe('T')
      expect(keys.at(5).text()).toBe('Y')
      expect(keys.at(6).text()).toBe('U')
      expect(keys.at(7).text()).toBe('I')
      expect(keys.at(8).text()).toBe('O')
      expect(keys.at(9).text()).toBe('P')
    })

    // it('can be the a completed row', () => {
    //   const tiles = wrapper.findAllComponents(Tile)
    //   expect(tiles.at(0).find('.tile-face.front').text()).toBe('b')
    //   expect(tiles.at(1).find('.tile-face.front').text()).toBe('i')
    //   expect(tiles.at(2).find('.tile-face.front').text()).toBe('r')
    //   expect(tiles.at(3).find('.tile-face.front').text()).toBe('d')
    //   expect(tiles.at(4).find('.tile-face.front').text()).toBe('s')
    // })

    // it('can be the an empty row', () => {
    //   const tiles = wrapper.findAllComponents(Tile)
    //   expect(tiles.at(0).find('.tile-face.front').text()).toBe('')
    //   expect(tiles.at(1).find('.tile-face.front').text()).toBe('')
    //   expect(tiles.at(2).find('.tile-face.front').text()).toBe('')
    //   expect(tiles.at(3).find('.tile-face.front').text()).toBe('')
    //   expect(tiles.at(4).find('.tile-face.front').text()).toBe('')
    // })
  })
})
