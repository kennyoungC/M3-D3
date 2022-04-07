`use strict`;

const options = {
  method: `GET`,
  Headers: {
    Authorization: "563492ad6f917000010000017e642f9b6dca4b9e98b56dd4bf5fa7fc",
  },
};
const searchImage = (query) => {
  return fetch(`https://api.pexels.com/v1/search?query=${query}`, {
    method: "GET",
    headers: {
      Authorization: "563492ad6f9170000100000185c75e5a7bfd440f92947e3ec528207b",
    },
  });
};
const loadImage = document.querySelector(`.load-img`);
loadImage.addEventListener(`click`, () => {
  const query = document.querySelector(`input[type=search]`).value;
  searchImage(query)
    .then((response) => response.json())
    .then((data) => {
      loadImages(data);
      setTimeout(() => {
        alert(`${data.photos.length} loaded successfully`);
      }, 3000);
      hideCards();
    })
    .catch((err) => {
      console.log(err);
    });
});
const loadSecImage = document.querySelector(`.load-sec-img`);
const searchSecImage = (query) => {
  return fetch(`https://api.pexels.com/v1/search?query=${query}`, options);
};

loadSecImage.addEventListener(`click`, () => {
  const query = document.querySelector(`input[type=search]`).value;
  searchImage(query)
    .then((resp) => resp.json())
    .then((data) => {
      loadImages(data);
      hideCards();
    })
    .catch((err) => console.log(err));
});
//* hide cards
const hideCards = () => {
  const hideBtn = document.querySelectorAll(`.hide-btn`);
  hideBtn.forEach((singleHideBtn, i) => {
    singleHideBtn.addEventListener(`click`, (e) => {
      const card = document.getElementById(`card${i}`);
      card.remove();
    });
  });
};
const loadImages = (data) => {
  const imageData = data.photos;
  console.log(imageData);
  const row = document.querySelector(`.img-row`);
  row.innerHTML = ``;
  for (let i = 0; i < imageData.length; i++) {
    const singleImage = imageData[i];
    console.log(singleImage.src.original);
    const newRow = ` <div id="card${i}" class="col-md-4">
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
    class="btn btn-sm btn-outline-secondary hide-btn"
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
};
// fetch(`https://api.pexels.com/v1/search?query=house`, options)
//   .then((resp) => resp.json())
//   .then((data) => {
//     console.log(data);
//     const imagesDetails = data.photos;
//     imagesDetails.forEach((eachImg) => {
//       console.log(eachImg);
//       const carouselInner = document.querySelector(`.carousel-inner`);
//       console.log(carouselInner);
//       const newRow = `<div class="carousel-item">
//       <img src="${eachImg.src.small}" class="d-block w-100" alt="..." />
//     </div>`;
//     });
//   });
