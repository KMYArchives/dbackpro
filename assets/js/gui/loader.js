const layout = new Layout
const top_bar = new TopBar(el_topbar)
const frame_bar = new FrameBar(el_framebar)
const status_bar = new StatusBar(el_statusbar)
const status_bar_labels = new StatusBarLabels(el_statusbar)

layout.render()
top_bar.render()
frame_bar.render()
status_bar.render()