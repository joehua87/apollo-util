import { configure } from '@storybook/react'

function loadStories() {
  // Common
  require('../src/stories/login')
}

configure(loadStories, module)
