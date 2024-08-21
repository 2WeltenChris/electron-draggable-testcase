const colors = {
  'primary': '',
  'secondary': '',
  'background': '',
}

module.exports = {
  mode: 'jit',
  content: ['**/*.{html,svelte}'],
  theme: {
    extend: {
      colors
    }
  }
}
