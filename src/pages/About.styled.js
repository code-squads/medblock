import styled from "styled-components";

export default styled.div`
  font: 400 15px Lato, sans-serif;
  line-height: 1.8;
  color: #818181;

  h2 {
    font-size: 24px;
    text-transform: uppercase;
    color: #303030;
    font-weight: 600;
    margin-bottom: 30px;
  }

  h4 {
    font-size: 19px;
    line-height: 1.375em;
    color: #303030;
    font-weight: 400;
    margin-bottom: 30px;
  }

  .jumbotron {
    background-color: #6572d0;
    color: #fff;
    padding: 100px 25px;
    font-family: Montserrat, sans-serif;
  }

  .container-fluid {
    padding: 60px 50px;
  }

  .bg-grey {
    background-color: #f6f6f6;
  }

  .logo-small {
    color: #6572d0;
    font-size: 50px;
  }

  .logo {
    color: #6572d0;
    font-size: 200px;
  }

  .thumbnail {
    padding: 0 0 15px 0;
    border: none;
    border-radius: 0;
  }

  .thumbnail a {
    text-decoration: none;
    color: #303030;
  }

  .thumbnail img {
    width: 300px;
    height: 350px;
    margin: 10px;
  }

  .carousel-control.right,
  .carousel-control.left {
    background-image: none;
    color: #6572d0;
  }

  .carousel-indicators li {
    border-color: #6572d0;
  }

  .carousel-indicators li.active {
    background-color: #6572d0;
  }

  .item h4 {
    font-size: 19px;
    line-height: 1.375em;
    font-weight: 400;
    font-style: italic;
    margin: 70px 0;
  }

  .item span {
    font-style: normal;
  }

  .panel {
    border: 1px solid #6572d0;
    border-radius: 0 !important;
    transition: box-shadow 0.5s;
  }

  .panel:hover {
    box-shadow: 5px 0px 40px rgba(0, 0, 0, 0.2);
  }

  .panel-footer .btn:hover {
    border: 1px solid #6572d0;
    background-color: #fff !important;
    color: #6572d0;
  }

  .panel-heading {
    color: #fff !important;
    background-color: #6572d0 !important;
    padding: 25px;
    border-bottom: 1px solid transparent;
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
  }

  .panel-footer {
    background-color: white !important;
  }

  .panel-footer h3 {
    font-size: 32px;
  }

  .panel-footer h4 {
    color: #aaa;
    font-size: 14px;
  }

  .panel-footer .btn {
    margin: 15px 0;
    background-color: #6572d0;
    color: #fff;
  }

  /* .navbar {
        margin-bottom: 0;
        background-color: #6572d0;
        z-index: 9999;
        border: 0;
        font-size: 12px !important;
        line-height: 1.42857143 !important;
        letter-spacing: 4px;
        border-radius: 0;
        font-family: Montserrat, sans-serif;
    }

    .navbar li a,
    .navbar .navbar-brand {
        color: #fff !important;
    }

    .navbar-nav li a:hover,
    .navbar-nav li.active a {
        color: #6572d0 !important;
        background-color: #fff !important;
    }

    .navbar-default .navbar-toggle {
        border-color: transparent;
        color: #fff !important;
    } */

  footer a {
    text-decoration: none;
  }
  footer .glyphicon {
    font-size: 20px;
    color: #6572d0;
  }

  /* Useless */
  /* .slideanim {
        visibility: hidden;
    } */

  .slide {
    animation-name: slide;
    -webkit-animation-name: slide;
    animation-duration: 1s;
    -webkit-animation-duration: 1s;
    visibility: visible;
  }

  @keyframes slide {
    0% {
      opacity: 0;
      transform: translateY(70%);
    }
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }

  @-webkit-keyframes slide {
    0% {
      opacity: 0;
      -webkit-transform: translateY(70%);
    }
    100% {
      opacity: 1;
      -webkit-transform: translateY(0%);
    }
  }

  @media screen and (max-width: 768px) {
    .col-sm-4 {
      text-align: center;
      margin: 25px 0;
    }
    .col-sm-5 {
      text-align: center;
      margin: 0 auto;
    }
    .btn-lg {
      width: 100%;
      margin-bottom: 35px;
    }
  }

  @media screen and (max-width: 480px) {
    .logo {
      font-size: 150px;
    }
  }
  .featureIcons {
    color: #6472d3;
    margin: 15px;
  }
`;
