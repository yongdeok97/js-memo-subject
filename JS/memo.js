const title = document.querySelector(".write .title textArea");
const contents = document.querySelector(".write .contents textArea");
const itemList = document.querySelector(".read-container ul");
const backItem = document.querySelector(".read.back");
const backContents = document.querySelector(
  ".read-container .back .memo-contents"
);
let itemListLi = document.querySelectorAll(".read-container ul li");

const storageBtn = document.querySelector(".storage-btn");
const deleteBtn = document.querySelector(".delete-btn");
const backBtn = document.querySelector(".back-btn");
let key = 0;

const maxKey = () => {
  let itemListLength = window.localStorage.length;
  let max = "0";

  for (let i = 0; i < itemListLength; i++) {
    if (max < window.localStorage.key(i)) {
      max = window.localStorage.key(i);
    }
  }
  return max;
};

// h2 찾기
const findHT = (str) => {
  const htEnd = `</h2>`;

  return str.substring(4, str.indexOf(htEnd));
};

//create
const storage = () => {
  let itemListLength = maxKey() === 0 ? 0 : parseInt(maxKey()) + 1;

  if (`${title.value.replaceAll(' ', '')}` === '') {
    alert('제목을 입력해 주세요');
    console.log(1);
    return;
  }

  if (`${contents.value.replaceAll(' ', '')}}` === '') {
    alert('내용을 입력해 주세요');
    return;
  }
  window.localStorage.setItem(
    itemListLength,
    `<h2>${title.value}</h2><p>${contents.value}</p>`
  );
  readAllStorage();
};

// initial State
const readAllStorage = () => {
  let itemListLength = maxKey() === 0 ? 0 : parseInt(maxKey()) + 1;

  itemList.textContent = "";
  for (let i = 0; i <= itemListLength; i++) {
    if (window.localStorage.getItem(i) !== null) {
      const myLi = document.createElement("li");
      myLi.textContent = findHT(window.localStorage.getItem(i));
      myLi.addEventListener("click", () => {
        backContents.innerHTML = window.localStorage.getItem(i);
        itemList.style.transform = `rotateY(180deg)`;
        backItem.style.transform = `rotateY(0deg)`;
        key = i;
      });
      itemList.appendChild(myLi);
    }
  }
  itemListLi = document.querySelectorAll(".read-container ul li");
};

const main = (() => {
  readAllStorage();
})();

storageBtn.addEventListener("click", () => {
  storage();
  title.value = "";
  contents.value = "";
});

deleteBtn.addEventListener("click", () => {
  window.localStorage.removeItem(key);
  readAllStorage();
  itemList.style.transform = `rotateY(0deg)`;
  backItem.style.transform = `rotateY(-180deg)`;
});

backBtn.addEventListener("click", () => {
  itemList.style.transform = `rotateY(0deg)`;
  backItem.style.transform = `rotateY(-180deg)`;
});
