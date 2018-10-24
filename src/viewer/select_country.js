const PubSub = require('../helpers/pub_sub.js');

const SelectCountry = function (element){
  this.element = element;
};

 SelectCountry.prototype.bindEvents = function () {
   PubSub.subscribe("Countries:all-countries-loaded", (evt) => {
     const allCountries = evt.detail;
     console.log(allCountries)
     this.populate(allCountries);
   });
   this.element.addEventListener('change', (evt) => {
     const selectedIndex = evt.target.value;
     PubSub.publish("SelectCountry:change", selectedIndex);
   });
 };

  SelectCountry.prototype.populate = function (countriesData) {
    countriesData.forEach((country, index) => {
      const option = document.createElement("option");
      option.textContent = country["name"];
      option.value = index;
      this.element.appendChild(option);
    });
  };

module.exports = SelectCountry;
