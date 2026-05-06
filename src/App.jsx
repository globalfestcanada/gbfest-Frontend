// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/home/";
// import AboutUsDetail from "./pages/aboutus/";
// import VolunteerPage from "./pages/volunteer page";


// <Router>
//   <Routes>
//     <Route path="/" element={<Home />} />
//     <Route path="/about" element={<AboutUsDetail />} />
//     <Route path="/volunteer" element={<VolunteerPage />} />
//   </Routes>
// </Router>
// function App() {
//   return <Home />;
// }

// export default App;




// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/home/";
// import AboutUsDetail from "./pages/aboutus/";
// import VolunteerPage from "./pages/volunteer page";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/about" element={<AboutUsDetail />} />
//       <Route path="/volunteer" element={<VolunteerPage />} />
//     </Routes>
//   );
// }

// export default App;



import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/layout";
import Home from "./pages/home/";
import AboutUsDetail from "./pages/aboutus/";
import VolunteerPage from "./pages/volunteer page";
import GetInvolved from "./pages/Get Invovled";
import ContactUs from "./components/Contact Us";
import SponsorForm from "./pages/Sponsorship page";
import ArtistForm from "./pages/artist page";
import VendorForm from "./pages/vendor";
import PageantApplicationForm from "./pages/MrnMs";
import PhotographyContestForm from "./pages/photocontest";

function App() {
  return (
    <Routes>
      {/* Wrap all routes inside Layout */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutUsDetail />} />
        <Route path="volunteer" element={<VolunteerPage />} />
        <Route path="getinvolved" element={<GetInvolved />} />
        <Route path="contactUs" element={<ContactUs />} />
        <Route path="partner" element={<SponsorForm />} />
        <Route path="artist" element={<ArtistForm />} />
        <Route path="vendor" element={<VendorForm />} />
        <Route path="PageantApplicationForm" element={<PageantApplicationForm/>} />
        <Route path="PhotographyContest" element={<PhotographyContestForm/>} />
        {/* add more pages here */}
      </Route>
    </Routes>
  );
}

export default App;
