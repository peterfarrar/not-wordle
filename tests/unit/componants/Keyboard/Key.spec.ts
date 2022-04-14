import { Wrapper, createLocalVue, mount } from '@vue/test-utils'
import Vuex, { Store, GetterTree } from 'vuex'
import Key from '@/components/KeyBoard/Key.vue'
// import { Char, LetterStatus } from '@/types'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Key.vue', () => {
  // const usedLetters = {
  //   a: 'invalid-letter',
  //   e: 'invalid-letter',
  //   m: 'invalid-letter',
  //   s: 'right-position',
  //   t: 'wrong-position',
  // } as Record<Char, LetterStatus>

  let getters: GetterTree<unknown, unknown>
  let store: Store<unknown>
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    getters = {
      // getUsedLetters: () => usedLetters,
    }
    store = new Vuex.Store({
      getters,
    })
    const propsData = { label: 'S', type: 'letter' }
    wrapper = mount(Key, { store, localVue, propsData })
  })

  it('can have a letter value', () => {
    expect(wrapper.text()).toBe('S')
  })
})
