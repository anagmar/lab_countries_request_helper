const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Countries = function () {
  this.countries = [];
}

Countries.prototype.getData = function () {
  const request = new RequestHelper("https://restcountries.eu/rest/v2/all");
  const onComplete = (countryData) => {
    console.log(countryData)
      this.countries = countryData;
      PubSub.publish("Countries:all-countries-loaded", this.countries);
      PubSub.subscribe("SelectCountry:change", (evt)=> {
        const selectedIndex = evt.detail;
        this.publishCountryDetail(selectedIndex);
      });
  }
  request.get(onComplete);
};

  Countries.prototype.publishCountryDetail = function (countryIndex) {
    const selectedCountry = this.countries[countryIndex];
    PubSub.publish("Countries:selected-country-ready", selectedCountry);
    console.log(selectedCountry);
  };

module.exports = Countries;
