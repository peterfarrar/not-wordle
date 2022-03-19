import { createLocalVue, mount, shallowMount, Wrapper } from '@vue/test-utils'
import Vuex, { Store, ActionTree, GetterTree } from 'vuex'
import Board from '@/components/Board/Board.vue'
import Row from '@/components/Board/Row.vue'
// import { Char } from '@/types'

// const localVue = createLocalVue()
// localVue.use(Vuex)

// function* currentLettersGenerator(): IterableIterator<Char[] | void> {
//   const currentLetters = [[''], [''], ['a'], ['a'], ['b', 'i', 'r', 'd', 's']] as Char[][]
//   for (let i = 0; i < currentLetters.length; i++) {
//     yield currentLetters[i]
//   }
// }
// const nextLetters = currentLettersGenerator()

describe('Screen.vue', () => {
  // let actions: ActionTree<unknown, unknown>
  // let getters: GetterTree<unknown, unknown>
  // let store: Store<unknown>
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    // actions = {
    //   addLetterToCurrentLetters: jest.fn(),
    //   addCurrentWordToAllWords: jest.fn(),
    //   removeLetterFromCurrentLetters: jest.fn(),
    // }
    // getters = {
    //   currentLetters: () => nextLetters.next().value,
    // }
    // store = new Vuex.Store({
    //   getters,
    //   actions,
    // })
    // wrapper = mount(Board, { store, localVue })
    wrapper = shallowMount(Board)
  })
  it('contains Row component(s)', () => {
    expect(wrapper.findComponent(Row).exists()).toBe(true)
  })

  it('contains six rows', () => {
    const rows = wrapper.findAllComponents(Row)
    expect(rows.length).toBe(6)
  })

})
