import React from 'react';
import ARRAY_NUMBER from '../assets/CountriesN';

function CountryOptions() {
  return (
    <>
      <option disabled defaultValue>Select a country</option>
      {ARRAY_NUMBER.map(countryObj => (
        <option key={countryObj.country} value={countryObj.country}>{countryObj.country}</option>
      ))}
    </>
  );
}

export default CountryOptions;