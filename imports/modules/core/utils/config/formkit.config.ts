import type { DefaultConfigOptions } from '@formkit/vue'
import { genesisIcons } from '@formkit/icons'
const fkConfig: DefaultConfigOptions = {
    theme: 'genesis',
    icons: { ...genesisIcons },
    config: {
        // classes: {
        //     wrapper: { $reset: true }
        // },
    }
}

export default fkConfig