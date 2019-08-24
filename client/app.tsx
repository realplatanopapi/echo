import React from 'react'
import { render } from 'react-dom'
import { hot } from 'react-hot-loader/root'

import Root from './src/root'

const ComponentToRender =
  process.env.NODE_ENV === 'production' ? Root : hot(Root)

render(<ComponentToRender />, document.getElementById('root'))
