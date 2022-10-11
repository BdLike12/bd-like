let animationRunning = false;
let animationRunningMobile = false;
let numberOfPages = 5;


function backgroundAnimation(element, time) {

    animationRunning = true;
    animationRunningMobile = true;
    var scaleDecrement = 1 / 700;
    var scale = 1.2;
    var instance = window.setInterval(function () {
        element.style.transform = 'scale(' + scale + ')';
        scale = scale - scaleDecrement;

        if (scale < 1) {
            animationRunning = false;
            animationRunningMobile = false;
            element.style.transform = 'scale(' + 1 + ')';
            window.clearInterval(instance);
        }
    }, time)
}

function heightAnimation(element, startingPercentage, endingPercentage, time) {

    animationRunning = true;
    animationRunningMobile = true;
    var increment = (endingPercentage - startingPercentage) / 25;
    var height = startingPercentage;
    var instance = window.setInterval(function () {

        element.style.height = `${height}%`;
        height = height + increment;

        if (height >= endingPercentage) {
            animationRunning = false;
            animationRunningMobile = false;
            element.style.height = `${endingPercentage}%`;
            window.clearInterval(instance);
        }
    }, time)
}


function textAnimation(element, time) {

    animationRunning = true;
    animationRunningMobile = true;


    element.classList.add('animate-text');

    console.log(animationRunning);

    setTimeout(function () {
        animationRunning = false;
        animationRunningMobile = false;
        console.log(animationRunning);
        element.classList.remove('animate-text');
    }, time * 1000);

}

function slidingAnimation(current, target, time) {

    animationRunning = true;

    let activeContainers = [];


    let { result: places, direction } = countPlaces(current, target); // how many places to slide
    // var distance = places * 100;


    let container = document.getElementById('images-container');

    let imageContainers = document.querySelectorAll('.main .image-container');

    if (imageContainers) {
        for (let i = 0; i < imageContainers.length; i++) {
            container.removeChild(imageContainers[i]);
        }
    }

    for (let i = 0; i < numberOfPages * 2; i++) {
        let imageContainer = document.createElement("div");
        imageContainer.classList.add('image-container');
        let image = document.createElement('img');
        image.src = informationArray[(current + i - 1) % numberOfPages].thumbnailSrc;
        image.onclick = function () {
            setPage(((current + i - 1) % numberOfPages) + 1);
        };

        if (informationArray[(current + i - 1) % numberOfPages].thumbnailSrc === informationArray[target - 1].thumbnailSrc) {
            activeContainers = [...activeContainers, imageContainer];
        }

        imageContainer.appendChild(image);
        container.appendChild(imageContainer);
    }

    // let distance = 12.5 * places;
    var slided = 0;
    let stepDistance = 2;
    // if(places > 2) stepDistance = 2;
    // if(places > 3) stepDistance = 5;




    var instance = window.setInterval(function () {
        let images = document.querySelectorAll('.image-container img');
        for (let i = 0; i < images.length; i++) {
            images[i].style.transform = 'translateX(-' + slided + '%)';
        }




        slided = slided + stepDistance;

        if (slided > places * 110) {
            animationRunning = false;
            for (let i = 0; i < activeContainers.length; i++) {
                // activeContainers[i].classList.add('active-image-container');
                heightAnimation(activeContainers[i], 60, 80, 1);
            }
            window.clearInterval(instance);
        }
    }, time)
}

function slidingAnimationMobile(current, target, time) {

    animationRunningMobile = true;

    let activeContainers = [];


    let { result: places, direction } = countPlaces(current, target); // how many places to slide
    // var distance = places * 100;


    let container = document.getElementById('mobile-images-container');

    let imageContainers = document.querySelectorAll('.mobile-images-container .image-container');

    if (imageContainers) {
        for (let i = 0; i < imageContainers.length; i++) {
            container.removeChild(imageContainers[i]);
        }
    }

    for (let i = 0; i < numberOfPages * 2; i++) {
        let imageContainer = document.createElement("div");
        imageContainer.classList.add('image-container');
        let image = document.createElement('img');
        image.src = informationArray[(current + i - 1) % numberOfPages].thumbnailSrc;
        image.onclick = function () {
            setPageMobile(((current + i - 1) % numberOfPages) + 1);
        };

        if (informationArray[(current + i - 1) % numberOfPages].thumbnailSrc === informationArray[target - 1].thumbnailSrc) {
            activeContainers = [...activeContainers, image];
        }

        imageContainer.appendChild(image);
        container.appendChild(imageContainer);
    }

    // let distance = 12.5 * places;
    var slided = 0;
    let stepDistance = 2;
    // if(places > 2) stepDistance = 2;
    // if(places > 3) stepDistance = 5;




    var instance = window.setInterval(function () {
        let images = document.querySelectorAll('.image-container img');
        for (let i = 0; i < images.length; i++) {
            images[i].style.transform = 'translateX(-' + slided + '%)';
        }




        slided = slided + stepDistance;

        if (slided > places * 110) {
            animationRunningMobile = false;
            for (let i = 0; i < activeContainers.length; i++) {
                // activeContainers[i].classList.add('active-image-container');
                heightAnimation(activeContainers[i], 60, 80, 1);
            }
            window.clearInterval(instance);
        }
    }, time)
}



function countPlaces(current, target) {
    let result;
    let direction = 1;
    if (current === target) result = 0;
    else if (target > current) {
        result = (target - current);
        direction = 1;
    }
    else {
        result = numberOfPages - (current - target);
        direction = -1;
    }
    return { result, direction };

}




let informationArray = [

    {
        title: "Komodo",
        description: "This is a random description for testing. We are currently describing something. Some facts. Some info. About Komodo",
        exploreLink: 'http://www.google.com/search?q=komodo',
        src: "./images/carousel/komodo.jpg",
        thumbnailSrc: "./images/carousel/komodo-c.jpg",
    },
    {
        title: "Kerala",
        description: "This is a random description for testing. We are currently describing something. Some facts. Some info. About Kerala",
        exploreLink: 'http://www.google.com/search?q=Kerala',
        src: "./images/carousel/kerala.jpg",
        thumbnailSrc: "./images/carousel/kerala-c.jpg",
    },

    {
        title: "Matterhorn",
        description: "This is a random description for testing. We are currently describing something. Some facts. Some info. About Matterhorn",
        exploreLink: 'http://www.google.com/search?q=Matterhorn',
        src: "./images/carousel/matterhorn.jpg",
        thumbnailSrc: "./images/carousel/matterhorn-c.jpg",
    },
    {
        title: "Cappadocia",
        description: "This is a random description for testing. We are currently describing something. Some facts. Some info. About Cappadocia",
        exploreLink: 'http://www.google.com/search?q=Cappadocia',
        src: "./images/carousel/cappadocia.jpg",
        thumbnailSrc: "./images/carousel/cappadocia-c.jpg",
    },
    {
        title: "Malgovik",
        description: "This is a random description for testing. We are currently describing something. Some facts. Some info. About Malgovik",
        exploreLink: 'http://www.google.com/search?q=Malgovik',
        src: "./images/carousel/malgovik.jpg",
        thumbnailSrc: "./images/carousel/malgovik-c.jpg",
    },

];


function setPage(pageNumber) {


    if (animationRunning) return;

    let currentInformation = informationArray[pageNumber - 1];



    let backgroundImage = document.getElementById('main-image'); // get
    if (pageNumber !== getCurrentPage()) {
        backgroundAnimation(backgroundImage, 2); // animate
    }

    backgroundImage.src = currentInformation.src; // change src



    let mainTitle = document.getElementById("title"); // get
    mainTitle.textContent = currentInformation.title; // change the title
    textAnimation(mainTitle, 1);

    let descriptionElement = document.getElementById("description"); // get
    descriptionElement.textContent = currentInformation.description; // change the title
    textAnimation(description, 1);

    slidingAnimation(getCurrentPage(), pageNumber, 2);





    for (let i = 1; i <= numberOfPages; i++) {
        let buttonID = "line-button" + i;
        let button = document.getElementById(buttonID);
        button.classList.remove('active');
        button.textContent = '.';
    }
    // active line-button id (?)
    let activeLineButtonID = "line-button" + pageNumber;
    //make the correct button active

    let activeButton = document.getElementById(activeLineButtonID);
    if (!activeButton.classList.contains('active')) activeButton.classList.add('active');
    activeButton.textContent = pageNumber;
    animationRunning = false;




}

function setPageMobile(pageNumber) {




    let currentInformation = informationArray[pageNumber - 1];



    let backgroundImage = document.getElementById('mobile-main-image'); // get
    if (pageNumber !== getCurrentPage()) backgroundAnimation(backgroundImage, 2); // animate
    backgroundImage.src = currentInformation.src; // change src



    let mainTitle = document.getElementById("mobile-title"); // get
    mainTitle.textContent = currentInformation.title; // change the title
    textAnimation(mainTitle, 1);

    let descriptionElement = document.getElementById("mobile-description"); // get
    descriptionElement.textContent = currentInformation.description; // change the title
    textAnimation(descriptionElement, 1);

    // make for mobile
    slidingAnimationMobile(getCurrentPageMobile(), pageNumber, 2);




    for (let i = 1; i <= numberOfPages; i++) {
        let buttonID = "mobile-line-button" + i;
        let button = document.getElementById(buttonID);
        button.classList.remove('active');
        button.textContent = '.';
    }
    // active line-button id (?)
    let activeLineButtonID = "mobile-line-button" + pageNumber;
    //make the correct button active

    let activeButton = document.getElementById(activeLineButtonID);
    if (!activeButton.classList.contains('active')) activeButton.classList.add('active');
    activeButton.textContent = pageNumber;

    animationRunningMobile = false;





}



function getCurrentPage() {
    let currentPage = 0;
    for (let i = 1; i <= numberOfPages; i++) {
        let buttonID = "line-button" + i;
        let button = document.getElementById(buttonID);
        if (button.textContent !== '.') {
            currentPage = i;
        }
    }
    return currentPage;
}


function getCurrentPageMobile() {
    let currentPage = 0;
    for (let i = 1; i <= numberOfPages; i++) {
        let buttonID = "mobile-line-button" + i;
        let button = document.getElementById(buttonID);
        if (button.textContent !== '.') {
            currentPage = i;
        }
    }
    return currentPage;
}

// 1 or -1 
function changeWithLeftRightButton(direction) {
    let currentPage = getCurrentPage();
    if (currentPage + direction <= 0) {
        setPage(numberOfPages);
    }
    else if (currentPage + direction > numberOfPages) {
        setPage(1);
    }
    else {
        setPage(currentPage + direction);
    }
}


// 1 or -1 
function changeWithLeftRightButtonMobile(direction) {
    let currentPage = getCurrentPageMobile();
    if (currentPage + direction <= 0) {
        setPageMobile(numberOfPages);
    }
    else if (currentPage + direction > numberOfPages) {
        setPageMobile(1);
    }
    else {
        setPageMobile(currentPage + direction);
    }
}


function goExplore() {
    let currentPage = getCurrentPage();
    let currentInformation = informationArray[currentPage - 1];
    window.location = currentInformation.exploreLink;
}

function goExploreMobile() {
    let currentPage = getCurrentPageMobile();
    let currentInformation = informationArray[currentPage - 1];
    window.location = currentInformation.exploreLink;
}



setPage(1);
setPageMobile(1);

