"use strict";$(function(a){$(close_btn).on("click",function(a){Windows.main_window_close()}),$(minimize_btn).on("click",function(a){Windows.main_window_minimize()})});var layout=new Layout,top_bar=new TopBar(el_topbar),toolbox=new Toolbox(el_toolbox),frame_bar=new FrameBar(el_framebar),status_bar=new StatusBar(el_statusbar),status_bar_labels=new StatusBarLabels(el_statusbar);layout.render(),toolbox.render(),top_bar.render(),frame_bar.render(),status_bar.render(),ToolboxTabs.official(),ListConnections.page_load();