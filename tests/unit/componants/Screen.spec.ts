import { createLocalVue, shallowMount, mount, Wrapper } from '@vue/test-utils'
import Vuex, { Store, ActionTree, GetterTree } from 'vuex'
import Screen from '@/components/Screen.vue'
import Board from '@/components/Board/Board.vue'
import { Char } from '@/types'

const localVue = createLocalVue()
localVue.use(Vuex)

function* currentLettersGenerator(): IterableIterator<Char[] | void> {
  const currentLetters = [['a'], ['a'], ['a'], ['a'], ['b', 'i', 'r', 'd', 's']] as Char[][]
  for (let i = 0; i < currentLetters.length; i++) {
    yield currentLetters[i]
  }
}
const nextLetters = currentLettersGenerator()

describe('Screen.vue', () => {
  let actions: ActionTree<unknown, unknown>
  let getters: GetterTree<unknown, unknown>
  let store: Store<unknown>
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    actions = {
      addLetterToCurrentLetters: jest.fn(),
      addCurrentWordToAllWords: jest.fn(),
      removeLetterFromCurrentLetters: jest.fn(),
    }
    getters = {
      currentLetters: () => nextLetters.next().value,
    }
    store = new Vuex.Store({
      getters,
      actions,
    })
    wrapper = mount(Screen, { store, localVue })
  })
  it('contains Board component(s)', () => {
    expect(wrapper.findComponent(Board).exists()).toBe(true)
  })

  it('renders a single Board components', () => {
    const board = wrapper.findAllComponents(Board)
    expect(board.length).toBe(1)
  })

  it('should call action addLetterToCurrentLetters when a letter key is pressed', () => {
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'a',
        keyCode: 65,
        code: 'KeyA',
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
      })
    )
    expect(actions.addLetterToCurrentLetters).toHaveBeenCalled()
  })

  it('should add remove letter to the thisWord[] array when the backspace key is pressed', () => {
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Backspace',
        keyCode: 8,
        code: 'Backspace',
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
      })
    )
    expect(actions.removeLetterFromCurrentLetters).toHaveBeenCalled()
  })

  it('should add the current word to the store and clear thisWord[] when enter is pressed and there are five letters in thisWord', () => {
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'b',
        keyCode: 66,
        code: 'KeyB',
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
      })
    )
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'i',
        keyCode: 73,
        code: 'KeyI',
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
      })
    )
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'r',
        keyCode: 82,
        code: 'KeyR',
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
      })
    )
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'd',
        keyCode: 68,
        code: 'KeyD',
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
      })
    )
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 's',
        keyCode: 83,
        code: 'KeyS',
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
      })
    )
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'Enter',
        keyCode: 13,
        code: 'Enter',
        shiftKey: false,
        ctrlKey: false,
        metaKey: false,
      })
    )
    expect(actions.addCurrentWordToAllWords).toHaveBeenCalled()
  })
})
