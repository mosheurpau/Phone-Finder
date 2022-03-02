const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
const toggleSearchResult = displayStyle => {
    document.getElementById('search-result').style.display = displayStyle;
}

const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // display spinner
    toggleSpinner('block');
    toggleSearchResult('none');
    // clear data
    searchField.value = '';

    // error handling when search filed null 
    const searchNull = document.getElementById('search-null');
    if (searchText == '') {
        searchNull.style.display = 'block';
        document.getElementById('search-result').innerHTML = '';
        document.getElementById('phone-details').innerHTML = '';
        document.getElementById('search-not-found').style.display = 'none';
        document.getElementById('show-all-btn').style.display = 'none';
        toggleSpinner('none');



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

const searchNotFound = document.getElementById('search-not-found');
const displaySearchResults = phones => {
    // console.log(phones);
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';

    const showPhone = phones.slice(0, 20);
    if (showPhone?.length) {
        showPhone.forEach(phone => {
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
        toggleSpinner('none');
        toggleSearchResult('flex');
        searchNotFound.style.display = 'none';
        document.getElementById('show-all-btn').style.display = 'block';

    }
    else {
        searchNotFound.style.display = 'block';
        document.getElementById('phone-details').innerHTML = '';
        document.getElementById('show-all-btn').style.display = 'none';
        toggleSpinner('none');

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

    // chake relase date
    const chakeRelaseDate = () => {
        if (phone.releaseDate?.length) {
            return (phone.releaseDate);
        }
        else {
            return ("Release date is not available.");
        }
    }

    // chake others features and error handle 
    function othersInfo(features) {
        if (phone?.hasOwnProperty('others')) {
            let feature = "";
            for (let x in features) {
                feature += `<br> ${x}: ${features[x]} `;
            }
            return feature;
        }
        else {
            return (' is not available.');
        }
    }
    othersInfo();


    div.innerHTML = `
        <img src="${phone.image}" class="card-img-top img-fluid" alt="...">
        <div class="card-body">
            <h3 class="card-title">Phone Name: ${phone.name}</h3>
            <p class="card-text"><spen class="fw-bold">Phone Brand:</spen> ${phone.brand}</p>
            <p class="card-text"><spen class="fw-bold">Release Date:</spen> ${chakeRelaseDate()} </p>
            <p class="card-text"><spen class="fw-bold">Storage:</spen> ${phone.mainFeatures.storage}</p>
            <p class="card-text"><spen class="fw-bold">Display Size: </spen> ${phone.mainFeatures.displaySize}</p>
            <p class="card-text"><spen class="fw-bold">ChipSet: </spen> ${phone.mainFeatures.chipSet}</p>
            <p class="card-text"><spen class="fw-bold">Memory: </spen> ${phone.mainFeatures.memory}</p>
            <p class="card-text"><spen class="fw-bold">Sensors: </spen> ${phone.mainFeatures.sensors}</p>
            <p class="card-text"><spen class="fw-bold">Others features: </spen> ${othersInfo(phone.others)}.</p>
            
        </div>
    `;

    phoneDetails.appendChild(div);

}
