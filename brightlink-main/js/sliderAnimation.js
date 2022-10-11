let slider = null;



let primary1 = null;
let primary2 = null;
let secondaryLink = null;
let description = null;



let sliderImage = null;
let navbarExpanded = null;
let changeTime = 11;
let currentPage = 0;

let slider0 = null;
let slider1 = null;
let slider2 = null;
let slider3 = null;

let navBarColor = null;
let navBarColorMobile = null;

let currentPageElement = null;

const informationArray = [
  {
    image: "./images/banner/international-movers.jpg",

    primary1: "Radnom 1",
    primary2: "Random 2",
    secondaryLink: "about us >",
    secondaryLinkHref: "https://www.google.com",
    description: "iqjwak sajdlkj asljd jaslkdj laskdj asdlkj aslkdjl asojdl lkjasd aslkdj asldkj",
  },
  {
    image: "./images/banner/movers-and-packers.jpg",

    primary1: "Radnom 1",
    primary2: "Random 2",
    secondaryLink: "about us",
    secondaryLinkHref: "https://www.google.com",
    description: "iqjwak sajdlkj asljd jaslkdj laskdj asdlkj aslkdjl asojdl lkjasd aslkdj asldkj",
  },
  {
    image: "./images/banner/door-to-door-cargo.jpg",

    primary1: "Radnom 1",
    primary2: "Random 2",
    secondaryLink: "about us",
    secondaryLinkHref: "https://www.google.com",
    description: "iqjwak sajdlkj asljd jaslkdj laskdj asdlkj aslkdjl asojdl lkjasd aslkdj asldkj",

  },
  {
    image: "./images/banner/storage-service.jpg",

    primary1: "Radnom 1",
    primary2: "Random 2",
    secondaryLink: "about us",
    secondaryLinkHref: "https://www.google.com",
    description: "iqjwak sajdlkj asljd jaslkdj laskdj asdlkj aslkdjl asojdl lkjasd aslkdj asldkj",
  },
];

function addKeyFrames() {
  const keyFrames = document.createElement("style");
  keyFrames.innerHTML = `
  @keyframes slideShow {
    0% {
        opacity: 0.5;
        transform: scale(1);
        -ms-transform: scale(1);
        background-position: 0px 0px;
    }


    5% {
      opacity: 0.95;
    }


    100% {

        opacity: 0.95;
        transform: scale(1.2);
        -ms-transform: scale(1.2);
        background-position: -100px 0px;

    }
}

@keyframes textup{
  0%{
    opacity: 0;
    transform: translateY(50px);
  }
  20%{
    opacity: 1;
    transform: translateY(0px);
  }
  80%{
    opacity: 1;
    transform: translateY(0px);
  }
  100%{
    opacity: 0;
    transform: translateY(-50px);
  }
}


  #slider-image {
    animation: slideShow ${changeTime}s linear infinite;

  }

  #primary1 {
    animation: textup ${changeTime}s linear infinite;
  }
  #primary2 {
    animation: textup ${changeTime}s linear infinite;
  }

  #secondary-link {
    animation: textup ${changeTime}s linear infinite;
  }

  #secondary-description {
    animation: textup ${changeTime}s linear infinite;
  }


  
`;

  document.head.appendChild(keyFrames);
}

function defaultNavExpansion() {
  navbarExpanded = document.getElementById("nav-expanded");

  // if mobile screen
  if (window.matchMedia("max-width: 980px")) {
    // if hidden
    if (navbarExpanded.classList.contains("hide")) {
      navbarExpanded.style = "display: none;";
    } else {
      navbarExpanded.classList.add("hide");
      navbarExpanded.style = "display: flex;";
    }
  }
  // display always none in pc
  else {
    navbarExpanded.style = "display: none;";
  }
}

function addScrollEvent() {
  navBarColor = document.getElementById("nav-color");
  navBarColorMobile = document.getElementById("nav-color-mobile");

  window.addEventListener("scroll", function () {
    if (this.window.pageYOffset > 100) {
      navBarColor.style = "background-color: black;";
      navBarColorMobile.style = "background-color: black;";
    } else {
      navBarColor.style = "background-color: transparent;";
      navBarColorMobile.style = "background-color: transparent;";
    }
  });
}

function addMediaQuery() {
  defaultNavExpansion();
  window.addEventListener("resize", (event) => {
    defaultNavExpansion();
  });
}

function setPage(pageNumber) {

  // takes 0 to 3
  let information = informationArray[pageNumber];
  sliderImage.src = information.image;


  primary1.textContent = information.primary1;
  primary2.textContent = information.primary2;
  secondaryLink.textContent = information.secondaryLink;
  secondaryLink.onclick = function () {
    window.location = information.secondaryLinkHref;
  }
  description.textContent = information.description;







}

function setSliders(currentPage) {
  if (currentPage === 0) {
    slider0.style = "background-color: white;";
    slider1.style = "background-color: #dbdbdb;";
    slider2.style = "background-color: #dbdbdb;";
    slider3.style = "background-color: #dbdbdb;";
    currentPageElement.textContent = "01";
  }
  if (currentPage === 1) {
    slider0.style = "background-color: white;";
    slider1.style = "background-color: white;";
    slider2.style = "background-color: #dbdbdb;";
    slider3.style = "background-color: #dbdbdb;";
    currentPageElement.textContent = "02";
  }
  if (currentPage === 2) {
    slider0.style = "background-color: white;";
    slider1.style = "background-color: white;";
    slider2.style = "background-color: white;";
    slider3.style = "background-color: #dbdbdb;";
    currentPageElement.textContent = "03";
  }
  if (currentPage === 3) {
    slider0.style = "background-color: white;";
    slider1.style = "background-color: white;";
    slider2.style = "background-color: white;";
    slider3.style = "background-color: white;";
    currentPageElement.textContent = "04";
  }
}
function startInterval() {
  window.setInterval(function () {
    currentPage = (currentPage + 1) % informationArray.length;
    setPage(currentPage);
    setSliders(currentPage);
  }, changeTime * 1000);
}

function toggleNavButton() {
  navbarExpanded = document.getElementById("nav-expanded");
  if (navbarExpanded.classList.contains("hide")) {
    navbarExpanded.classList.remove("hide");
    navbarExpanded.style = "display: flex;";
  } else {
    navbarExpanded.classList.add("hide");
    navbarExpanded.style = "display: none;";
  }
}
function main() {
  slider = document.getElementById("slider");


  primary1 = document.getElementById('primary1');
  primary2 = document.getElementById('primary2');
  secondaryLink = document.getElementById('secondary-link');
  description = document.getElementById('secondary-description');

  console.log(primary1, primary2, secondaryLink, description);

  // takes 0 to 3
  let information = informationArray[0];


  primary1.textContent = information.primary1;
  primary2.textContent = information.primary2;
  secondaryLink.textContent = information.secondaryLink;
  secondaryLink.onclick = function () {
    window.location = information.secondaryLinkHref;
  }
  description.textContent = information.description;

  sliderImage = document.getElementById("slider-image");

  slider0 = document.getElementById("slider0");
  slider1 = document.getElementById("slider1");
  slider2 = document.getElementById("slider2");
  slider3 = document.getElementById("slider3");

  currentPageElement = document.getElementById("current-page-number");

  slider0.style = "background-color: white;";
  slider1.style = "background-color: #dbdbdb;";
  slider2.style = "background-color: #dbdbdb;";
  slider3.style = "background-color: #dbdbdb;";

  addKeyFrames();
  startInterval();
  addMediaQuery();
  addScrollEvent();
}

main();
