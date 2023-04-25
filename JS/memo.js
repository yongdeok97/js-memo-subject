import Memo from "./memoClass.js";
const title = document.querySelector(".write .title textArea");
const contents = document.querySelector(".write .contents textArea");
const itemList = document.querySelector(".read-container ul");
const backItem = document.querySelector(".read.back");
const storageBtn = document.querySelector(".storage-btn");
const deleteBtn = document.querySelector(".delete-btn");
const backBtn = document.querySelector(".back-btn");
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
};

// // initial State
const readAllStorage = () => {
  let Datas = m.getAllMemo();
  const frag = document.createDocumentFragment();
  
  itemList.innerHTML = '';
  if (Datas.length === 0)
    return ;
  for (let i = 0; i < Datas.length; i++) {
      const myLi = document.createElement("li");
      myLi.textContent = Datas[i]["title"];
      frag.append(myLi);
      myLi.addEventListener("click", () => {
        backContents.innerHTML = `
          <h2>${Datas[i]["title"]}</h2>
          <p>${Datas[i]["contents"]}</p>
        `;
        key = i;
        itemList.style.transform = `rotateY(180deg)`;
        backItem.style.transform = `rotateY(0deg)`;
      });
  }
  itemList.appendChild(frag);
};

storageBtn.addEventListener("click", () => {
  storage();
  readAllStorage();
  title.value = "";
  contents.value = "";
});

deleteBtn.addEventListener("click", () => {
  m.deleteMemo(key + 1);
  readAllStorage();
  itemList.style.transform = `rotateY(0deg)`;
  backItem.style.transform = `rotateY(-180deg)`;
});

backBtn.addEventListener("click", () => {
  itemList.style.transform = `rotateY(0deg)`;
  backItem.style.transform = `rotateY(-180deg)`;
});

const main = (() => {
  m.initialize();
  readAllStorage();
  m.getAllMemo();
})();
