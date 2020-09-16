function Food (options) {
	options = options || {};
	this.width = options.width;
	this.height = options.height;
	this.x = options.x;
	this.y = options.y;
	this.color = options.color || 'green';
}
food.prototype.render = function() {
	

var div = document.createElement('div');
map.appendChild(div);
div.style.position = 'absolute';
div.style.width = this.width + 'px';
div.style.height = this.height + 'px';
div.style.left = this.x + 'px';
div.style.top = this.x + 'px';
div.style.backgroundColor = this.color;

}
// 测试
var food = new Food();
food.render(map);
