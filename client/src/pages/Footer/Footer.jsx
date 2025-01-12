import React from "react";

const Footer = () => {
  return (
    <footer className="bg-teal-800 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-white">
        <div className="mb-6 md:mb-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">+</span>
            </div>
            <span className="text-xl font-semibold text-white">
              Drs Dentist
            </span>
          </div>
          <p className=" mt-4 text-white">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <button className="bg-[#F7A582] hover:bg-[#e18d68] text-white font-bold py-2 px-4 rounded mt-4">
            Appointment
          </button>
        </div>

        <div className="md:ml-10">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="list-none">
            <li>
              <a href="#" className="text-white hover:text-[#e18d68]">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-[#e18d68]">
                Service
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-[#e18d68]">
                Doctors
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-[#e18d68]">
                Departments
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-[#e18d68]">
                Online Payment
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-[#e18d68]">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-[#e18d68]">
                My Account
              </a>
            </li>
          </ul>
        </div>

        <div className="md:ml-10">
          <h3 className="text-lg font-semibold mb-4">Doc House Services</h3>
          <ul className="list-none">
            <li>
              <a href="#" className="text-white hover:text-[#e18d68]">
                Pediatric Clinic
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-[#e18d68]">
                Diagnosis Clinic
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-[#e18d68]">
                Cardiac Clinic
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-[#e18d68]">
                Laboratory Analysis
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-[#e18d68]">
                Gynecological Clinic
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-[#e18d68]">
                Personal Counseling
              </a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-[#e18d68]">
                Dental Clinic
              </a>
            </li>
          </ul>
        </div>

        <div className="md:ml-10">
          <h3 className="text-lg font-semibold mb-4">Working Hours</h3>
          <ul className="list-none">
            <li>Monday - 10 am to 7 pm</li>
            <li>Tuesday - 10 am to 7 pm</li>
            <li>Wednesday - 10 am to 7 pm</li>
            <li>Thursday - 10 am to 7 pm</li>
            <li>Friday - 10 am to 7 pm</li>
            <li>Saturday - 10 am to 7 pm</li>
            <li>Sunday - 10 am to 7 pm</li>
          </ul>
        </div>
      </div>

      <p className="text-center text-white mt-8">
        Copyright © 2022 - All rights reserved by Doc House Ltd.
      </p>
    </footer>
  );
};

export default Footer;
