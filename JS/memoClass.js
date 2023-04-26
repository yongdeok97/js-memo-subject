class MemoNode {
  constructor(id = null, date, title = "memo", contents = "") {
    this.id = id;
    this.date = date;
    this.title = title;
    this.contents = contents;
  }
}

export default class Memo {
  constructor() {
    this.memoList = [];
    this.length;
  };
  // 이니셜라이즈 한번 해주기
  initialize = () => {
    let max = 0;
    for (let i = 0; i < window.localStorage.length; i++) {
      let target = JSON.parse(window.localStorage.getItem(window.localStorage.key(i)));
      if (max < target['id']) {
        max = target['id'];
      }
    }
    this.length = +max + 1;
  };

  getLength = () => {
    return this.length;
  };

  storageMemo = (date, title, contents) => {
    let data = new MemoNode(this.length, date, title, contents);

    window.localStorage.setItem(this.length, JSON.stringify(data));
    this.length++;
  };

  deleteMemo = (id) => {
    window.localStorage.removeItem(id)
    this.memoList = this.getAllMemo();
    this.length--;
  };

  getAllMemo = () => {
    this.initialize();
    this.memoList.length = 0;

    for (let i = 1; i <= this.length; i++) {
      if (window.localStorage.getItem(i) !== null) {
        this.memoList.push(window.localStorage.getItem(i));
      }
    }
    return JSON.parse(`[${this.memoList}]`);
  };
}
