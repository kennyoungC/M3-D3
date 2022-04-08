`use strict`;
window.onload = () => {
  searchImage("nature")
    .then((response) => response.json())
    .then((data) => {
      console.log(data.photos);
      const allUrl = data.photos.map((url) => {
        return url.photographer_url;
      });
      const filtered = data.photos.filter((name) =>
        name.photographer.includes(`Luis`)
      );
      console.log(filtered);
      console.log(allUrl);
      loadImages(data);
      hideCards();
    })
    .catch((err) => {
      console.log(err);
    });
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
      // setTimeout(() => {
      //   alert(`${data.photos.length} loaded successfully`);
      // }, 3000);
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
  const row = document.querySelector(`.img-row`);
  row.innerHTML = ``;
  for (let i = 0; i < imageData.length; i++) {
    const singleImage = imageData[i];
    const newRow = ` <div id="card${i}" class="col-md-4">
    <div class="card mb-4 shadow-sm">
    <img src="${singleImage.src.landscape}" alt="${singleImage.alt}" />
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
    class="btn btn-sm btn-outline-secondary" onclick= "viewImage(event)"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
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
    <small  class="text-muted favourite">ID:${singleImage.id}</small>
    <span onclick="addToFav(event)" class="text-dark fav-btn"><i class="bi bi-heart fav-icon"></i><span/>
    </div>
    </div>
    </div>
    </div>`;
    row.innerHTML += newRow;
  }
};
const viewImage = (event) => {
  const img = event.target.closest(`.card`).querySelector(`img`).src;
  const modalBody = document.querySelector(`.modal-body`);
  console.log(modalBody);
  const imgBox = `<img src= "${img}" class= "img-fluid w-100"/>`;
  modalBody.innerHTML = imgBox;
  console.log(imgBox);
};
const addToFav = (e) => {
  document.querySelector(`.fav`).classList.remove(`d-none`);
  const card = e.target.closest(`.col-md-4`);
  console.log(card);
  const favIcon = e.target;
  // console.log(favIcon.textContent);
  favIcon.classList.remove(`bi-heart`);
  favIcon.classList.add(`bi-heart-fill`);
  const favContainer = document.querySelector(`.fav-container`);
  favContainer.innerHTML += `<div class="col-md-4">${card.innerHTML}<div/>`;
};
const clearAll = () => {
  document.querySelector(`.fav`).classList.add(`d-none`);
  const favCards = document.querySelector(`.fav-container`);
  favCards.innerHTML = ``;
  const favIcon = document.querySelectorAll(`.fav-btn`);
  favIcon.forEach((icon) => {
    const allIcons = icon.querySelector(`.bi`);

    allIcons.classList.remove(`bi-heart-fill`);
    allIcons.classList.add(`bi-heart`);
  });
};
// const filterImages = (event) => {
//   const query = event.target.value;
//   // const filtered = data.photos.filter((name) =>
//   //   name.photographer.includes(`Luis`)
//   // );
//   searchImage("book")
//     .then((resp) => resp.json())
//     .then((imageArr) => {
//       console.log(imageArr.photos);
//       const filtered = imageArr.photos.filter((image) =>
//         image.photographer.toLowerCase().includes(query.toLowerCase())
//       );
//       const row = document.querySelector(`.img-row`);
//       row.innerHTML = ``;
//       filtered.forEach((singleCard, i) => {
//         const newRow = ` <div id="card${i}" class="col-md-4">
//         <div class="card mb-4 shadow-sm">
//         <img src="${singleCard.src.tiny}" alt="${singleCard.alt}" />
//         <div class="card-body">
//         <p class="card-text">
//         This is a wider card with supporting text below as a natural
//         lead-in to additional content. This content is a little bit
//         longer.
//         </p>
//         <div
//         class="d-flex justify-content-between align-items-center"
//         >
//         <div class="btn-group">
//         <button
//         type="button"
//         class="btn btn-sm btn-outline-secondary" onclick= "viewImage(event)"
//         data-bs-toggle="modal"
//         data-bs-target="#exampleModal"
//         >
//         View
//         </button>
//         <button
//         type="button"
//         class="btn btn-sm btn-outline-secondary hide-btn"
//         >
//         Hide
//         </button>
//         </div>
//         <small  class="text-muted favourite">${singleCard.id}</small>
//         <span onclick="addToFav(event)" class="text-dark fav-btn"><i class="bi bi-heart fav-icon"></i><span/>
//         </div>
//         </div>
//         </div>
//         </div>`;
//         row.innerHTML += newRow;
//       });
//     });
// };
