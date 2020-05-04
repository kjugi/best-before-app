import { ref, watch } from '@vue/composition-api'

export function initFunction () {
  // Notify logic
  const isMessageShowed = ref(false)
  const messageClasses = ref('')
  const message = ref('')

  watch(isMessageShowed, (newValue) => {
    if (newValue) {
      toggleMessage()
    }
  })

  function toggleMessage (data = 5000) {
    setTimeout(() => {
      isMessageShowed.value = false
      messageClasses.value = ''
      message.value = ''
    }, data)
  }

  function showMessage (data) {
    isMessageShowed.value = data.status
    messageClasses.value = data.messageClass || ''
    message.value = data.message
  }

  return {
    isMessageShowed,
    message,
    messageClasses,
    toggleMessage,
    showMessage
  }
}
