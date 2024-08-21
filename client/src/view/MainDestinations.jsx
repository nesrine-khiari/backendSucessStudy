import React from "react";
// ** parts
import CountryWithName from "../components/CountryWithName";
import PublicNavBar from "./../partials/header/PublicNavBar";
import Footer from "./../partials/footer/Footer";
import NavBar from "./../partials/header/AuthNavBar";
// ** pictures
import espagne from "../assets/images/espagne.webp";
import france from "../assets/images/france.webp";
import belgique from "../assets/images/belgique.webp";
import canada from "../assets/images/canada.webp";
// ** assets
import "../assets/styles/MainDestination.css";
// ** ==>
function MainDestinations() {
  return (
    <>
      <NavBar />
      <main className="container mainDestinationContainer">
        <div className="my-5 py-5">
          <h1 className="color_second title_main text-center mb-2 mainDestinationMainTitle">
            Nos principales destinations{" "}
            <span className="color_main title_main">d'études</span>
          </h1>
          <h2 className="title_second text-center text-uppercase color_main mainDestinationSubTitle">
            NOUS VOUS OUVRONS UN MONDE D'OPPORTUNITÉS ET D'EXPÉRIENCES !
          </h2>
        </div>
        <section className="row mb-5 px-5 pb-5">
          <div className="col-md-6">
            <CountryWithName
              countryImage={espagne}
              imageAlt={"Espagne"}
              name="Espagne"
            />
          </div>
          <div className="col-md-6">
            <CountryWithName
              countryImage={france}
              imageAlt={"france"}
              name="France"
            />
          </div>
          <div className="col-md-6">
            <CountryWithName
              countryImage={belgique}
              imageAlt={"Belgique"}
              name="Belgique"
            />
          </div>
          <div className="col-md-6">
            <CountryWithName
              countryImage={canada}
              imageAlt={"Canada"}
              name="Canada"
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default MainDestinations;
