var that;
class Tab{
  constructor(id){
    that=this;
    this.main = document.querySelector(id);
    // 獲取添加按鈕
    this.add = this.main.querySelector('.tabadd');
    // li的父元素
    this.ul = this.main.querySelector('.fisrstnav ul:first-child');
    // section 父元素
    this.tabscon = this.main.querySelector('.tabscon');
    this.init();
  }

  init(){
    this.updateNode();
    //init 初始化操作讓相關的元素綁定事件
    this.add.onclick = this.addTab;
    for(var i = 0; i<this.lis.length; i++){
      //給li標簽的索引賦值
      this.lis[i].index = i;
      this.lis[i].onclick = this.toggleTab;
      this.remove[i].onclick = this.removeTab;
      this.sections[i].ondblclick = this.editTab;
      this.spans[i].ondblclick = this.editTab;
    }
  }
  // 獲取所有動態添加的小 li 和 section，還有關閉按鈕
  updateNode(){
    this.lis = this.main.querySelectorAll('li');
    this.sections = this.main.querySelectorAll('section');    
    this.remove = this.main.querySelectorAll('.icon-guanbi');
    this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
  }
  // 1.切換功能
  toggleTab(){
    // console.log(this.index)
    that.clearClass();
    this.className='liactive';
    that.sections[this.index].className='conactive';
  }
  //清除
  clearClass(){
    for(var i = 0; i<this.lis.length; i++){
      this.lis[i].className = '';
      this.sections[i].className = '';
    }
  }
  // 2.添加功能
  addTab(){
    that.clearClass()
    // (1)創建li元素和section元素
    var random = Math.random();
    let li = `<li class="liactive"><span>新選項卡</span><span class="iconfont icon-guanbi"></span></li>`
    let section = '<section class="conactive">测试'+ random +'</section>'
    // （2）把這兩個元素追加到對應的父元素裏面
    that.ul.insertAdjacentHTML('beforeend',li);
    that.tabscon.insertAdjacentHTML('beforeend',section);
    that.init();
  }
  //3.刪除功能
  removeTab(e){
    e.stopPropagation();// 阻止冒泡，防止出發 li 的切換點擊事件
    var index = this.parentNode.index;
    that.lis[index].remove();
    that.sections[index].remove();
    that.init();
    // 儅刪除的不是選中狀態的li時，原來的li保持不變
    if(document.querySelector('.liactive')) return;
    // 刪除li時，讓前一個為選中狀態
    index--;
    that.lis[index] && that.lis[index].click();
  }
  //4.修改功能
  editTab(){
    var str = this.innerHTML;
    // 雙擊禁止選中文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    this.innerHTML = '<input type="text"/>';
    var input = this.children[0];
    input.value = str;
    input.select();// 文本框裏面的文字處於選定狀態
    // 當我們離開文本框就把文本框裏面的值給span
    input.onblur = function () {
      this.parentNode.innerHTML = this.value;
    }
    // 按下回車也可以把文本框裏面的值給span
    input.onkeyup = function (e) {
      if(e.keyCode === 13){
        // 手動調用表單失去焦點事件，不需要鼠標離開操作
        this.blur();
      }
    }
  }
}
new Tab('#tab');