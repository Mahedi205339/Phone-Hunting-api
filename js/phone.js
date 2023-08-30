const loadPhone = async (searchText = 'a',isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data
    displayPhones(phones,isShowAll)
}
const displayPhones = (phones,isShowAll) => {
    // console.log(phones)
    const phoneContainer = document.getElementById('phone-container');
    //clear container cards before adding new cards
    phoneContainer.textContent = '';

    //display show more button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-more-container')
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden');
    }
    else {
        showAllContainer.classList.add('hidden');
    }
    // console.log('is show all', isShowAll)
    // display only first 12 phones if not show All
    if (!isShowAll) {
        phones = phones.slice(0, 12);
    }
    // console.log('is show all)

    // phones = phones.slice(0, 12)
    // if (!) {
    //     phones = phones.slice(0, 12)
    // }

    phones.forEach(phone => {
        console.log(phone)

        const phoneCard = document.createElement('div')
        phoneCard.classList = `card bg-gray-100 shadow-xl`
        phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
                    <div class="card-body">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions justify-center">
                            <button onclick="handleShowDetail('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show Details</button>
                        </div>
                    </div>
            `;

        phoneContainer.appendChild(phoneCard)

    })
    //hide loading spinner 
    toggleLoadingSpinner(false)
}

const handleShowDetail = async (id) => {
    console.log('clicked show details', id)
    // load single phone data 
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json();
    const phone = data.data


    showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
    console.log(phone)
    //show the modal
    show_details_modal.showModal()
    // phoneName = document.getElementById('show-detail-phone-name')
    // phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container')
    showDetailContainer.innerHTML = `
    <img class="mx-auto my-4" src="${phone.image}" alt="">
     <h3 class="font-bold text-3xl text-center my-3">
     ${phone.name}
     </h3>
     <h3 class="font-bold text-sm md:text-xl text-gray-700 my-3">
     <span class="font-bold text-sm md:text-xl text-gray-600 " >Brand: </span>${phone?.brand}
     </h3>

     <h3 class="font-bold text-sm md:text-xl text-gray-700 my-3">
     <span class="font-bold text-sm md:text-xl text-gray-600 " >Storage: </span>${phone?.mainFeatures.storage}
     </h3>
     <h3 class=" text-sm md:text-xl text-gray-700 my-3">
     <span class="font-bold text-sm md:text-xl text-gray-600 " >Display Size: </span> ${phone?.mainFeatures?.displaySize}
     </h3>
     <h3 class=" text-sm md:text-xl text-gray-700 my-3">
     <span class="font-bold text-sm md:text-xl text-gray-600 " >Chipset: </span> ${phone?.mainFeatures?.chipSet}
     </h3>

     <h3 class=" text-sm md:text-xl text-gray-700 my-3">
     <span class="font-bold text-sm md:text-xl text-gray-600 " >WLAN: </span> ${phone?.others?.WLAN}
     </h3>
     <h3 class=" text-sm md:text-xl text-gray-700 my-3">
     <span class="font-bold text-sm md:text-xl text-gray-600 " >GPS: </span> ${phone?.others?.GPS}
     </h3>
     <h3 class=" text-sm md:text-xl text-gray-700 my-3">
     <span class="font-bold text-sm md:text-xl text-gray-600 " >Bluetooth: </span> ${phone?.others?.Bluetooth}
     </h3>
     <h3 class=" text-sm md:text-xl text-gray-700 my-3">
     <span class="font-bold text-sm md:text-xl text-gray-600 " >NFC: </span> ${phone.others?.NFC}
     </h3>
     <h3 class=" text-sm md:text-xl text-gray-700 my-3">
     <span class="font-bold text-sm md:text-xl text-gray-600 " >Radio: </span> ${phone?.others?.Radio}
     </h3>
     <h3 class="font-bold text-sm md:text-xl text-gray-700 my-3">
     <span class="font-bold text-sm md:text-xl text-gray-600 " >Release Date: </span>${phone?.releaseDate}
     </h3>

    `

}


//handle search button 
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-feild');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}
// //handle search recap
// const handleSearch2 = () => {
//     toggleLoadingSpinner(true)
//     const searchField = document.getElementById('search-field2');
//     const searchText = searchField.value;
//     loadPhone(searchText)
// }
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    } else {
        loadingSpinner.classList.add('hidden')
    }
}
//handle more 
const handleShowAll = () => {
    handleSearch(true);
}

loadPhone()