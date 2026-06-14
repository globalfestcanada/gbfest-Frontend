
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./index.css";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState("artists");
//   const [artists, setArtists] = useState([]);
//   const [volunteers, setVolunteers] = useState([]);

//   const API_BASE = "https://globalfest-backend.onrender.com"; // change to your Render URL in prod

//   // Check token on load
//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");

//     if (!token) {
//       navigate("/admin/login");
//       return;
//     }

//     // Verify token by calling protected endpoint
//     fetch(`${API_BASE}/api/admin/dashboard`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (!data.success) {
//           localStorage.removeItem("adminToken");
//           localStorage.removeItem("adminRole");
//           navigate("/admin/login");
//         }
//       });
//   }, [navigate]);

//   // Load Artists (PROTECTED)
//   const loadArtists = async () => {
//     const token = localStorage.getItem("adminToken");

//     const res = await fetch(`${API_BASE}/api/admin/artists`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();
//     if (data.success) setArtists(data.artists);
//   };

//   // Load Volunteers (PROTECTED)
//   const loadVolunteers = async () => {
//     const token = localStorage.getItem("adminToken");

//     const res = await fetch(`${API_BASE}/api/admin/volunteers`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     const data = await res.json();
//     if (data.success) setVolunteers(data.volunteers);
//   };

//   useEffect(() => {
//     loadArtists();
//     loadVolunteers();

//     const interval = setInterval(() => {
//       loadArtists();
//       loadVolunteers();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   // Logout
//   const handleLogout = () => {
//     localStorage.removeItem("adminToken");
//     localStorage.removeItem("adminRole");
//     navigate("/admin/login");
//   };

//   return (
//     <div className="admin-dashboard">
//       <div className="admin-header">
//         <h1>Admin Dashboard</h1>
//         <button className="logout-btn" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>

//       {/* TABS */}
//       <div className="admin-tabs">
//         <button
//           className={activeTab === "artists" ? "active" : ""}
//           onClick={() => setActiveTab("artists")}
//         >
//           Artists
//         </button>

//         <button
//           className={activeTab === "volunteers" ? "active" : ""}
//           onClick={() => setActiveTab("volunteers")}
//         >
//           Volunteers
//         </button>
//       </div>

//       {/* ARTIST TABLE */}
//       {activeTab === "artists" && (
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Team</th>
//               <th>Team Size</th>
//               <th>Checked In</th>
//               <th>Arrived</th>
//               <th>Volunteer</th>
//               <th>Time</th>
//             </tr>
//           </thead>

//           <tbody>
//             {artists.map((a) => (
//               <tr key={a._id}>
//                 <td>{a.fullName}</td>
//                 <td>{a.teamName}</td>
//                 <td>{a.teamSize}</td>

//                 <td className={a.checkedIn ? "status-yes" : "status-no"}>
//                   {a.checkedIn ? "Yes" : "No"}
//                 </td>

//                 <td>{a.checkedInCount || 0}</td>
//                 <td>{a.checkedInBy || "-"}</td>

//                 <td>
//                   {a.checkedInAt
//                     ? new Date(a.checkedInAt).toLocaleString()
//                     : "-"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* VOLUNTEER TABLE */}
//       {activeTab === "volunteers" && (
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Role</th>
//               <th>Phone</th>
//               <th>Email</th>
//               <th>Checked In</th>
//               <th>Checked In By</th>
//               <th>Time</th>
//             </tr>
//           </thead>

//           <tbody>
//             {volunteers.map((v) => (
//               <tr key={v._id}>
//                 <td>{v.fullName}</td>
//                 <td>{v.role}</td>
//                 <td>{v.phone}</td>
//                 <td>{v.email}</td>

//                 <td className={v.checkedIn ? "status-yes" : "status-no"}>
//                   {v.checkedIn ? "Yes" : "No"}
//                 </td>

//                 <td>{v.checkedInBy || "-"}</td>

//                 <td>
//                   {v.checkedInAt
//                     ? new Date(v.checkedInAt).toLocaleString()
//                     : "-"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AdminDashboard;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("artists");
  const [artists, setArtists] = useState([]);
  const [volunteers, setVolunteers] = useState([]);

  const API_BASE = "https://globalfest-backend.onrender.com";

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    fetch(`${API_BASE}/api/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.success) {
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminRole");
          navigate("/admin/login");
        }
      });
  }, [navigate]);

  const loadArtists = async () => {
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`${API_BASE}/api/admin/artists`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) setArtists(data.artists);
  };

  const loadVolunteers = async () => {
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`${API_BASE}/api/admin/volunteers`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) setVolunteers(data.volunteers);
  };

  useEffect(() => {
    loadArtists();
    loadVolunteers();
    const interval = setInterval(() => {
      loadArtists();
      loadVolunteers();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    navigate("/admin/login");
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === "artists" ? "active" : ""}
          onClick={() => setActiveTab("artists")}
        >
          Artists
        </button>

        <button
          className={activeTab === "volunteers" ? "active" : ""}
          onClick={() => setActiveTab("volunteers")}
        >
          Volunteers
        </button>
      </div>

      {/* ARTISTS TABLE / MOBILE CARDS */}
      {activeTab === "artists" && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Team</th>
              <th>Team Size</th>
              <th>Checked In</th>
              <th>Arrived</th>
              <th>Volunteer</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {artists.map((a) => (
              <tr key={a._id}>
                <td data-label="Name">{a.fullName}</td>
                <td data-label="Team">{a.teamName}</td>
                <td data-label="Team Size">{a.teamSize}</td>

                <td
                  data-label="Checked In"
                  className={a.checkedIn ? "status-yes" : "status-no"}
                >
                  {a.checkedIn ? "Yes" : "No"}
                </td>

                <td data-label="Arrived">{a.checkedInCount || 0}</td>
                <td data-label="Volunteer">{a.checkedInBy || "-"}</td>

                <td data-label="Time">
                  {a.checkedInAt
                    ? new Date(a.checkedInAt).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* VOLUNTEERS TABLE / MOBILE CARDS */}
      {activeTab === "volunteers" && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Checked In</th>
              <th>Checked In By</th>
              <th>Time</th>
            </tr>
          </thead>

          <tbody>
            {volunteers.map((v) => (
              <tr key={v._id}>
                <td data-label="Name">{v.fullName}</td>
                <td data-label="Role">{v.role}</td>
                <td data-label="Phone">{v.phone}</td>
                <td data-label="Email">{v.email}</td>

                <td
                  data-label="Checked In"
                  className={v.checkedIn ? "status-yes" : "status-no"}
                >
                  {v.checkedIn ? "Yes" : "No"}
                </td>

                <td data-label="Checked In By">{v.checkedInBy || "-"}</td>

                <td data-label="Time">
                  {v.checkedInAt
                    ? new Date(v.checkedInAt).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
