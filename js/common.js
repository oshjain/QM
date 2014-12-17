if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback, thisArg) {
    var T, k;
    if (this == null) {
      throw new TypeError(" this is null or not defined");
    }
    var O = Object(this), len = O.length >>> 0;
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }
    if (arguments.length > 1) { T = thisArg; }
    k = 0;
    while (k < len) {
      var kValue;
      if (k in O) {
        kValue = O[k];
        callback.call(T, kValue, k, O);
      }
      k++;
    }
  };
}



var line;

var tableBuilder, desPos;
	

var sample = {
	Employee: {
		alias: "Employee",
		data: [
		{col: "employee_id", alias: "Employee ID", type: "double", primary: true},
		{col: "employee name", alias: "Employee Name", type: "char"},
		{col: "employee_id", alias: "Employee ID", type: "double"},
		{col: "employee name", alias: "Employee Namedsdasdadasd", type: "char"},
		{col: "employee_id", alias: "Employee ID", type: "double"},
		{col: "employee name", alias: "Employee Name", type: "char"},
		{col: "employee age", alias: "Employee Age", type: "int"}
	]},
	Products: {
		alias: "Products",
		data : [
		{col: "product_id", alias: "Product ID", type: "double", primary: true},
		{col: "product name", alias: "product Name", type: "char"},
		{col: "product price", alias: "product Price", type: "float/double"}
	]},
	Sales: {
		alias: "Sales",
		data : [
		{col: "sale_id", alias: "Sale ID", type: "double", primary: true},
		{col: "product name", alias: "product Name", type: "char"},
		{col: "sale amount", alias: "Sale Amount", type: "float/double"},
		{col: "sale curr", alias: "Sale Currency", type: "String"}
	]}
}


Raphael.fn.connection = function (obj1, obj2, line, bg) {
    if (obj1.line && obj1.from && obj1.to) {
        line = obj1;
        obj1 = line.from;
        obj2 = line.to;
    }
    var bb1 = obj1.getBBox(),
        bb2 = obj2.getBBox(),
        p = [{x: bb1.x + bb1.width / 2, y: bb1.y - 1},
        {x: bb1.x + bb1.width / 2, y: bb1.y + bb1.height + 1},
        {x: bb1.x - 1, y: bb1.y + bb1.height / 2},
        {x: bb1.x + bb1.width + 1, y: bb1.y + bb1.height / 2},
        {x: bb2.x + bb2.width / 2, y: bb2.y - 1},
        {x: bb2.x + bb2.width / 2, y: bb2.y + bb2.height + 1},
        {x: bb2.x - 1, y: bb2.y + bb2.height / 2},
        {x: bb2.x + bb2.width + 1, y: bb2.y + bb2.height / 2}],
        d = {}, dis = [];
    for (var i = 0; i < 4; i++) {
        for (var j = 4; j < 8; j++) {
            var dx = Math.abs(p[i].x - p[j].x),
                dy = Math.abs(p[i].y - p[j].y);
            if ((i == j - 4) || (((i != 3 && j != 6) || p[i].x < p[j].x) && ((i != 2 && j != 7) || p[i].x > p[j].x) && ((i != 0 && j != 5) || p[i].y > p[j].y) && ((i != 1 && j != 4) || p[i].y < p[j].y))) {
                dis.push(dx + dy);
                d[dis[dis.length - 1]] = [i, j];
            }
        }
    }
    if (dis.length == 0) {
        var res = [0, 4];
    } else {
        res = d[Math.min.apply(Math, dis)];
    }
    var x1 = p[res[0]].x,
        y1 = p[res[0]].y,
        x4 = p[res[1]].x,
        y4 = p[res[1]].y;
    dx = Math.max(Math.abs(x1 - x4) / 2, 10);
    dy = Math.max(Math.abs(y1 - y4) / 2, 10);
    var x2 = [x1, x1, x1 - dx, x1 + dx][res[0]].toFixed(3),
        y2 = [y1 - dy, y1 + dy, y1, y1][res[0]].toFixed(3),
        x3 = [0, 0, 0, 0, x4, x4, x4 - dx, x4 + dx][res[1]].toFixed(3),
        y3 = [0, 0, 0, 0, y1 + dy, y1 - dy, y4, y4][res[1]].toFixed(3);
    var path = ["M", x1.toFixed(3), y1.toFixed(3), "C", x2, y2, x3, y3, x4.toFixed(3), y4.toFixed(3)].join(",");
    if (line && line.line) {
        line.bg && line.bg.attr({path: path});
        line.line.attr({path: path});
    } else {
        var color = typeof line == "string" ? line : "#000";
        return {
            bg: bg && bg.split && this.path(path).attr({stroke: bg.split("|")[0], fill: "none", "stroke-width": bg.split("|")[1] || 3}),
            line: this.path(path).attr({stroke: color, fill: "none", "stroke-width" : 3, 'arrow-end': 'classic-wide-midium-blue', 'arrow-start': 'classic-wide-midium-red'}),
            from: obj1,
            to: obj2
        };
    }
};



var el, paper

Paper = {
	R: null,
	connections: [],
	dragger: function () {
        this.ox = this.type == "rect" ? this.attr("x") : this.attr("cx");
        this.oy = this.type == "rect" ? this.attr("y") : this.attr("cy");
        this.animate({"fill-opacity": .2}, 500);
    },
    move: function (dx, dy) {
        var att = this.type == "rect" ? {x: this.ox + dx, y: this.oy + dy} : {cx: this.ox + dx, cy: this.oy + dy};
        this.attr(att);
        for (var i = Paper.connections.length; i--;) {
            Paper.R.connection(Paper.connections[i]);
        }
        Paper.R.safari();
    },
    up: function () {
        this.animate({"fill-opacity": 0}, 500);
    },
    makeRect:function(l,t,h,w, props, attribs){
		r = this.R.rect( l,t,h,w )
		r.attr({fill: "blue", stroke: "blue", "fill-opacity": 0, "stroke-width": 2, cursor: "move"})
		if( props ){
			for(key in props){
				r[key] = props[key]
			}
		}
		if( attribs ){
			for( key in attribs ){
				r.attr({key: attribs[key]})
			}
		}
		r.drag( this.move, this.dragger, this.up )
		
		return r 
	},
    createConnection: function( dragged, dropped, ft, tt ){
		var Pos = this.getPosition( dragged, dropped )
		var from = this.makeRect( Pos.dragger.left, Pos.dragger.top, 20, 2, {side: Pos.dragger.side, attachedTo: dragged} )
		var to = this.makeRect( Pos.dropped.left, Pos.dropped.top, 20, 2, {side: Pos.dropped.side, attachedTo: dropped })
		var connector = this.R.connection( from, to,"#6598c7" ), line = connector.line
		this.applyEvents( line ).attachToParent( dragged, from, dropped, to )
		tableBuilder.tables.addJoin( ft, "Inner", dragged.text(), dropped.text(), tt )
		return this.connections.push( connector ), this
    
    },
    updateConnection: function(){
    },
    applyEvents: function( l ){
		l.click(this.connector.click)
		l.mouseover( this.connector.mouseover)
		l.mouseout( this.connector.mouseout )
		return this
	},
	attachToParent: function( d, f, e, t){
		var	data,beta ;
			data = $.data( d.offsetParent()[0], "C")
			if( undefined == data ){ data = [] }
			data.push({ z: f, tr: d })
			$.data( d.offsetParent()[0], "C", data)
			beta = $.data( e.offsetParent()[0], "C")
			if( undefined == beta ){ beta = [] }
			beta.push({ z: t, tr: e })
			$.data( e.offsetParent()[0], "C", beta)
		return this;
	}, 
	connector: {
		click: function(){
			alert("hello")
		
		},
		mouseover: function(){
			this.attr({"cursor" : "hand", stroke: 'red'})
		
		},
		mouseout: function(){
			this.attr({stroke: "#6598c7"});
		}
		
	
	},
    getPosition: function( elemDrag, elemDrop ){
		var dragPos = { side: "Left", top: elemDrag.position().top + elemDrag.offsetParent().position().top + 12, left: elemDrag.offsetParent().position().left + desPos.left }
		var dropPos = { side: "Left", top: elemDrop.position().top + elemDrop.offsetParent().position().top + 12, left: elemDrop.offsetParent().position().left + desPos.left }
		var side = this.onSide( dragPos.left, dropPos.left );
		if( side.dragger == "Right" ){
			dropPos.left += 130 
			dropPos.side = "Right"
		} else {
			dragPos.left += 130;
			dragPos.side = "Right"
		}
		return { dragger: dragPos, dropped: dropPos }
    },
    onSide: function( draggedLeft, droppedLeft ){
		var s = (draggedLeft > droppedLeft )  
			?	{ dragger: "Right", dropped : "Left" }
			:	{ dragger: "Left", dropped : "Right" }
		return s
			
	},
	clear: function(){
		return this.R.clear()
	}
		
}
   

function rPosOnDesigner(offParPos, thisTop){
	return { left: offParPos.left + desPos.left, top: offParPos.top + thisTop }
}
	


$(document).ready( function() {
	
	// create the OUTER LAYOUT
	outerLayout = $("body").layout( layoutSettings_Outer );
	desPos = $('#designer').position()
	Paper.R = Raphael("drawing", 900, 328)
			
	tableBuilder = {
		raw: null,
		init: function(s){
			this.raw = s	
			return this;
		
		},
		makeTableTree: function(){
			var d = this.raw;
			var list = '<ul class="treeview grey" id="menu">', data;
			for(key in d){
				data = d[key]["data"]
				list += '<li class="expandable"><div class="hitarea expandable-hitarea"></div><span class="tName">' + key +'</span>'
				list += '<ul style="display: none">'
				for(x =0;x< data.length;x++){
					list += '<li>'+ data[x].alias + '</li>'
				} 
				list += "</ul>"
			}
			$(list).appendTo('.ui-layout-west>div.content')
			$("#menu").treeview({
				animated: "fast",
				collapsed: false,
				unique: true,
				persist: "cookie"
			});
			$('li.expandable').draggable({
				appendTo: "body",
				opacity: 0.7,
				cursor: 'move',
				cursorAt: {left: -6},
				refreshPositions: true, 
				helper: function(event){
					var dom = "<div class='dragger-helper'><img src='css/images/drop-no.gif' align='top' style='margin-right: 4px'/>" + $('.tName', this).text() + "</div>"
					return $(dom)
				},
				drag: function(event, ui){
					
				},
				stop: function(event, ui){
					$('.container').removeClass('activateContainer')
				}	
			})
			return this;
		},
		addTableToCont: function(table, pos){
			if( this.tables.current[table] ){
				return this.popMsg("Table is already added"), this
			}
			
			this.tables.add(this.raw[table],table)
			var t = this.raw[table].data, tn = this.tables.inc,
				html  = '<div class="outer-holder" id=tab' + table +'>'
				html += '<div class="holder-header"><span style="float:left">'+table+'</span><span class="closer"></span></div>'
				html += '<div class="alias-holder"><span style="float:left">Alias</span>&nbsp<input style="float: right" type="text" class="tableAlias" size=8 value="' + this.raw[table].alias + '"></div>'
				html += '<div class="inner-holder"><table id=tb' + tn + '><tbody><tr><td><input type="checkbox" class="selCol selAll"></td><td>*</td></tr>'
			for( x=0;x<t.length;x++){
				html += '<tr id=tb' + tn + 'tr' + x +' class="rowJoin"><td><input type="checkbox" class="selCol"></td>'
				html += '<td>' 
				if(t[x].primary) html += "<span class='primaryKey'></span>"
				html += t[x].alias+'</td></tr>'
			}
			html += '</tbody></table></div>'
			var $s = $(html).css({'left' : pos.left + "px", 'top': pos.top + "px"}).appendTo('#designer');
			
			$tr = $s.find('table').children()
			$tr.applyStyles()
	
			var tr = $s.find('table').find('tr').draggable({
				appendTo: "body",
				helper: function(){ 
					return $('<div class="tr-dragger"/>').text($(this).text())
				},
				opacity: 0.7,
				cursor: "move",
				start: function(){
					console.log($('.outer-holder', this).index())
				
				},
				drag: function(event, ui){
					//console.log($(this).position())
				
				}
			}).droppable({
				drop: function(event, ui){
					var parent = ui.draggable.offsetParent()
					if( parent[0] == $(this).offsetParent()[0] ) return tableBuilder.popMsg("Cannot drop on same table");
					Paper.createConnection( ui.draggable, $(this), $('div.holder-header', parent).text(), $('div.holder-header', $(this).offsetParent()).text() )
				}
			
			}) 
	
			return this
		},
		
		setAlias: function(table, newAlias){
			return this.raw[table].alias = newAlias
		
		},
		tables: {
			current: {},
			joins: [],
			remove: function(c,t){
				$(t).fadeOut();
				delete this.current[c]
				
			},
			add: function(t,n){
				this.current[n] = t;
				this.inc++;
			},
			inc: 0,
			addJoin: function( f, t, j, a, b ){
				this.joins.push({ fromTable: f, joinType: j, field: a, on: b, joinTable: t });
				return this;
			},
			updateJoin: function( f,t,j,a,b ){
				this.joins.forEach( function(e,i,a){
					if( e.field == a && e.on == b ){
						e.joinType = j
						return false
					}
				});
				return this
			},
			removeJoin: function(a,b){
				this.joins.forEach( function(e,i,a){
					if( e.field == a && e.on == b ){
						this.joins.splice(i, 0)
						return false
					}
				})
				return this;	
			}
		},
		popMsg: function(m){
			$('#msgHolder').html(m).slideDown('fast');
			return setTimeout(function(){ $('#msgHolder').slideUp() }, 1500)
		}
		
	}
	
	tableBuilder.init(sample).makeTableTree()
	
		
	$('.tableAlias').live('change', function(){
		var tb = $(this).parent().prev().prev().text()
		tableBuilder.setAlias( tb, $(this).val() ) 
		
	
	})

	
	$('.outer-holder').resizable()
	$('#tabs').tabs()
	$('td:even', '.inner-holder').css({"background": "#a0a0a0"});
	
	$('.container').droppable({
		accept: 'li.expandable',
		tolerance: "pointer",	
		drop: function(event, ui){
			if( ui.draggable.hasClass('outer-holder')) return 0;
			
			ui.draggable.revert = "valid"
			var tableIndex = ui.draggable.index()
			var table = $('.dragger-helper').text()
			var draggerPos =  $('.dragger-helper').position()
			var parPos = $('#designer').offset();
			if( draggerPos.top < parPos.top ){
				draggerPos.top = parPos.top + 3
			}
			var pos = { left: draggerPos.left - parPos.left, top: draggerPos.top - parPos.top }
			 $('.dragger-helper').remove()
			
			 
			tableBuilder.addTableToCont(table, pos)
			$('.outer-holder').draggable({"handle": ".holder-header", cursor: 'move', drag: function(event, ui){
				
				
				var C = $.data($(this)[0], "C")
				
				
				if( C && C.length){
					for(var x =0; x < C.length;x++){
						var pos = C[x].tr.position()
						var parPos = C[x].tr.offsetParent().position()
						C[x].z.attr({x: C[x].z.side == "Right" ? parPos.left + 130  : parPos.left, y:  pos.top + parPos.top +12 })
					}
					 for (var i = Paper.connections.length; i--;) {
						Paper.R.connection(Paper.connections[i]);
					}
					Paper.R.safari();
				}	
			}})
			
		},
		over: function(event, ui){
			$('img', '.dragger-helper').attr("src", "css/images/drop-yes.gif")
			$(this).addClass('activateContainer');
		},
		activate: function(event, ui){
			
		},
		out: function(event, ui){
			$(this).removeClass('activateContainer');
		}
	})
	
	$('.closer').live('hover', function(){
		$(this).addClass('hb');
	}, function(){
		$(this).removeClass('hb');
	}).live('click', function(){
		tableBuilder.tables.remove( $(this).parent().text(), $(this).offsetParent() )
	});
	
	$.fn.applyStyles = function(){
		var me = $(this);
		me.find('td:even').addClass('tdeven')
		me.find('td:odd').css({'padding-left': '16px'});
		me.find('tr:odd').addClass('even')
		return me
	
	
	}
	
});

	/*
	*#######################
	* INNER LAYOUT SETTINGS
	*#######################
	*
	* These settings are set in 'list format' - no nested data-structures
	* Default settings are specified with just their name, like: fxName:"slide"
	* Pane-specific settings are prefixed with the pane name + 2-underscores: north__fxName:"none"
	*/
	layoutSettings_Inner = {
		applyDefaultStyles:				true // basic styling for testing & demo purposes
	,	minSize:						10 // TESTING ONLY
	,	spacing_closed:					0
	,	north__spacing_open:			0
	,	south__spacing_open:			0
	,	south__maxHeight:				10
	,	center__minHeight:				300
	,	norh__maxHeight:				200
	
	
	
	};


	/*
	*#######################
	* OUTER LAYOUT SETTINGS
	*#######################
	*
	* This configuration illustrates how extensively the layout can be customized
	* ALL SETTINGS ARE OPTIONAL - and there are more available than shown below
	*
	* These settings are set in 'sub-key format' - ALL data must be in a nested data-structures
	* All default settings (applied to all panes) go inside the defaults:{} key
	* Pane-specific settings go inside their keys: north:{}, south:{}, center:{}, etc
	*/
	var layoutSettings_Outer = {
		name: "outerLayout" // NO FUNCTIONAL USE, but could be used by custom code to 'identify' a layout
		// options.defaults apply to ALL PANES - but overridden by pane-specific settings
	,	defaults: {
			minSize:				10
		,	paneClass:				"pane" 		// default = 'ui-layout-pane'
		,	resizerClass:			"resizer"	// default = 'ui-layout-resizer'
		,	togglerClass:			"toggler"	// default = 'ui-layout-toggler'
		,	buttonClass:			"button"	// default = 'ui-layout-button'
		,	contentSelector:		".content"	// inner div to auto-size so only it scrolls, not the entire pane!
		,	contentIgnoreSelector:	"span"		// 'paneSelector' for content to 'ignore' when measuring room for content
		,	togglerLength_open:		35			// WIDTH of toggler on north/south edges - HEIGHT on east/west edges
		,	togglerLength_closed:	35			// "100%" OR -1 = full height
		,	hideTogglerOnSlide:		true		// hide the toggler when pane is 'slid open'
		,	togglerTip_open:		"Close This Pane"
		,	togglerTip_closed:		"Open This Pane"
		,	resizerTip:				"Resize This Pane"
		//	effect defaults - overridden on some panes
		,	fxName:					"slide"		// none, slide, drop, scale
		,	fxSpeed_open:			750
		,	fxSpeed_close:			1500
		,	fxSettings_open:		{ easing: "easeInQuint" }
		,	fxSettings_close:		{ easing: "easeOutQuint" }
		
		
	}
	,	north: {
			height:				"auto"
		,	spacing_open:			1			// cosmetic spacing
		,	togglerLength_open:		0			// HIDE the toggler button
		,	togglerLength_closed:	2			// "100%" OR -1 = full width of pane
		,	resizable: 				false
		,	slidable:				false
		//	override default effect
		,	fxName:					"none"
		}
	,	south: {

			maxSize:				250
		,	initClosed:				false
		}
	,	west: {
			size:					230
		,	spacing_open:			4			// cosmetic spacing
		,	togglerLength_open:		0			// HIDE the toggler button
		,	togglerLength_closed:	-1			// "100%" OR -1 = full width of pane
		,	resizable: 				false
		,	slidable:				false
		//	override default effect
		,	fxName:					"none"
	
		}
	
	,	center: {
					// sample: use an ID to select pane instead of a class
			minWidth:				200
		,	minHeight:				200
		}
	};	