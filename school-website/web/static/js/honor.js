//@@@校友轮播

var Speed = 1; //速度(毫秒)
var Space = 5; //每次移动(px)
var PageWidth = 318; //翻页宽度
var fill = 0; //整体移位
var MoveLock = false;
var MoveTimeObj;
var Comp = 0;
var AutoPlayObj = null;

GetObj("index-list2").innerHTML = GetObj("index-list1").innerHTML;
GetObj('indexFriend').scrollLeft = fill;
GetObj("indexFriend").onmouseover = function () {
  clearInterval(AutoPlayObj);
}
GetObj("indexFriend").onmouseout = function () {
  AutoPlay();
}
AutoPlay();

function GetObj(objName) {
  if (document.getElementById) {
    return eval('document.getElementById("' + objName + '")')
  } else {
    return eval('document.all.' + objName)
  }
}

function AutoPlay() { //自动滚动
  clearInterval(AutoPlayObj);
  AutoPlayObj = setInterval('ISL_GoDown();ISL_StopDown();', 3000); //间隔时间
}

function ISL_GoUp() { //左翻开始
  if (MoveLock) return;
  clearInterval(AutoPlayObj);
  MoveLock = true;
  MoveTimeObj = setInterval('ISL_ScrUp();', Speed);
}

function ISL_StopUp() { //左翻停止
  clearInterval(MoveTimeObj);
  if (GetObj('indexFriend').scrollLeft % PageWidth - fill != 0) {
    Comp = fill - (GetObj('indexFriend').scrollLeft % PageWidth);
    CompScr();
  } else {
    MoveLock = false;
  }
  AutoPlay();
}

function ISL_ScrUp() { //左翻动作
  if (GetObj('indexFriend').scrollLeft <= 0) {
    GetObj('indexFriend').scrollLeft = GetObj('indexFriend').scrollLeft + GetObj('index-list1').offsetWidth
  }
  GetObj('indexFriend').scrollLeft -= Space;
}

function ISL_GoDown() { //右翻开始
  clearInterval(MoveTimeObj);
  if (MoveLock) return;
  clearInterval(AutoPlayObj);
  MoveLock = true;
  ISL_ScrDown();
  MoveTimeObj = setInterval('ISL_ScrDown()', Speed);
}

function ISL_StopDown() { //右翻停止
  clearInterval(MoveTimeObj);
  if (GetObj('indexFriend').scrollLeft % PageWidth - fill != 0) {
    Comp = PageWidth - GetObj('indexFriend').scrollLeft % PageWidth + fill;
    CompScr();
  } else {
    MoveLock = false;
  }
  AutoPlay();
}

function ISL_ScrDown() { //右翻动作
  if (GetObj('indexFriend').scrollLeft >= GetObj('index-list1').scrollWidth) {
    GetObj('indexFriend').scrollLeft = GetObj('indexFriend').scrollLeft - GetObj('index-list1').scrollWidth;
  }
  GetObj('indexFriend').scrollLeft += Space;
}

function CompScr() {
  var num;
  if (Comp == 0) {
    MoveLock = false;
    return;
  }
  if (Comp < 0) { //左翻
    if (Comp < -Space) {
      Comp += Space;
      num = Space;
    } else {
      num = -Comp;
      Comp = 0;
    }
    GetObj('indexFriend').scrollLeft -= num;
    setTimeout('CompScr()', Speed);
  } else { //右翻
    if (Comp > Space) {
      Comp -= Space;
      num = Space;
    } else {
      num = Comp;
      Comp = 0;
    }
    GetObj('indexFriend').scrollLeft += num;
    setTimeout('CompScr()', Speed);
  }
}

