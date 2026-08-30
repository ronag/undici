'use strict'

;(async () => {
  try {
    await import('./utils/esm-default-dispatcher.mjs')
  } catch (error) {
    console.error(error.stack)
    process.exitCode = 1
  }
})()
