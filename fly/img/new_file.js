<script>
    // 创建战机
    var flyEle = document.createElement('div');
    flyEle.id = 'fly_me';
    flyEle.innerHTML = '<img src = "./img/me.png" />';
    document.body.appendChild(flyEle);

    // 战机跟随鼠标
    document.onmousemove = function (e) {
        var flyEle = document.getElementById('fly_me');
        var view = document.getElementById('view');
        var flyX = e.clientX - 17;
        var flyY = e.clientY - 12;
        var xCheck = flyX > view.offsetLeft && flyX < view.offsetLeft + view.offsetWidth - 34;
        var yCheck = flyY > view.offsetTop && flyY < view.offsetTop + view.offsetHeight - 24;
        if (xCheck && yCheck) {
            flyEle.style.top = flyY + 'px';
            flyEle.style.left = flyX + 'px';
            flyEle.flag = true;
        }
    }

    // 创建子弹 
    var objB = { //子弹的相关值
        name: 'bullet',
        num: 1,
        arr: [],// ['id|top|left']
        width: 6,
        height: 14,
        path: './img/b.png'
    };
    createBullet(objB);
    function createBullet(obj) {
        setInterval(function () {
            var flyEle = document.getElementById('fly_me');
            if (flyEle.flag) {
                var ele = document.createElement('div');
                ele.id = obj.name + obj.num;
                var length = obj.arr.length;
                if (length < 50) {
                    obj.arr[length] = ele.id + '|';
                    obj.num++;
                    ele.style.width = obj.width + "px";
                    ele.style.height = obj.height + "px";
                    ele.style.position = 'absolute';
                    ele.style.background = 'url(' + obj.path + ')';

                    ele.style.top = parseInt(flyEle.style.top) + 6 + 'px';
                    obj.arr[length] = obj.arr[length] + ele.style.top + '|';
                    ele.style.left = parseInt(flyEle.style.left) + 14 + 'px';
                    obj.arr[length] = obj.arr[length] + ele.style.left;
                }
                document.body.appendChild(ele);
            }
        }, 1000)
    }
    // 让子弹运动其起来
    function moveBullet() {
        var flyEle = document.getElementById('fly_me');
        if (flyEle.flag) {
            for (var i = 0; i < objB.arr.length; i++) {
                var newArr = objB.arr[i].split('|');
                var eleB = document.getElementById(newArr[0]);
                newArr[1] = parseInt(newArr[1]) - 1;
                eleB.style.top = newArr[1] + 'px';
                objB.arr[i] = newArr[0] + '|' + newArr[1] + '|' + newArr[2];
                if (newArr[1] < 0) {
                    objB.arr.splice(i, 1);
                    var delEle = document.getElementById(newArr[0]);
                    delEle.parentNode.removeChild(delEle);
                }
            }

        }
    }

    // 创建敌机
    var objF = {
        name: 'foe',
        num: 1,
        arr: [],// ['id|top|left']
        width: 34,
        height: 24,
        path: './img/foe.png'
    };
    createFoe(objF);
    function createFoe(obj) {
        setInterval(function () {
            var flyEle = document.getElementById('fly_me');
            if (flyEle.flag) {
                var ele = document.createElement('div');
                ele.id = obj.name + obj.num;
                var length = obj.arr.length;
                if (length < 50) {
                    obj.arr[length] = ele.id + '|';
                    obj.num++;
                    ele.style.width = obj.width + "px";
                    ele.style.height = obj.height + "px";
                    ele.style.position = 'absolute';
                    ele.style.background = 'url(' + obj.path + ')';

                    ele.style.top = 0;
                    obj.arr[length] = obj.arr[length] + ele.style.top + '|';
                    var ran = Math.random() * 286;
                    ele.style.left = view.offsetLeft + ran + 'px';
                    obj.arr[length] = obj.arr[length] + ele.style.left;
                }
                document.body.appendChild(ele);
            }
        }, 1000)
    }
    // 让敌机运动其起来
    function moveFoe() {
        var flyEle = document.getElementById('fly_me');
        if (flyEle.flag) {
            for (var i = 0; i < objF.arr.length; i++) {
                var newArr = objF.arr[i].split('|');
                var eleB = document.getElementById(newArr[0]);
                newArr[1] = parseInt(newArr[1]) + 1;
                eleB.style.top = newArr[1] + 'px';
                objF.arr[i] = newArr[0] + '|' + newArr[1] + '|' + newArr[2];
                if (newArr[1] > view.offsetHeight - 24) {
                    objF.arr.splice(i, 1);
                    var delEle = document.getElementById(newArr[0]);
                    delEle.parentNode.removeChild(delEle);
                }
            }

        }
    }


    setInterval(function () {
        // 让子弹运动其起来
        moveBullet()
        // 让敌机运动起来
        moveFoe();
        for (var i = 0; i < objF.arr.length; i++) {
            var newArr = objF.arr[i].split('|');
            var eleF = document.getElementById(newArr[0]);
            var xFS = parseInt(newArr[2]);
            var xFE = parseInt(newArr[2]) + 34;
            var yFS = parseInt(newArr[1]);
            var yFE = parseInt(newArr[1]) + 24;
            for (var j = 0; j < objB.arr.length; j++) {
                var newArr1 = objB.arr[j].split('|');
                var eleB = document.getElementById(newArr1[0]);
                var xB = parseInt(newArr1[2]);
                var yB = parseInt(newArr1[1]);
                var xCheck = xB > xFS && xB < xFE;
                var yCheck = yB > yFS && yB < yFE;

                if (xCheck && yCheck) {
                    objF.arr.splice(i, 1);
                    eleF.parentNode.removeChild(eleF);
                    objB.arr.splice(j, 1);
                    eleB.parentNode.removeChild(eleB);
                }
            }
        }

    }, 10)







</script>