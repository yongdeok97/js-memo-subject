const title = document.querySelector(".write .title");
const contents = document.querySelector(".write .contents");
const itemList = document.querySelector(".read-container ul");

window.localStorage.setItem(0, "1");
window.localStorage.setItem(1, "1");
window.localStorage.setItem(2, "1");

// h2 찾기
const findHT = (str) => {
  const htEnd = `</h2>`;
  return str.substring(4, str.indexOf(htEnd));
};
// p 찾기
const findP = (str) => {
  const pStart = `<p>`;
  const pEnd = `</p>`;

  return str.substring(str.indexOf(pStart) + 2, str.indexOf(pEnd));
};

//create
const storage = (title, contents) => {
  let itemList = window.localStorage.length;
  window.localStorage.setItem(
    itemList,
    `<h2>${title.textContent.trim()}</h2><p>${contents.textContent
      .trim()
      .replace(/\s/g, "")}</p>`
  );
};

//read
const readStorage = (key) => {
  window.localStorage.getItem(
    `<h2>${title.textContent.trim()}</h2>`,
    `<p>${contents.textContent.trim()}</p>`
  );
};

//delete 아 이거 생각을 아예 잘못했다.
itemList.onclick = (e) => {
  const nodes = [...e.target.parentElement.children];

  const index = nodes.indexOf(e.target);
  console.log(nodes);
  deleteStorage(index);
  nodes[index].remove();
//   e.remove(index);
  // readAllStorage();
};
const deleteStorage = (key) => {
    window.localStorage.removeItem(key);

};

// initial State
const readAllStorage = () => {
  let itemListLength = window.localStorage.length;
  console.log(itemList)

  for (let i = 0; i < itemListLength; i++) {
    const myLi = document.createElement("li");
    myLi.textContent = window.localStorage.getItem(i);
    itemList.appendChild(myLi);
  }
};

const main = (() => {
    readAllStorage();
})();

// console.log(new Date().toString().substring(7, 24).replace(/\s/g, ""));
// console.log(title.textContent.trim(), contents.textContent.trim());
// console.log("asdasrtydasd".indexOf("rty"));


// window.localStorage.setItem(
//   new Date().toString().substring(0, 24).replace(/\s/g, ""),
//   `<h2>${title.textContent.trim()}</h2><p>${contents.textContent.trim()}</p>`
// );
