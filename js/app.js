const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';

    const searchNull = document.getElementById('search-null');
    if (searchText == '') {
        searchNull.style.display = 'block';
        document.getElementById('search-result').innerHTML = '';
        document.getElementById('phone-details').innerHTML = '';
        document.getElementById('search-not-found').innerHTML = '';

    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

        // Load Data 
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResults(data.data));
        searchNull.style.display = 'none';
    }
}
const displaySearchResults = phones => {
    // console.log(phones);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    if (phones?.length) {
        phones.forEach(phone => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100 border-0">
                <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                    <p class="card-text">${phone.brand}</p>
                    <button onclick="loadPhoneDetail('${phone.slug}')" >Detail</button>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        })
        searchNotFound.style.display = 'none';
    }
    else {
        const searchNotFound = document.getElementById('search-not-found');
        searchNotFound.style.display = 'block';

    }

}

const loadPhoneDetail = phoneId => {
    // console.log(phoneId);
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data.data));
}

// Phone Details
const displayPhoneDetail = phone => {
    // console.log(meal);
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h3 class="card-title">Phone Name: ${phone.name}</h3>
            <p class="card-text"><spen class="fw-bold">Phone Brand:</spen> ${phone.brand}</p>
            <p class="card-text"><spen class="fw-bold">Release Date:</spen> ${phone.releaseDate}</p>
            <p class="card-text"><spen class="fw-bold">Storage:</spen> ${phone.mainFeatures.storage}</p>
            <p class="card-text"><spen class="fw-bold">Display Size: </spen> ${phone.mainFeatures.displaySize}</p>
            <p class="card-text"><spen class="fw-bold">ChipSet: </spen> ${phone.mainFeatures.chipSet}</p>
            <p class="card-text"><spen class="fw-bold">Memory: </spen> ${phone.mainFeatures.memory}</p>
            <p class="card-text"><spen class="fw-bold">Sensors: </spen> ${phone.mainFeatures.sensors}</p>
            <p class="card-text"><spen class="fw-bold">Others: </spen> ${phone.others.WLAN}.</p>
            <p class="card-text"><spen class="fw-bold">Bluetooth: </spen> ${phone.others.Bluetooth}</p>
            <p class="card-text"><spen class="fw-bold">GPS: </spen> ${phone.others.GPS}</p>
            <p class="card-text"><spen class="fw-bold">NFC: </spen> ${phone.others.NFC}</p>
            <p class="card-text"><spen class="fw-bold">Radio: </spen> ${phone.others.Radio}</p>
            <p class="card-text"><spen class="fw-bold">USB: </spen> ${phone.others.USB}</p>
            <p class="card-text"><spen class="fw-bold">USB: </spen> ${phone.others.USB}</p>

        </div>
    `;
    document.getElementById('search-result').innerHTML = '';
    phoneDetails.appendChild(div);
}
