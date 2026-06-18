import React from "react";
import MenuTab from "../../components/menuTab";
import Homeslide from "../../components/Homeslide";
import AboutUsPreview from "../../components/About Us";
import Footer from "../../components/footer";
import Volunteer from "../../components/volunteer";
import Countdown from "../../components/Countdown";
import GetInvolvedTeaser from "../../components/Get Invovled teaser";
import FAQ from "../../components/FAQ";
import EventLocation from "../../components/location";
import ContactUs from "../../components/Contact Us";
import FestivalAnnouncements from "../../components/Announcements";
import PartnerGrid from "../../components/PartnerGrid";


const Home = () => {
  return (
    <div className="home-page">
      {/* <MenuTab />   fixed header */}
      <Homeslide />
      
      <AboutUsPreview />
      <Countdown />
      <PartnerGrid />
      <FestivalAnnouncements />
      <GetInvolvedTeaser />
      <FAQ />
      <EventLocation />
      <Volunteer />
      <ContactUs />
      <section className="home-section">
        {/* Blank white section for now */}
      </section>
       {/* <Footer /> */}
    </div>
  );
};

export default Home;
