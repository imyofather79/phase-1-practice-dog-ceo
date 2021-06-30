let breeds = [];

function loadImages(){
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4" 
    fetch(imgUrl)
    .then (resp => resp.json())
    .then (data => {
        data.message.forEach(image => addImage(image))
    });
}
function addImage(dogPicUrl){
    let container = document.querySelector('#dog-image-container');
    let newImageEl = document.createElement('img');
    newImageEl.src = dogPicUrl;
    container.append(newImageEl);
}


function loadBreedOptions(){
    const breedUrl = 'https://dog.ceo/api/breeds/list/all' 
    fetch(breedUrl)
    .then (resp => resp.json())
    .then (data => {
        breeds = Object.keys(data.message);
        updateBreedList(breeds);
        addBreedSelectListener();
    });
}
function updateBreedList(breeds){
    let ul = document.querySelector('#dog-breeds');
    removeChildren(ul);
    breeds.forEach(breed => addBreed(breed));
}
function removeChildren(element){
    let child = element.lastElementChild;
    while (child){
        element.removeChild(child);
        child = element.lastElementChild;
    }
}
function selectBreedsStartingWith(letter){
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}
function addBreedSelectListener() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function(e){
        selectBreedsStartingWith(e.target.value);
    });
}
function addBreed(breed){
    let ul = document.querySelector('#dog-breeds');
    let li = document.createElement('li');
    li.innerText = breed;
    li.style.cursor = 'pointer';
    ul.append(li);
    li.addEventListener('click', updateColor);
}

function updateColor(event){
    e.target.style.color = 'blue';
}

document.addEventListener('DOMContentLoaded', function (){
    loadImages();
    loadBreedOptions();
});