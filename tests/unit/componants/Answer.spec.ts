import { Wrapper, createLocalVue, mount } from '@vue/test-utils'
import Vuex, { Store, GetterTree } from 'vuex'
import Answer from '@/components/Answer.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Answer.vue', () => {
  let getters: GetterTree<unknown, unknown>
  let store: Store<unknown>
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    getters = {
      getTheWord: () => 'birds',
    }
    store = new Vuex.Store({
      getters,
    })
    wrapper = mount(Answer, { store, localVue })
  })

  it('it has the word', () => {
    expect(wrapper.text()).toBe('birds')
  })
})
