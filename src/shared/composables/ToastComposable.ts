import { useToast } from "#imports"

type BaseOptionsToast = {
  id: string
  title: string
}

export const useToastComposable = () => {

  const toast = useToast()

  function showLoaderToast(options: BaseOptionsToast): void {
    const title: string = options.title + "<div class='toast__loader'></div>"
    toast.add({
      id: options.id,
      title: title,
      timeout: 0,
      closeButton: { disabled: true, active: false },
      ui: {
        background: 'bg-cyan-400 dark:bg-cyan-700',
      }
    })
  }

  function showErrorToast(options: BaseOptionsToast): void {
    toast.add({
      id: options.id,
      title: options.title,
      timeout: 5000,
      ui: {
        background: 'bg-red-400 dark:bg-red-500',
        progress: {
          background: 'bg-red-500 dark:bg-red-600'
        }
      }
    })
  }

  function showInfoToast(options: BaseOptionsToast): void {
    toast.add({
      id: options.id,
      title: options.title,
      timeout: 5000,
      ui: {
        background: 'bg-cyan-400 dark:bg-cyan-700',
        progress: {
          background: 'bg-cyan-700 dark:bg-white',
        }
      }
    })
  }

  function showSuccessToast(options: BaseOptionsToast): void {
    toast.add({
      id: options.id,
      title: options.title + '<div class="wrapper__success"> <svg class="checkmark__success" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle class="checkmark__circle__success" cx="26" cy="26" r="25" fill="none"/> <path class="checkmark__check__success" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg></div>',
      timeout: 5000,
      ui: {
        background: 'bg-green-400 dark:bg-green-900',
        progress: {
          background: 'bg-green-800 dark:bg-green-500'
        }
      }
    })
  }

  function removeToast(id: string): void {
    toast.remove(id)
  }

  return {
    showLoaderToast,
    showErrorToast,
    showInfoToast,
    showSuccessToast,
    removeToast,
  }
}
