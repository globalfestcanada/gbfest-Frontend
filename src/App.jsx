
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
import PageantListPage from "./pages/pegeantList";
import VotePage from "./pages/votepage";
import ArtistCheckin from "./pages/ArtistCheckIn";
import ArtistScanner from "./pages/ArtistScanner";
import ArtistCheckinConfirm from "./pages/ArtistCheckinConfirm";
import AdminDashboard from "./pages/AdminDashboard";
import VolunteerCheckin from "./pages/VolunteerCheckin";
import VolunteerScanner from "./pages/VolunteerScanner";
import VolunteerConfirm from "./pages/VolunteerConfirm";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";
import ArtistGallery from "./pages/artistGallery";
import ArtistProfile from "./pages/ArtistProfile";
import PageantClosedPage from "./pages/PageantClosedPage";
import PageantRegistration from "./pages/PageantRegistration";
import PageantScanner from "./pages/PageantScanner";
import PageantConfirm from "./pages/PageantConfirm";
import UnifiedScanner from "./pages/UnifiedScanner";
import PartnerLogosPage from "./pages/PartnerLogosPage";


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
        <Route path="Pageant Contestants" element={<PageantListPage/>} />
        <Route path="Performers" element={<ArtistGallery/>} />
        <Route path="artist/:slug" element={<ArtistProfile />} />
        <Route path="vote" element={<VotePage/>} />
        <Route path="artist-checkin" element={<ArtistCheckin />} />
        <Route path="artist-scan" element={<ArtistScanner />} />
        <Route path="artist-checkin-confirm" element={<ArtistCheckinConfirm />} />
        <Route path="admin" element={<AdminDashboard />} />
        <Route path="volunteer-checkin" element={<VolunteerCheckin />} />
        <Route path="volunteer-scanner" element={<VolunteerScanner />} />
        <Route path="volunteer-confirm" element={<VolunteerConfirm />} />
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>}/>
        <Route path="pageant-registration-closed" element={<PageantClosedPage />} />
        <Route path="pageant-register" element={<PageantRegistration />} />
        <Route path="pageant-scanner" element={<PageantScanner />} />
        <Route path="pageant-confirm" element={<PageantConfirm />} />
        <Route path="qr-scanner" element={<UnifiedScanner />} />
        <Route path="partners/:categoryId" element={<PartnerLogosPage />} />




        {/* add more pages here */}
      </Route>
    </Routes>
  );
}

export default App;
