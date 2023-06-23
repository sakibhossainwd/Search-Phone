// async await
const loadPones = async(inputValue, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`
    // console.log(url)
    // add error and async await
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayPhonesDetails(data.data, dataLimit)
    }
    catch(error){
        console.log('Error:- ', error)
    }
};

const displayPhonesDetails = (phones, dataLimit) => {
    const phonesContainer = document.getElementById('phones-container');
    phonesContainer.innerHTML = ""
    // phones = phones.slice(0, 3)
    // limited phone show
    const showMore = document.getElementById('show-more');
    if(dataLimit && phones.length > 6){
        phones = phones.slice(0, 6)
        showMore.classList.remove('d-none');
    }
    else{
        showMore.classList.add('d-none');
    }
    // dislay no phone found
    const noPhone = document.getElementById('no-phone');
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else {
        noPhone.classList.add('d-none');
    }
    // display all phones
    phones.forEach(phone => {
        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add("col");
        div.innerHTML = `
        <div class="card p-3 mb-3 rounded-3">
        <img src="${phone.image}" class="card-img-top m-auto" alt="...">
                <div class="card-body mt-3">
                  <h5 class="card-title fw-bold">Name: ${phone.phone_name}</h5>
                  <p class="fw-medium">Slug: ${phone.slug}</p>
                  <button onclick="loadModalDetails('${phone.slug}') "type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal">
    See Details
  </button>
                </div>
        </div>
        `
        phonesContainer.appendChild(div);
    });
    // stop reload spiner
    toggleSpinner(false)
}


const processSearch = (dataLimit) => {
    // start reload spiner
    toggleSpinner(true)
    const inputField = document.getElementById('seach-Field');
    const inputValue = inputField.value;
    loadPones(inputValue, dataLimit);
    // inputField.value = '';
}


// handle seaach button click
document.getElementById('search-btn').addEventListener('click', function(){
    processSearch(6)

    if(inputField === ''){
        alert('Please Enter your phone name');
    }

})

// serach field will when press Enter
const input = document.getElementById('seach-Field');
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
    //   document.getElementById("search-btn").click();
    //   or
    processSearch(6);
    }
  });

const toggleSpinner = isLoading => {
    const reloadSpiner = document.getElementById('reload-spiner');
    if(isLoading){
        reloadSpiner.classList.remove('d-none')
    }
    else{
        reloadSpiner.classList.add('d-none')
    }
}

// not the best solution
document.getElementById('btn-show-all').addEventListener('click', function(){
    processSearch()
})



// modal part
const loadModalDetails = async(phoneSlug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${phoneSlug}`
    // console.log(url)
    // add error and async await
    try{
        const res = await fetch(url);
        const data = await res.json();
        displayModalDetails(data.data)
    }
    catch(error){
        console.log('Error:- ', error)
    }
};



const displayModalDetails= (phone) => {
    // console.log(phone.brand)
    const modalTitle = document.getElementById('modal-title');
    modalTitle.innerText = `${phone.name}`
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = ''
    const modalBody = document.createElement('div');
    const allSensors = phone.mainFeatures.sensors;
    allSensors.forEach(sensor => {
        const sensors = sensor;
        console.log(sensors)
        modalBody.innerHTML = `
    <h5>Brand: ${phone.brand}</h5>
    <h5>MainFeatures:-</h5>
    <ul>
        <li>ChipSet: ${phone.mainFeatures.chipSet}</li>
        <li>DisplaySize: ${phone.mainFeatures.displaySize}</li>
        <li>Memory: ${phone.mainFeatures.memory}</li>
        <li>Sensors: ${sensors}</li>
        <li>Storage: ${phone.mainFeatures.storage}</li>
    </ul>
    <h5>ReleaseDate: ${phone.releaseDate  ? phone.releaseDate : 'No Release Date Found'}</h5>
    `
    detailsContainer.appendChild(modalBody);
    })
    
}



// defult perameter for phone loeaded
loadPones('iphone');