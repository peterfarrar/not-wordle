import { shallowMount, Wrapper } from '@vue/test-utils'
// import Vuex, { Store, ActionTree, GetterTree } from 'vuex'
import Tile from '@/components/Board/Tile.vue'
import { Char, TileData } from '@/types'

function* currentPropsDataGenerator(): IterableIterator<TileData | void> {
  const currentPropsData: TileData[] = [
    { value: '', status: 'empty' },
    { value: 'a', status: 'active-entry' },
    { value: 'a', status: 'invalid-letter' },
    { value: 'a', status: 'wrong-position' },
    { value: 'a', status: 'right-position' },]
  for (let i = 0; i < currentPropsData.length; i++) {
    yield currentPropsData[i]
  }
}
const getProps = currentPropsDataGenerator()

describe('Tile.vue', () => {
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    const propsData = { tileData: getProps.next().value }
    wrapper = shallowMount(Tile, { propsData })
  })

  it('can be empty', () => {
    expect(wrapper.text()).toBe('')
  })

  it('can have a letter value', () => {
    expect(wrapper.text()).toBe('a')
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
})
