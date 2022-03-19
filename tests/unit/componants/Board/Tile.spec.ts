import { shallowMount, Wrapper } from '@vue/test-utils'
// import Vuex, { Store, ActionTree, GetterTree } from 'vuex'
import Tile from '@/components/Board/Tile.vue'
import { Char } from '@/types'

function* currentPropsDataGenerator(): IterableIterator<number | void> {
  const currentPropsData = ['', 'a', 'a', 'a', 'a']
  for (let i = 0; i < currentPropsData.length; i++) {
    yield currentPropsData[i]
  }
}
const getProps = currentPropsDataGenerator()

describe('Tile.vue', () => {
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    const propsData = getProps.next().value
    wrapper = shallowMount(Row, { propsData })
  })
  it('can be empty', () => {})
  // it('can have a letter value', () => {})
  // right here we will need to refactor how we store letter data
  // { value: letter, status: 'empty' | 'not-a-letter' | 'wrong-position' | 'right-position' }
  // it('can have an invalid letter', () => {})
  // it('can have a valid letter in the wrong place', () => {})
  // it('can have a valid letter in the right place', () => {})
})
