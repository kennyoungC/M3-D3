`use strict`;

const options = {
  method: `GET`,
  Headers: {
    Authorization: "563492ad6f917000010000017e642f9b6dca4b9e98b56dd4bf5fa7fc",
  },
};
const searchImage = (query) => {
  return fetch(`https://api.pexels.com/v1/search?query=${query}`, options);
  // .then((resp) => resp.json())
  // .then((data) => console.log(data));
};
const loadImage = document.querySelector(`.load-img`);
loadImage.addEventListener(`click`, () => {
  const query = document.querySelector(`input[type=search]`).value;
  searchImage(query)
    .then((response) => response.json())
    .then((data) => {
      const imageData = data.photos;
      console.log(imageData);
      const row = document.querySelector(`.img-row`);
      row.innerHTML = ``;
      for (let i = 0; i < imageData.length; i++) {
        const singleImage = imageData[i];
        console.log(singleImage.src.original);
        const newRow = ` <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
        <img class= "img-fluid w-100" src="${singleImage.src.tiny}" alt="" />
        <div class="card-body">
        <p class="card-text">
        This is a wider card with supporting text below as a natural
        lead-in to additional content. This content is a little bit
        longer.
        </p>
        <div
        class="d-flex justify-content-between align-items-center"
        >
        <div class="btn-group">
        <button
        type="button"
        class="btn btn-sm btn-outline-secondary"
        >
        View
        </button>
        <button
        type="button"
        class="btn btn-sm btn-outline-secondary class=""hide-img"
        >
        Hide
        </button>
        </div>
        <small class="text-muted">${singleImage.id}</small>
        </div>
        </div>
        </div>
        </div>`;
        row.innerHTML += newRow;
      }
    })
    .catch((err) => console.error(err));
});
const loadSecImage = document.querySelector(`.load-sec-img`);
const searchSecImage = (query) => {
  return fetch(`https://api.pexels.com/v1/search?query=${query}`, options);
  // .then((resp) => resp.json())
  // .then((data) => console.log(data));
};
loadSecImage.addEventListener(`click`, () => {
  const query = document.querySelector(`input[type=search]`).value;
  searchImage(query)
    .then((resp) => resp.json())
    .then((data) => {
      const SecimageData = data.photos;
      console.log(SecimageData);
      const row = document.querySelector(`.img-row`);
      row.innerHTML = ``;
      for (let i = 0; i < SecimageData.length; i++) {
        const singleImage = SecimageData[i];
        console.log(singleImage.src.original);
        const newRow = ` <div class="col-md-4">
        <div class="card mb-4 shadow-sm">
        <img src="${singleImage.src.tiny}" alt="" />
        <div class="card-body">
        <p class="card-text">
        This is a wider card with supporting text below as a natural
        lead-in to additional content. This content is a little bit
        longer.
        </p>
        <div
        class="d-flex justify-content-between align-items-center"
        >
        <div class="btn-group">
        <button
        type="button"
        class="btn btn-sm btn-outline-secondary"
        >
        View
        </button>
        <button
        type="button"
        class="btn btn-sm btn-outline-secondary"
        >
        Edit
        </button>
        </div>
        <small class="text-muted">${singleImage.id}</small>
        </div>
        </div>
        </div>
        </div>`;
        row.innerHTML += newRow;
      }
    });
});
