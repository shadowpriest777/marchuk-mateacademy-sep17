function table_view(sSelector){
	
	var t = this;
	
	t.catalog = $(sSelector);
	t.goods_list = t.catalog.find('.goods-list-container');
	
	t.showTable = function (){
		t.goods_list.addClass('table-view');
	}
	
	t.hideTable = function (){
		t.goods_list.removeClass('table-view');
	}

	t.catalog.find('.list-btn')
		.mouseover(t.showTable)
		.mouseout(t.hideTable)
	;
}
