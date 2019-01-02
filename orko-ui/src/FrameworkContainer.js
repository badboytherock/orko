import React from "react"
import { connect } from "react-redux"
import * as uiActions from "./store/ui/actions"
import { getAllPanels, getAllLayouts } from "./selectors/ui"
import Framework from "./Framework"

const windowToBreakpoint = () =>
  window.innerWidth < 1630 ? (window.innerWidth < 992 ? "sm" : "md") : "lg"

class FrameworkContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: window.innerWidth <= 500,
      breakpoint: windowToBreakpoint(),
      showSettings: false
    }
  }

  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange)
  }

  handleWindowSizeChange = () => {
    const isMobile = window.innerWidth <= 500
    const breakpoint = windowToBreakpoint()
    if (
      isMobile !== this.state.isMobile ||
      breakpoint !== this.state.breakpoint
    )
      this.setState({ isMobile, breakpoint })
  }

  onResetLayout = () => {
    this.props.dispatch(uiActions.resetPanels())
    this.props.dispatch(uiActions.resetLayouts())
  }

  onTogglePanelVisible = id => {
    this.props.dispatch(uiActions.togglePanelVisible(id))
  }

  onTogglePanelAttached = id => {
    this.props.dispatch(uiActions.togglePanelAttached(id))
  }

  onMovePanel = (key, d) => {
    this.props.dispatch(uiActions.movePanel(key, d))
  }

  onResizePanel = (key, d) => {
    this.props.dispatch(uiActions.resizePanel(key, d))
  }

  onLayoutChange = (layout, layouts) => {
    this.props.dispatch(uiActions.updateLayouts(layouts))
  }

  onToggleViewSettings = () => {
    this.setState(state => ({ showSettings: !state.showSettings }))
  }

  render() {
    return (
      <Framework
        isMobile={this.state.isMobile}
        showSettings={this.state.showSettings}
        panels={this.props.panels}
        layouts={this.props.layouts}
        layoutsAsObj={this.props.layoutsAsObj[this.state.breakpoint]}
        onToggleViewSettings={this.onToggleViewSettings}
        onHidePanel={this.onHidePanel}
        onTogglePanelAttached={this.onTogglePanelAttached}
        onTogglePanelVisible={this.onTogglePanelVisible}
        onResetLayout={this.onResetLayout}
        onLayoutChange={this.onLayoutChange}
        onMovePanel={this.onMovePanel}
        onResizePanel={this.onResizePanel}
      />
    )
  }
}

export default connect(state => ({
  panels: getAllPanels(state),
  layouts: getAllLayouts(state),
  layoutsAsObj: state.ui.layouts
}))(FrameworkContainer)
