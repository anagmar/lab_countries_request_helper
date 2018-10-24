const Countries = require('./model/countries.js');
const SelectCountry = require('./viewer/select_country.js');
const SelectedCountry = require("./viewer/selected_country.js")

document.addEventListener('DOMContentLoaded', () => {

  const countries = new Countries()
  countries.getData();

  const selectedElement = document.querySelector("select#countries");
  const countryDropdown = new SelectCountry(selectedElement);
  countryDropdown.bindEvents();

  const infoSec = document.querySelector("div#country")
  const selectedCountry = new SelectedCountry(infoSec);
  selectedCountry.bindEvents();

});
