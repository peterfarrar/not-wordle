import { shallowMount, Wrapper } from '@vue/test-utils'
import Board from '@/components/Board/Board.vue'
import Row from '@/components/Board/Row.vue'

describe('Screen.vue', () => {
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
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
