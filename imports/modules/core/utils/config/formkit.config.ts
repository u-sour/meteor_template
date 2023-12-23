import type { DefaultConfigOptions } from '@formkit/vue'
import { genesisIcons } from '@formkit/icons'
const fkConfig: DefaultConfigOptions = {
    theme: 'genesis',
    icons: { ...genesisIcons }
}

export default fkConfig