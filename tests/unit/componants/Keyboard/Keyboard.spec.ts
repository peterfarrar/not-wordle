import { shallowMount, Wrapper } from '@vue/test-utils'
import KeyBoard from '@/components/KeyBoard/KeyBoard.vue'
import Row from '@/components/KeyBoard/Row.vue'

describe('Screen.vue', () => {
  let wrapper: Wrapper<Vue>
  beforeEach(() => {
    wrapper = shallowMount(KeyBoard)
  })
  it('contains Row component(s)', () => {
    expect(wrapper.findComponent(Row).exists()).toBe(true)
  })

  it('contains three rows', () => {
    const rows = wrapper.findAllComponents(Row)
    expect(rows.length).toBe(3)
  })
})
