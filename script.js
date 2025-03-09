const dropDownMenu = document.querySelector('.drop-down-menu')
const dropDownItems = document.querySelector(".drop-down-content")
const mainBox = document.querySelector('main')
const modeBox = document.querySelector('.mode-box')
const bodyElement = document.querySelector('body')
const inputField = document.querySelector('.search-input')
const sectionBox = document.querySelector('section')
dropDownMenu.addEventListener("click", (event) => {
    if (event.target.tagName === 'P' || event.target.tagName === "I") {
       
        dropDownItems.classList.toggle('hidden')
    }
})


// Getting all countries 
async function getCountries(params) {
    let res = await fetch('https://restcountries.com/v3.1/all')
    let allCountries = await res.json()
    
    allCountries.forEach(country => {
        //creating elements
        let CountryBox = document.createElement('div')
        let flagImage = document.createElement('img')
        let CountryInfo = document.createElement('div')
        let countryNameElement = document.createElement('h3')
        let countryPopulationElement = document.createElement('p')
        let countryRegionElement = document.createElement('p')
        let countryCapitalElement = document.createElement('p')

        //creating label
        let populationLabel = document.createElement('strong')
        let regionLabel = document.createElement('strong')
        let capitalLabel = document.createElement('strong')

        //filling labaels 

        populationLabel.textContent = 'Population: '
        regionLabel.textContent = 'Region: '
        capitalLabel.textContent = 'Capital: '


        //styling 
        CountryBox.classList.add('small')
        flagImage.classList.add('flag-img-style')
        CountryInfo.classList.add('country-description-style')
        countryRegionElement.classList.add('country-region')
        countryNameElement.classList.add('country-name')

        countryBoxes = document.querySelectorAll('.small')
        //extracting info 

        let countryImageSrc = country.flags.svg
        let countryName = country.name.common
        let countryPopulation = country.population.toLocaleString();
        let countryRegion = country.region
        let countryCapital = country.capital


        //filling elements 

        flagImage.src = countryImageSrc
        countryNameElement.textContent = countryName
        countryPopulationElement.append(populationLabel, countryPopulation)
        countryRegionElement.append(regionLabel, countryRegion)
        countryCapitalElement.append(capitalLabel, countryCapital)

        //appending 

        CountryInfo.append(countryNameElement, countryPopulationElement, countryRegionElement, countryCapitalElement)


        CountryBox.append(flagImage, CountryInfo)

        //addding region attribute to country box for easy filteration 

        CountryBox.setAttribute('data-country-region', country.region)

        //adding country name attribute 
        CountryBox.setAttribute('data-country-name', countryName)

        //adding it to the doc 
        mainBox.append(CountryBox)


        //when the user clicks on a box 




    });

    

}

 getCountries()
//filtering based on region 

dropDownItems.addEventListener('click', (event) => {
    if (event.target.tagName === 'I') {
        let selectedRegion = event.target.textContent
        // countryFilterByregion(selectedRegion)
        let allCountries = document.querySelectorAll('.small')

        allCountries.forEach((country)=>{
            country.style.display=country.getAttribute('data-country-region') === selectedRegion ? 'block' :'none'
        })
       
    }
})



//dark mode logic 

modeBox.addEventListener('click', () => {
    bodyElement.classList.toggle('dark-mode')
})


// search functionality 

inputField.addEventListener('input', (event) => {
    let allCountries = [...document.querySelectorAll('.small')]
    if (event.target.value.trim() !== "") {
        let userInput = event.target.value.toUpperCase()
        
        let filteredCountries = allCountries.filter((country) => {
            let countryName = country.getAttribute('data-country-name').toUpperCase()
            return !countryName.startsWith(userInput)
        })

        //making sure all countries are visible

        allCountries.forEach((country) => {
            country.style.display = 'block'
        });
        //hidding countries
        filteredCountries.forEach((country) => {
            country.style.display = 'none'
        });
    }
    else{
        allCountries.forEach((country) => {
            country.style.display = 'block'
        });
    }

})



// when the user clicks on a country  

mainBox.addEventListener('click', (event) => {
    // Proper event delegation: check if any parent of the clicked element has the class 'small'
    let clickedCountry = event.target.closest('.small');

    // Ensure that the element with class 'small' is inside the mainBox
    if (clickedCountry && mainBox.contains(clickedCountry)) {

        //deleting the page content 
        // let sectionBoxContent=[...sectionBox.children]
        // sectionBoxContent.forEach(element => {
        //     element.remove()
        // });
        sectionBox.style.display='none'
        //selected country name 
        let selectedCountryName = clickedCountry.getAttribute('data-country-name')



        //gets country info and fills up the page with it 
        async function CountryInfo(selectedCountryName) {
            let res = await fetch(`https://restcountries.com/v3.1/name/${selectedCountryName}`)
            let country = await res.json()
            let countryDetails = country[0]
            //getting details 
            let flagSrc = countryDetails.flags.svg
            let nativeName = countryDetails.name.nativeName
                ? Object.values(countryDetails.name.nativeName)[0].common
                : 'No native name available';
            let population = countryDetails.population.toLocaleString()
            let region = countryDetails.region
            let capital = countryDetails.capital
            let borderCountries = countryDetails.borders ? countryDetails.borders.toLocaleString() : 'No border countries';
            let topLevelDomain = countryDetails.tld
            let currencies = countryDetails.currencies
                ? Object.values(countryDetails.currencies).map(currency => currency.name).join(', ')
                : 'No currencies available';
                let languages = Object.values(countryDetails.languages);

            //creating main elements 
            let detailBoxMain = document.createElement('div')  // all parent
            let flagBox = document.createElement('div')  // image holder
            let descriptionBox = document.createElement('div') // all details
            let leftDes = document.createElement('div') //left details
            let rightDes = document.createElement('div') //right details 

            //creating back button
            let backBox = document.createElement('div')
            let backBtn = document.createElement('button')
            let backArrow = document.createElement('i')
            // filling up back button 
            backBtn.textContent = 'Back'
            backArrow.classList.add('fa-solid', 'fa-arrow-left-long')
            backBox.append(backArrow, backBtn)

            //creating labels 
            let labelNativeName = document.createElement('strong')
            labelNativeName.textContent = 'Native Name: '
            let populationLabel = document.createElement('strong')
            populationLabel.textContent = 'Population: '
            let regionLabel = document.createElement('strong')
            regionLabel.textContent = 'Region: '
            let capitalLabel = document.createElement('strong')
            capitalLabel.textContent = 'Capital: '
            let BorderLabel = document.createElement('strong')
            BorderLabel.textContent = 'Border Countries: '
            let topLevelDomainLabel = document.createElement('strong')
            topLevelDomainLabel.textContent = 'Top Level Domain: '
            let currenciesLabel = document.createElement('strong')
            currenciesLabel.textContent = 'Currencies: '
            let languagesLabel = document.createElement('strong')
            languagesLabel.textContent = 'Languages: '

            //creating elements 
            let flagImagElement = document.createElement('img')
            let nativeNameElement = document.createElement('p')
            let populationElement = document.createElement('p')
            let regionElement = document.createElement('p')
            let capitalElement = document.createElement('p')
            let borderElement = document.createElement('p')
            let topLevelDomainElement = document.createElement('p')
            let currenciesElement = document.createElement('p')
            let languagesElement = document.createElement('p')

            //filling up elements 
            flagImagElement.src = flagSrc
            nativeNameElement.textContent = nativeName
            populationElement.textContent = population
            regionElement.textContent = region
            capitalElement.textContent = capital
            borderElement.textContent = borderCountries
            topLevelDomainElement.textContent = topLevelDomain
            currenciesElement.textContent = currencies
            languagesElement.textContent = languages

            //individual boxes

            let nativNameBox = document.createElement('div')
            let populationBox = document.createElement('div')
            let regionBox = document.createElement('div')
            let capitalBox = document.createElement('div')
            let borderBox = document.createElement('div')
            let topLevelDomainBox = document.createElement('div')
            let CurrenciesBox = document.createElement('div')
            let languagesBox = document.createElement('div')
            let mainBox = document.createElement('div')


            //appending individual elements to their respective boxes

            nativNameBox.append(labelNativeName, nativeNameElement)
            populationBox.append(populationLabel, populationElement)
            regionBox.append(regionLabel, regionElement)
            capitalBox.append(capitalLabel, capitalElement)
            borderBox.append(BorderLabel, borderElement)
            topLevelDomainBox.append(topLevelDomainLabel, topLevelDomainElement)
            CurrenciesBox.append(currenciesLabel, currenciesElement)
            languagesBox.append(languagesLabel, languagesElement)

            // adding style classes
            mainBox.classList.add('country-page-main-box')
            backBox.classList.add('back-box')
            backBtn.classList.add('back-btn')
            detailBoxMain.classList.add('detail-box')
            flagBox.classList.add('flag-box')
            descriptionBox.classList.add('description-box')
            leftDes.classList.add('details')
            rightDes.classList.add('details')
            nativNameBox.classList.add('common')
            populationBox.classList.add('common')
            regionBox.classList.add('common')
            capitalBox.classList.add('common')
            borderBox.classList.add('common')
            topLevelDomainBox.classList.add('common')
            CurrenciesBox.classList.add('common')
            languagesBox.classList.add('common')
            flagImagElement.classList.add('big-flag')
            //appending element boxes to bigger boxes 


            flagBox.append(flagImagElement) // image box filled with image
            leftDes.append(nativNameBox, populationBox, regionBox, capitalBox, borderBox) //left details
            rightDes.append(topLevelDomainBox, CurrenciesBox, languagesBox) //right details 
            descriptionBox.append(leftDes, rightDes) // country description filled 
            detailBoxMain.append(flagBox, descriptionBox) // fiilling main detail box with image and descripitin box 
            mainBox.append(backBox, detailBoxMain)

            document.body.append(mainBox)

            //back button implementation 

            backBox.addEventListener('click',()=>{
                mainBox.style.display='none'
               sectionBox.style.display='block'
            })


        }

        CountryInfo(selectedCountryName)


    }

});