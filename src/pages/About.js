import React from "react";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPowerOff,
  faCertificate,
  faLeaf,
  faWrench,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

import AboutPage from "./About.styled";
import { ReactComponent as MedicineIllustration } from "../assets/illustrations/medicine.svg";
import { ReactComponent as WorldIllustration } from "../assets/illustrations/world.svg";

import KardiaImg from "../assets/about/kardia.png";
import ReactImage from "../assets/about/react_native_icon.png";
import Web3Image from "../assets/about/web3js.jpg";
import JavascriptImage from "../assets/about/js_icon.png";
import NodeImage from "../assets/about/nodejs_icon.png";
import MongoImage from "../assets/about/mongodb_programming_icon.png";

// import OmkarImage from "../assets/about/omkar.jpg";
// import RupeshImage from "../assets/about/rupesh.jpg";
// import AniImage from "../assets/about/aniruddha.jpg";
// import OmImage from "../assets/about/om.jpg";
// import MayureshImage from "../assets/about/mayuresh.jpg";

// const team = [
//   {
//     name: "Aniruddha Shriwant",
//     linkedin: "https://linkedin.com/in/aniruddha-shriwant",
//     intro: "Frontend Dev",
//     dp: AniImage,
//   },
//   {
//     name: "Omkar Phansopkar",
//     linkedin: "https://linkedin.com/in/omkarphansopkar",
//     intro: "Full stack developer",
//     dp: OmkarImage,
//   },
//   {
//     name: "Rupesh Raut",
//     linkedin: "https://www.linkedin.com/in/rupesh-raut-2003",
//     intro: "MERN stack developer",
//     dp: RupeshImage,
//   },
//   {
//     name: "Om Avhad",
//     linkedin: "https://linkedin.com/in/om-avhad-2ba13921a",
//     intro: "Python Engineer",
//     dp: OmImage,
//   },
//   {
//     name: "Mayuresh Shinde",
//     linkedin: "https://linkedin.com/in/",
//     intro: "Designer",
//     dp: MayureshImage,
//   },
// ];

const About = () => {
  return (
    <AboutPage>
      {/* <Container className="jumbotron text-center">
                <h1>Medikeep</h1>
                <p>A Decentralised Platform </p>
            </Container> */}

      <Container id="about" className="container-fluid">
        <div className="row">
          <div className="col-sm-8">
            <br />
            <br />
            <h2>Medblock</h2>
            <br />
            <h4>
              A <b>Decentralised platform</b> to store patient’s medical records
              in a chronological order using blockchain technology.
            </h4>
            <br />
            <p>
              No need to carry all the files when visiting a doctor. Scan your
              public key & have your records at your finger tips anywhere
              <br /> Assuming it as a legally compliant activity, medical
              history can never be framed
            </p>
            <br />
            {/* <button className="btn btn-default btn-lg">Get in Touch</button> */}
          </div>
          <div className="col-sm-4 py-3">
            <span className="glyphicon mt-2">
              <MedicineIllustration className="company_logo w-100" />
            </span>
          </div>
        </div>
      </Container>

      <div className="container-fluid bg-grey">
        <div className="row">
          <div className="col-sm-4">
            <span className="glyphicon ">
              <WorldIllustration className="company_logo w-100" />
            </span>
          </div>
          <div className="col-sm-8 p-5">
            <center>
              <h2>Why Decentralised ?</h2>
              <br />
              <h3 className="why-description">
                {" "}
                Maximum availability, since blockchain never sleeps !
                <br /> Neither hospital nor you can tamper the data solely.
                <br /> This prevents any fraud Data is safe as it is stored on
                millions of computers by consensus
              </h3>
              <br />
            </center>
          </div>
        </div>
      </div>

      <div className="container">
        <div id="services" className="container-fluid text-center">
          <h2>Features</h2>
          {/* <h4>What we offer</h4> */}
          <br />
          <div className="row">
            <div className="col-sm-4">
              <FontAwesomeIcon
                icon={faPowerOff}
                className="featureIcons fa-3x"
              />
              <h4>UPTIME</h4>
              {/* <br /> */}
              <p>System is always up!</p>
            </div>
            <div className="col-sm-4">
              <FontAwesomeIcon icon={faHeart} className="featureIcons fa-3x" />
              <h4>DECENTRALISED</h4>
              {/* <br /> */}
              <p>Data not Centered</p>
            </div>
            <div className="col-sm-4">
              <FontAwesomeIcon icon={faLock} className="featureIcons fa-3x" />
              <h4>SECURED</h4>
              {/* <br /> */}
              <p>Highly Secured</p>
            </div>
          </div>
          <br />
          <br />
          <div className="row ">
            <div className="col-sm-4">
              <FontAwesomeIcon icon={faLeaf} className="featureIcons fa-3x" />
              <h4>AUTHENTICITY</h4>
              {/* <br /> */}
              <p>Authenticated Data</p>
            </div>
            <div className="col-sm-4">
              <FontAwesomeIcon
                icon={faCertificate}
                className="featureIcons fa-3x"
              />
              <h4>CERTIFIED</h4>
              {/* <br /> */}
              <p>Need to be Certified</p>
            </div>
            <div className="col-sm-4">
              <FontAwesomeIcon icon={faWrench} className="featureIcons fa-3x" />
              <h4 style={{ color: "#303030" }}>ACCESSBILITY</h4>
              {/* <br /> */}
              <p>User Friendly</p>
            </div>
          </div>
        </div>

        <div id="services" className="container-fluid text-center">
          <h2>Tech Stack</h2>
          <div className="row text-center">
            <div className=" col-sm-4 my-4">
              <img
                src={KardiaImg}
                width="100px"
                height="100px"
                alt="Ethereum"
              />
              <br />
              <br />
              <h4 style={{ color: "#303030" }}>KardiaChain</h4>
            </div>
            <div className=" col-sm-4 my-4">
              <img src={ReactImage} width="100px" height="100px" alt="react" />
              <br />
              <br />
              <h4 style={{ color: "#303030" }}>React js</h4>
            </div>
            <div className=" col-sm-4 my-4">
              <img src={Web3Image} width="100px" height="100px" alt="web3" />
              <br />
              <br />
              <h4 style={{ color: "#303030" }}>Web3.js</h4>
            </div>
          </div>
          <div className="row text-center slideanim">
            <div className=" col-sm-4 my-4">
              <img
                src={JavascriptImage}
                width="100px"
                height="100px"
                alt="Javascript"
              />
              <br />
              <br />
              <h4 style={{ color: "#303030" }}>Javascript</h4>
            </div>
            <div className="col-sm-4 my-4">
              <img src={NodeImage} width="100px" height="100px" alt="Node js" />
              <h4 style={{ color: "#303030" }}>Nodejs</h4>
              <br />
              <br />
            </div>
            <div className=" col-sm-4 my-4">
              <img
                src={MongoImage}
                width="100px"
                height="100px"
                alt="MongoDB"
              />
              <br />
              <br />
              <h4 style={{ color: "#303030" }}>MongoDB</h4>
            </div>
          </div>
        </div>
      </div>

      {/* <div id="portfolio" className="container-fluid text-center bg-grey">
        <h2>OUR MENTOR</h2>
        <br />
        <div className=" text-center  ">
          <h1 style={{ color: "#303030" }}> Mrs. Vandana Lokhande</h1>
          <h4>
            HOD, Computer Department <br />
            Government Ploytechnic Mumbai
          </h4>
        </div>
      </div> */}

      {/* <div id="portfolio" className="container-fluid text-center bg-grey">
        <h2>WHO WE ARE</h2>
        <br />
        <div className="row text-center">
          {team.map((teamMember) => (
            <div className="col-sm-4" key={teamMember.name}>
              <div className="thumbnail">
                <a href={teamMember.linkedin} target="_blank" rel="noreferrer">
                  <img
                    alt={teamMember.name}
                    src={teamMember.dp}
                    width="400"
                    height="300"
                  />
                  <p>
                    <strong>{teamMember.name}</strong>
                  </p>
                  <p>{teamMember.intro}</p>
                </a>
              </div>
            </div>
          ))}
        </div>
        <br />
      </div> */}

      <footer className="container-fluid p-2 text-center">
        <p>
          GitHub Repo{" "}
          <a
            href="https://github.com/code-squads/medblock"
            title="Contribute to Medblock"
            rel="noreferrer"
            target="_blank"
          >
            medblock
          </a>
        </p>
      </footer>
    </AboutPage>
  );
};

export default About;
