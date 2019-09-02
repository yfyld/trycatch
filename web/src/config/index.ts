import defaultConfig from './defaultConfig'
import { getBaseURL } from '@/utils'

const config = {
  ...defaultConfig
}

if (!config.baseURL) {
  config.baseURL = getBaseURL()
}

export default config
