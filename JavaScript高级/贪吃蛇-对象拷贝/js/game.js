// 使用自调用函数 创建一个新的局部作用域 防止命名冲突
(function() {
	var that; // 记录游戏对象
	function Game(map) {
		this.food = new Food();
		this.snake = new Snake();
		this.map = map;
		that = this;
	}
	
	Game.prototype.start = function() {
		// 1 把蛇和食物对象， 渲染到地图上
		this.food.render(this.map);
		this.snake.render(this.map);
		// 测试move方法
		// this.snake.move();
		// this.snake.render(this.map);
		// this.snake.move();
		// this.snake.render(this.map);
		// this.snake.move();
		// this.snake.render(this.map);
		
		
		// 2 开始游戏的逻辑
		// 2.1 让蛇移动起来
		// 2.2 当蛇遇到边界 游戏结束
		runSnake();
		// 2.3 通过键盘控制蛇移动的方向
		bindKey();
		// 用点击事件控制蛇移动的方向
		// 2.4 当蛇遇到食物 做相应的处理
		
		
	}
	// 通过键盘控制蛇移动的方向
	function bindKey() {
		// document.onkeydown = function() {};
		document.addEventListener('keydown', function(e) {
			// console.log(e.keyCode);
			// 37 - left
			// 38 - top
			// 39 - right
			// 40 - bottom
			switch (e.keyCode) {
				case 37:
					this.snake.direction = 'left';
					break;
				case 38:
					this.snake.direction = 'top';
					break;
				case 39:
					this.snake.direction = 'right';
					break;
				case 40:
					this.snake.direction = 'bottom';
					break;
			}
		}.bind(that),false)
	}
	
	// 私有的函数
	function runSnake() {
		var timeId = setInterval(function () {
			// 让蛇走一个格
			// 在定时器的function中的this是指向window对象的
			// this.snake;
			// 要获取游戏对象中的蛇对象
			this.snake.move(this.food, this.map);
			this.snake.render(this.map);
			// 2.2 当蛇遇到边界 游戏结束
			// 获取蛇头的坐标
			
			// 因为map的宽度是写在css中的 只能用offsetWidth访问 width访问的值为空
			var maxX = this.map.offsetWidth / this.snake.width; 
			var maxY = this.map.offsetHeight / this.snake.height;
			var headX = this.snake.body[0].x;
			var headY = this.snake.body[0].y;
			if (headX < 0 || headX >= maxX) {
				alert('Game Over');
				clearInterval(timeId);
				alert('得分' + this.snake.score);
			}
			if (headY < 0 || headY >= maxY) {
				alert('Game Over');
				clearInterval(timeId);
				alert('得分' + this.snake.score);
			}
		}.bind(that),150);
	}
	
	// 暴露构造函数给外部
	window.Game = Game;
})();


// 游戏启动代码

// // 测试
// var map = document.getElementById('map');
// var game = new Game(map);
// game.start();

