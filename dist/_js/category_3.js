/**
 * ...
 * @author Ogilvy Mather Digital - 衝康吉
 * Wellcome to read this source code.
 * I might try to use code name follow next row
 * 
 * init/get/set/is/clear/evt/with/sync
 * release/add/remove/addEventListener/on
 * ...
 */

var menuList, memberId = 0, sessionId, btnIndex, albumId = 0, albumList;
var blogThemeURL = "_img/category_3/blog_theme.jpg";
$(function() {$('#blog_theme').append("<img src='" + blogThemeURL + "'>"); getMenuData(); });
function getMenuData() {$.ajax({type: "GET", url: "AjaxGetTraineeMenu.aspx", contentType: "application/text; charset=utf-8", dataType: "text", success: function(data) {menuList = eval("(" + data + ")"); getBlogData(addBlogId()); addMenuList(); sortMenu(false); addMenuEvents(); function sorter(b, c) {return c - b; }; }, error: function(err) {if (confirm('資料讀取失敗!頁面即將重新整理!')) window.location.reload(); } }); }
function getAlbumData() {if (albumId == sessionId) return; $('#album_container').empty(); $.ajax({type: "GET", url: "AjaxGetAlbum.aspx", contentType: "application/text; charset=utf-8", dataType: "text", data: "id=" + memberId + "&periodId=" + sessionId, success: function(data) {var album = eval("(" + data + ")"); var year; for (var i in album) {albumList = album[i]; for (var j = 0; j < album[i].length; j++) {if (j == 0) year = album[i][j].year; $('#album_container').append(getAlbumStyle(album[i][j])); sortPhoto(); } } $('#album_title').css('background-image', 'url(_img/category_3/years/' + year + '.png)'); albumId = sessionId; addAlbumEvents(); } }); }
function getBlogData(req) {if (albumId != 0) {var time = Math.abs((scrollTop.get() - menu_links[3][0].top) * .0005) < .5 ? .5 : Math.abs((scrollTop.get() - menu_links[3][0].top) * .0005); scrollTop.moveTo($('#blog_container').position().top - 179, time); } $.ajax({type: "GET", url: "AjaxGetTraineeData.aspx", contentType: "application/text; charset=utf-8", dataType: "text", data: "id=" + req.id + "&periodId=" + req.periodId, success: function(data) {data = eval("(" + data + ")"); $('#blog_container').animate({opacity: 0 }, 200, 'swing', function() {for (var i in data) {$('#blog_title').html(data[i][0].periodTitle + " " + data[i][0].name); var feed = htmlDecodeByRegExp(decodeURIComponent(data[i][0].feedback)); $('#blog_body').html(feed); getAlbumData(); menu_links[3][1].top = $('.white_style').position().top - 179; if (albumId == 0 && window.location.toString().split("#")[1] == menu_links[3][1].name){scrollTop.moveTo(menu_links[3][1].top, 0); var imageCoung = 0; $('#blog_body img').load(function(){imageCoung++; if(imageCoung == $('#blog_body img').length) {setTimeout(function(){scrollTop.moveTo(menu_links[3][1].top, 0); },300); } }) } } $('#blog_container').animate({opacity: 1 }, 200, 'swing'); }); }, error: function(err) {if (confirm('資料讀取失敗!頁面即將重新整理!')) window.location.reload(); } }); }
function evtTop() {var time = Math.abs((scrollTop.get() - menu_links[3][0].top) * .0005) < .5 ? .5 : Math.abs((scrollTop.get() - menu_links[3][0].top) * .0005); scrollTop.moveTo(738, time); }
function evtBlogClick() {if ($(this).attr('id') == undefined) return; var n = $(this).attr('id').split('_'); var id = n[1]; var pid = n[2]; if (id == memberId) return; memberId = id; sessionId = pid; getBlogData({id: id, periodId: pid }); sortBtn(); }
function evtSessionClick() {sortMenu(true, $(this).attr('id').slice(1)); }
function sortMenu(motion,id) {var containers = $('.article_section_1_menu_session_container'); for(var i = 0; i < containers.length; i++) {var c = $(containers[i]).attr('id').slice(1); var sid = id == undefined ? sessionId : id; if(motion) {if(sid == c) $('#p' + c).animate({'height': $('#p' + c).children().length * 42 + 'px'}, 500, 'swing'); else $(containers[i]).animate({'height': 42 + 'px'}, 500, 'swing'); } else {if(sid == c) $('#p' + c).height($('#p' + c).children().length * 42); else $(containers[i]).height(42); } } }
function sortPhoto() {$('.album_photo img').each(function(e) {$(this).load(function() {new fit($(this).parent(), $(this).width(), $(this).height()).setSize(); }) }) }
function sortBtn() {var btn = $('.article_section_1_menu_session'); for(var i = 0; i < btn.length; i++) {var name = $(btn[i]).attr('id'); if(name != undefined) {if($(btn[i]).hasClass('menu_member_on')) $(btn[i]).removeClass('menu_member_on'); if($(btn[i]).hasClass('menu_member_off')) $(btn[i]).removeClass('menu_member_off'); var id = name.split("_")[1]; if(id == memberId) $(btn[i]).addClass('menu_member_on'); else $(btn[i]).addClass('menu_member_off'); } } }
function addAlbumEvents() {$('.album_photo').click(function() {var id = $(this).attr('id').slice(5); for (var i = 0; i < albumList.length; i++) {if (albumList[i].id == id) {$('#album_box').css({'background-image': 'url(' + HTMLDecode(decodeURIComponent(albumList[i].base64)) + ')', 'visibility': 'visible', 'opacity': 0 }); $('#album_box').append("<img id='imgBox' src='" + HTMLDecode(decodeURIComponent(albumList[i].base64)) + "'>"); $('#imgBox').load(function() {align.setx($('#album_close'), "C", $(this).width() * .5); align.sety($('#album_close'), "C", 0 - $(this).height() * .5); $(this).remove(); $('#album_box').animate({opacity: 1 }, 200, 'swing'); }); break; } } }) }
function addMenuEvents() {var containers = $('.article_section_1_menu_session_container'); for (var i = 0; i < containers.length; i++) {var c = $(containers[i]); c.click(evtSessionClick); for (var j = 0; j < c.children().length; j++) {var btn = c.children()[j]; $(btn).click(evtBlogClick); } } $('#btn_top').click(evtTop); $('#album_box').click(function() {$(this).css('visibility', 'hidden') }); }
function addMenuList () {for(var i in menuList) {var pid = menuList[i][0] == undefined ? undefined : menuList[i][0].periodId; $('#article_section_1_menu').append(getMenuStyle(i, pid, menuList[i])); } }
function addBlogId() {if (memberId == 0) {for (var i in menuList) {if (menuList[i].length != 0) {memberId = menuList[i][0].id; sessionId = menuList[i][0].periodId; } } } else {for (var i in menuList) {var o = menuList[i]; for (var j in o) {if (o[j].id == memberId) {memberId = menuList[i][0].id; sessionId = menuList[i][0].periodId; break; } } } } return {id: memberId, periodId: sessionId }; }
function getMenuStyle (sessionName, periodId, members) {if(periodId == undefined) return ""; var mem = ""; for(var i = 0; i < members.length; i++) {var index = ""; if(members[i].id == memberId) index = "on"; else index = "off"; mem += "<div id='btn_" + members[i].id + "_" + periodId + "' class='article_section_1_menu_session menu_member_" + index + "'>" + members[i].name + "</div>"; } var op = "<div id='p" + periodId + "' class='article_section_1_menu_session_container'>" + "<div class='article_section_1_menu_session menu_session'>" + sessionName + "</div>" + mem + "</div>"; return op; }
function getAlbumStyle(content) {var op = "<div id='photo" + content.id + "' class='album_photo'><img src='" + HTMLDecode(decodeURIComponent(content.base64thumb)) + "'></div>"; return op; }