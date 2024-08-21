import React from "react";
// ** style
import "../assets/CountryWithName.css";
function CountryWithName({ countryImage, imageAlt, name }) {
  return (
    <div className="position-relative text-center text-white background_grey mt-1 mb-1">
      <div className="col">
        <img
          src={countryImage}
          alt={imageAlt}
          className="img-fluid w-100 h-auto country_image_styling"
        />
        <h1 className="text_centered title_main text-white">{name}</h1>
      </div>
    </div>
  );
}

export default CountryWithName;
