const layout = new Layout()
const top_bar = new TopBar(el_topbar)
const frame_bar = new FrameBar(el_framebar)

layout.render()
top_bar.render()
frame_bar.render()

RealTime.tasks()
ListConnections.page_load()