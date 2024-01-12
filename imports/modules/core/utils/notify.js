import { toast } from 'vue3-toastify'
import { Options } from './config/notify.config'

const notify = {
  success: (message) =>
    toast.success(message, {
      autoClose: Options.autoClose,
      transition: Options.transition,
      position: Options.position,
      // Persist toast when route path change
      clearOnUrlChange: false,
    }),
  error: (message) =>
    toast.error(message, {
      autoClose: Options.autoClose,
      transition: Options.transition,
      position: Options.position,
    }),
  warn: (message) =>
    toast.warning(message, {
      autoClose: Options.autoClose,
      transition: Options.transition,
      position: Options.position,
    }),
  info: (message) =>
    toast.info(message, {
      autoClose: Options.autoClose,
      transition: Options.transition,
      position: Options.position,
    }),
}

export default notify
