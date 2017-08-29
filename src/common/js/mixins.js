export const tabMixin = {
  activated () {
    this.mounted()
  },
  deactivated () {
    this.beforeDestroy()
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  }
}
