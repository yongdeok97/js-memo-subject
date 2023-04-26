import Memo from "./memoClass.js";
const title = document.querySelector(".write .title textArea");
const contents = document.querySelector(".write .contents textArea");
const itemList = document.querySelector(".read-container ul");
const backItem = document.querySelector(".read.back");
const storageBtn = document.querySelector(".storage-btn");
const deleteBtn = document.querySelector(".delete-btn");
const backBtn = document.querySelector(".back-btn");
const updateBtn = document.querySelector(".update-btn");
const backContents = document.querySelector(
  ".read-container .back .memo-contents"
);

let m = new Memo();
let key = 0;

const storage = () => {
  if (`${title.value.replaceAll(" ", "")}` === "") {
    alert("제목을 입력해 주세요");
    return;
  }
  if (`${contents.value.replaceAll(" ", "")}}` === "") {
    alert("내용을 입력해 주세요");
    return;
  }
  m.storageMemo(
    new Date(),
    `${title.value.trim()}`,
    `${contents.value.trim()}`
  );
  alert('저장 되었습니다.')
};

// // initial State
const readAllStorage = () => {
  let datas = m.getAllMemo();
  const frag = document.createDocumentFragment();

  itemList.innerHTML = '';
  if (datas.length === 0)
    return ;
  for (let i = 0; i < m.length; i++) {
    if (datas[i] === undefined)
      continue;
    const myLi = document.createElement("li");
    myLi.textContent = datas[i]["title"];

    frag.append(myLi);
    myLi.addEventListener("click", () => {
      backContents.innerHTML = `
        <h2>${datas[i]["title"]}</h2>
        <p>${datas[i]["contents"]}</p>
        <span>${(datas[i]["date"]).substring(0, 10)}</span>
      `;
      key = datas[i]["id"];
      itemList.style.transform = `rotateY(180deg)`;
      backItem.style.transform = `rotateY(0deg)`;
    });
  }
  itemList.appendChild(frag);
};

const update = () => {
  const memo = m.getMemo(key);

  title.value = memo['title'];
  contents.value = memo['contents'];
}

storageBtn.addEventListener("click", () => {
  storage();
  readAllStorage();
  title.value = "";
  contents.value = "";
});

deleteBtn.addEventListener("click", () => {
  m.deleteMemo(key);
  alert('삭제 되었습니다.')
  readAllStorage();
  itemList.style.transform = `rotateY(0deg)`;
  backItem.style.transform = `rotateY(-180deg)`;
});

// backContents.addEventListener('click', () => {
//   console.log('asd');

// })
updateBtn.addEventListener('click', () => {
  update();
  m.deleteMemo(key);
  readAllStorage();
  itemList.style.transform = `rotateY(0deg)`;
  backItem.style.transform = `rotateY(-180deg)`;
})

backBtn.addEventListener("click", () => {
  itemList.style.transform = `rotateY(0deg)`;
  backItem.style.transform = `rotateY(-180deg)`;
});

const main = (() => {
  m.initialize();
  title.value = "";
  contents.value = "";
  readAllStorage();
})();
