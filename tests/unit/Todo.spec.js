
import { mount } from '@vue/test-utils'
import Todo from '@/components/Todo.vue'

describe('Todo.vue Unit Tests', () => {
  it('adds a todo when valid text is entered', async () => {
    const wrapper = mount(Todo)
    const input = wrapper.find('input')
    await input.setValue('Buy milk')
    await input.trigger('keydown.enter')

    expect(wrapper.text()).toContain('Buy milk')
  })

  it('shows an error when trying to submit empty input', async () => {
    const wrapper = mount(Todo)
    const input = wrapper.find('input')
    await input.setValue('')
    await input.trigger('keydown.enter')

    expect(wrapper.text()).toContain('Todo cannot be empty')
  })

  it('deletes a todo item correctly', async () => {
    const wrapper = mount(Todo)
    const input = wrapper.find('input')
    await input.setValue('Buy eggs')
    await input.trigger('keydown.enter')

    // Confirm it's added
    expect(wrapper.text()).toContain('Buy eggs')

    // Delete the item
    await wrapper.find('button').trigger('click')

    expect(wrapper.text()).not.toContain('Buy eggs')
  })
})
