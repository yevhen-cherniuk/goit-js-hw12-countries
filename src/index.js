import './styles.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

import { error } from '@pnotify/core';
import markupCard from './templates/markupCard.hbs';
import markupList from './templates/markupList.hbs';
import API from './js/fetchCountries';

const debounce = require('lodash.debounce');
const inputRef = document.querySelector('.country-input');
const cardContainerRef = document.querySelector('.card-container');

inputRef.addEventListener('input', debounce(onSearch, 500));

function onSearch(event) {
  let inputValue = event.target.value;

  if (inputValue !== '') {
    API.fetchCountries(inputValue)
      .then(country => {
        if (country.length === 1) {
          return renderCountryCard(country);
        }
        if (country.length >= 2 && country.length <= 10) {
          return renderCountryList(country);
        }
        if (country.length > 10) {
          error({
            delay: 1000,
            text: 'Too many matches found. Please enter a more specific query!',
          });
        }
      })
      .catch(console.log)
      .finally(() => (inputValue = ''));
  }
  cardContainerRef.innerHTML = '';
}

function InsertMarkUp(markup) {
  return (cardContainerRef.innerHTML = markup);
}

function renderCountryCard(country) {
  InsertMarkUp(markupCard(...country));
}

function renderCountryList(country) {
  InsertMarkUp(markupList(country));
}
