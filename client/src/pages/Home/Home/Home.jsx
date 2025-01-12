import React from "react";
import Banner from "../../Shared/Banner/Banner";
import ServiceSection from "../Services/ServiceSection";
import ContactSection from "../../Shared/ContactSection/ContactSection";
import Testimonials from "../../Shared/Testimonials/Testimonials";
import DoctorsList from "../../Shared/DoctorsSection/DoctorsList";
import Contact from "../../Shared/Contact/Contac";

const Home = () => {
  return (
    <div className=" text-white">
      <Banner></Banner>
      <ServiceSection></ServiceSection>
      <ContactSection></ContactSection>
      <Testimonials></Testimonials>
      <DoctorsList></DoctorsList>
      <Contact></Contact>
    </div>
  );
};

export default Home;
