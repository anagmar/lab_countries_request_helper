const PubSub = require('../helpers/pub_sub.js');

const CountryInfoView = function (container) {
  this.container = container;
};

  CountryInfoView.prototype.bindEvents = function () {
    PubSub.subscribe("Countries:selected-country-ready", (evt) => {
      const country = evt.detail;
      this.render(country)
    });
  };

  CountryInfoView.prototype.render = function (countryInfo) {
    const infoCountryName = document.createElement("h1");
    infoCountryName.textContent = countryInfo.name;
    const countryFlag = document.createElement("IMG");
    countryFlag.src = countryInfo.flag;
    const region = document.createElement("h2");
    region.textContent = "Region:";
    const infoCountryRegion = document.createElement("p");
    infoCountryRegion.textContent = countryInfo.region;
    const languages = document.createElement("h2");
    languages.textContent = "Languages:";
    // const infoCountryLanguagesList = document.createElement("ul");
    // infoCountryLanguagesList.textContent = "Languages:"
    // const infoCountryLanguages = document.createElement("li");
    // infoCountryLanguages.textContent = countryInfo.languages.name;
    // infoCountryLanguagesList.appendChild(infoCountryLanguages);
    const languageList = this.createLanguageList(countryInfo.languages)


    this.container.innerHTML = "";
    this.container.appendChild(infoCountryName);
    this.container.appendChild(countryFlag);
    this.container.appendChild(region);
    this.container.appendChild(infoCountryRegion);
    this.container.appendChild(languages);
    this.container.appendChild(languageList)
    // this.container.appendChild(infoCountryLanguagesList);

  };

  CountryInfoView.prototype.createLanguageList = function (languages) {
    const list = document.createElement("ul");

    languages.forEach((language) =>{
      const listItem = document.createElement("li");
      listItem.textContent = language.name;
      list.appendChild(listItem);
    });
    return list
  };

module.exports = CountryInfoView
