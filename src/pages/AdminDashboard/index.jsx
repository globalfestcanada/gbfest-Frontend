// // import React, { useEffect, useState } from "react";
// // import "./index.css";

// // const AdminDashboard = () => {
// //   const [artists, setArtists] = useState([]);

// //   const loadArtists = async () => {
// //     const res = await fetch("http://localhost:4000/api/artist/all");
// //     const data = await res.json();
// //     if (data.success) setArtists(data.artists);
// //   };

// //   useEffect(() => {
// //     loadArtists();
// //     const interval = setInterval(loadArtists, 5000); // auto refresh
// //     return () => clearInterval(interval);
// //   }, []);

// //   return (
// //     <div className="admin-dashboard">
// //       <h1>Artist Check‑In Dashboard</h1>

// //       <table>
// //         <thead>
// //           <tr>
// //             <th>Name</th>
// //             <th>Team</th>
// //             <th>Team Size</th>
// //             <th>Checked In</th>
// //             <th>Arrived</th>
// //             <th>Volunteer</th>
// //             <th>Time</th>
// //           </tr>
// //         </thead>

// //         <tbody>
// //           {artists.map((a) => (
// //             <tr key={a._id}>
// //               <td>{a.fullName}</td>
// //               <td>{a.teamName}</td>
// //               <td>{a.teamSize}</td>
// //               <td style={{ color: a.checkedIn ? "green" : "red" }}>
// //                 {a.checkedIn ? "Yes" : "No"}
// //               </td>
// //               <td>{a.checkedInCount || 0}</td>
// //               <td>{a.checkedInBy || "-"}</td>
// //               <td>
// //                 {a.checkedInAt
// //                   ? new Date(a.checkedInAt).toLocaleString()
// //                   : "-"}
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default AdminDashboard;


// import React, { useEffect, useState } from "react";
// import "./index.css";

// const AdminDashboard = () => {
//   const [activeTab, setActiveTab] = useState("artists");

//   const [artists, setArtists] = useState([]);
//   const [volunteers, setVolunteers] = useState([]);

//   // Load Artists
//   const loadArtists = async () => {
//     const res = await fetch("http://localhost:4000/api/artist/all");
//     const data = await res.json();
//     if (data.success) setArtists(data.artists);
//   };

//   // Load Volunteers
//   const loadVolunteers = async () => {
//     const res = await fetch("http://localhost:4000/api/volunteer/all");
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

//   return (
//     <div className="admin-dashboard">
//       <h1>Admin Dashboard</h1>

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

  // Check token on load
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      navigate("/admin/login");
      return;
    }

    // Verify token by calling protected endpoint
    fetch("http://localhost:4000/api/admin/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

  // Load Artists
  const loadArtists = async () => {
    const res = await fetch("http://localhost:4000/api/artist/all");
    const data = await res.json();
    if (data.success) setArtists(data.artists);
  };

  // Load Volunteers
  const loadVolunteers = async () => {
    const res = await fetch("http://localhost:4000/api/volunteer/all");
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

  // Logout
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

      {/* TABS */}
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

      {/* ARTIST TABLE */}
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
                <td>{a.fullName}</td>
                <td>{a.teamName}</td>
                <td>{a.teamSize}</td>

                <td className={a.checkedIn ? "status-yes" : "status-no"}>
                  {a.checkedIn ? "Yes" : "No"}
                </td>

                <td>{a.checkedInCount || 0}</td>
                <td>{a.checkedInBy || "-"}</td>

                <td>
                  {a.checkedInAt
                    ? new Date(a.checkedInAt).toLocaleString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* VOLUNTEER TABLE */}
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
                <td>{v.fullName}</td>
                <td>{v.role}</td>
                <td>{v.phone}</td>
                <td>{v.email}</td>

                <td className={v.checkedIn ? "status-yes" : "status-no"}>
                  {v.checkedIn ? "Yes" : "No"}
                </td>

                <td>{v.checkedInBy || "-"}</td>

                <td>
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
