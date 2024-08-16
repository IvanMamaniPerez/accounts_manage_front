
enum ConfigToast {
  error = 'error',
  success = 'success',
  warning = 'warning',
  info = 'info',
  loader = 'loader'
}

type BaseOptionsToast = {
  id: string
  title: string
}

function getConfigToastLoader(options: BaseOptionsToast) {
  const title: string = options.title + "<div class='toast__loader'></div>"
  return {
    id: options.id,
    title: title,
    timeout: 0,
    closeButton: { disabled: true, active: false },
  }
}

function getConfigToastError(options: BaseOptionsToast) {
  return {
    id: options.id,
    title: options.title,
    timeout: 5000,
    ui: {
      background: 'bg-red-400 dark:bg-red-500',
      progress: {
        background: 'bg-red-500 dark:bg-red-600'
      }
    }
  }
}

function getConfigToast(type: ConfigToast, options: BaseOptionsToast): BaseOptionsToast {

  switch (type) {
    case ConfigToast.loader:
      return getConfigToastLoader(options)
    case ConfigToast.error:
      return getConfigToastError(options)
    default:
      return options

  }
  //if(type === 'success') return getConfigToastSuccess(options)
  //if(type === 'warning') return getConfigToastWarning(options)
  //if(type === 'info') return getConfigToastInfo(options)
}

export { type BaseOptionsToast, ConfigToast, getConfigToast }