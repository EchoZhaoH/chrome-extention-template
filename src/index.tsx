import * as React from 'react'
import * as ReactDom from 'react-dom'
import { Platform } from '@root/platform'

import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import './style.scss'

ReactDom.render(
    <React.StrictMode>
        <Platform />
    </React.StrictMode>,
    document.body
)