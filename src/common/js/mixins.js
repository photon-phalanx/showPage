export const tabMixin = {
  activated () {
    console.log('rank page is mounted')
    this.mounted()
  },
  deactivated () {
    this.beforeDestroy()
  },
  beforeDestroy () {
    console.log('timer has been cleared')
    clearTimeout(this.timer)
  }
}
