// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./index.css";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState("artists");
//   const [artists, setArtists] = useState([]);
//   const [volunteers, setVolunteers] = useState([]);

//   const API_BASE = "https://globalfest-backend.onrender.com";

//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");

//     if (!token) {
//       navigate("/admin/login");
//       return;
//     }

//     fetch(`${API_BASE}/api/admin/dashboard`, {
//       headers: { Authorization: `Bearer ${token}` },
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

//   const loadArtists = async () => {
//     const token = localStorage.getItem("adminToken");
//     const res = await fetch(`${API_BASE}/api/admin/artists`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     if (data.success) setArtists(data.artists);
//   };

//   const loadVolunteers = async () => {
//     const token = localStorage.getItem("adminToken");
//     const res = await fetch(`${API_BASE}/api/admin/volunteers`, {
//       headers: { Authorization: `Bearer ${token}` },
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

//       {/* ARTISTS TABLE / MOBILE CARDS */}
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
//                 <td data-label="Name">{a.fullName}</td>
//                 <td data-label="Team">{a.teamName}</td>
//                 <td data-label="Team Size">{a.teamSize}</td>

//                 <td
//                   data-label="Checked In"
//                   className={a.checkedIn ? "status-yes" : "status-no"}
//                 >
//                   {a.checkedIn ? "Yes" : "No"}
//                 </td>

//                 <td data-label="Arrived">{a.checkedInCount || 0}</td>
//                 <td data-label="Volunteer">{a.checkedInBy || "-"}</td>

//                 <td data-label="Time">
//                   {a.checkedInAt
//                     ? new Date(a.checkedInAt).toLocaleString()
//                     : "-"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* VOLUNTEERS TABLE / MOBILE CARDS */}
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
//                 <td data-label="Name">{v.fullName}</td>
//                 <td data-label="Role">{v.role}</td>
//                 <td data-label="Phone">{v.phone}</td>
//                 <td data-label="Email">{v.email}</td>

//                 <td
//                   data-label="Checked In"
//                   className={v.checkedIn ? "status-yes" : "status-no"}
//                 >
//                   {v.checkedIn ? "Yes" : "No"}
//                 </td>

//                 <td data-label="Checked In By">{v.checkedInBy || "-"}</td>

//                 <td data-label="Time">
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



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./index.css";

// const AdminDashboard = () => {
//   const navigate = useNavigate();

//   const [activeTab, setActiveTab] = useState("artists");
//   const [artists, setArtists] = useState([]);
//   const [volunteers, setVolunteers] = useState([]);
//   const [pageants, setPageants] = useState([]); 

//   const API_BASE = "https://globalfest-backend.onrender.com";

//   useEffect(() => {
//     const token = localStorage.getItem("adminToken");

//     if (!token) {
//       navigate("/admin/login");
//       return;
//     }

//     fetch(`${API_BASE}/api/admin/dashboard`, {
//       headers: { Authorization: `Bearer ${token}` },
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

//   const loadArtists = async () => {
//     const token = localStorage.getItem("adminToken");
//     const res = await fetch(`${API_BASE}/api/admin/artists`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     if (data.success) setArtists(data.artists);
//   };

//   const loadVolunteers = async () => {
//     const token = localStorage.getItem("adminToken");
//     const res = await fetch(`${API_BASE}/api/admin/volunteers`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
//     if (data.success) setVolunteers(data.volunteers);
//   };

//   const loadPageants = async () => {
//     const token = localStorage.getItem("adminToken");
//     const res = await fetch(`${API_BASE}/api/admin/pageant`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await res.json();
    
  
//     if (data.success) {
//       setPageants(data.contestants || []);
//     }
//   };

//   useEffect(() => {
//     loadArtists();
//     loadVolunteers();
//     loadPageants();

//     const interval = setInterval(() => {
//       loadArtists();
//       loadVolunteers();
//       loadPageants();
//     }, 5000); 

//     return () => clearInterval(interval);
//   }, []);

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

//         <button
//           className={activeTab === "pageants" ? "active" : ""}
//           onClick={() => setActiveTab("pageants")}
//         >
//           Pageants
//         </button>
//       </div>

      
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
//                 <td data-label="Name">{a.fullName}</td>
//                 <td data-label="Team">{a.teamName}</td>
//                 <td data-label="Team Size">{a.teamSize}</td>
//                 <td
//                   data-label="Checked In"
//                   className={a.checkedIn ? "status-yes" : "status-no"}
//                 >
//                   {a.checkedIn ? "Yes" : "No"}
//                 </td>
//                 <td data-label="Arrived">{a.checkedInCount || 0}</td>
//                 <td data-label="Volunteer">{a.checkedInBy || "-"}</td>
//                 <td data-label="Time">
//                   {a.checkedInAt ? new Date(a.checkedInAt).toLocaleString() : "-"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

      
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
//                 <td data-label="Name">{v.fullName}</td>
//                 <td data-label="Role">{v.role}</td>
//                 <td data-label="Phone">{v.phone}</td>
//                 <td data-label="Email">{v.email}</td>
//                 <td
//                   data-label="Checked In"
//                   className={v.checkedIn ? "status-yes" : "status-no"}
//                 >
//                   {v.checkedIn ? "Yes" : "No"}
//                 </td>
//                 <td data-label="Checked In By">{v.checkedInBy || "-"}</td>
//                 <td data-label="Time">
//                   {v.checkedInAt ? new Date(v.checkedInAt).toLocaleString() : "-"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

      
//       {activeTab === "pageants" && (
//         <table>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Culture</th>
//               <th>Bracket</th>
//               <th>Group Size</th>
//               <th>Checked In By</th>
//               <th>Time</th>
//               <th>Gate Notes</th>
//             </tr>
//           </thead>
//           <tbody>
//             {pageants.length === 0 ? (
//               <tr>
//                 <td colSpan="7" style={{ textAlign: "center", fontStyle: "italic", color: "#64748b" }}>
//                   No contestants have checked in yet.
//                 </td>
//               </tr>
//             ) : (
//               pageants.map((p) => (
//                 <tr key={p._id}>
//                   <td data-label="Name" style={{ fontWeight: "600" }}>{p.fullName}</td>
//                   <td data-label="Culture">{p.culture}</td>
//                   <td data-label="Bracket" style={{ textTransform: "capitalize" }}>{p.gender || "-"}</td>
//                   <td data-label="Group Size" style={{ fontWeight: "600" }}>{p.numberOfPeople || 1}</td>
//                   <td data-label="Checked In By">{p.checkedInBy || "-"}</td>
//                   <td data-label="Time">
//                     {p.checkedInAt ? new Date(p.checkedInAt).toLocaleString() : "-"}
//                   </td>
//                   <td data-label="Gate Notes" style={{ color: "#64748b", fontSize: "0.9em" }}>
//                     {p.notes || "—"}
//                   </td>
//                 </tr>
//               ))
//             )}
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
  const [pageants, setPageants] = useState([]); 
  const [voteStandings, setVoteStandings] = useState([]); 
  
  // 🔐 Track the logged-in admin's role
  const [adminRole, setAdminRole] = useState("");

  const API_BASE = "https://globalfest-backend.onrender.com";

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const role = localStorage.getItem("adminRole"); // Pull role from storage

    if (!token) {
      navigate("/admin/login");
      return;
    }

    if (role) {
      setAdminRole(role.toLowerCase().trim());
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

  const loadPageants = async () => {
    const token = localStorage.getItem("adminToken");
    const res = await fetch(`${API_BASE}/api/admin/pageant`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.success) {
      setPageants(data.contestants || []);
    }
  };

  const loadVotes = async () => {
    // 🛠️ FIXED: Matches your exact server.js middleware taxonomy ("full" instead of "full access")
    if (adminRole !== "full" && adminRole !== "pageant") return;

    const token = localStorage.getItem("adminToken");

    try {
      // 🛠️ FIXED: Attached authorization header wrapper node to comply with your backend verification checks
      const res = await fetch(`${API_BASE}/api/vote/results`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setVoteStandings(data.standings || []);
      }
    } catch (err) {
      console.error("Error pulling live vote sets:", err);
    }
  };

  useEffect(() => {
    loadArtists();
    loadVolunteers();
    loadPageants();
    
    // 🛠️ FIXED: Alignment adjustment checks
    if (adminRole === "full" || adminRole === "pageant") {
      loadVotes();
    }

    const interval = setInterval(() => {
      loadArtists();
      loadVolunteers();
      loadPageants();
      
      // 🛠️ FIXED: Alignment adjustment checks
      if (adminRole === "full" || adminRole === "pageant") {
        loadVotes();
      }
    }, 5000); 

    return () => clearInterval(interval);
  }, [adminRole]); // Re-run when adminRole state is set from localStorage

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminRole");
    navigate("/admin/login");
  };

  const absoluteTotalVotes = voteStandings.reduce((sum, item) => sum + item.totalVotes, 0);

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

        <button
          className={activeTab === "pageants" ? "active" : ""}
          onClick={() => setActiveTab("pageants")}
        >
          Pageants
        </button>

        {/* 🔐 FIXED: Updated permission checking wrapper */}
        {(adminRole === "full" || adminRole === "pageant") && (
          <button
            className={activeTab === "votes" ? "active" : ""}
            onClick={() => setActiveTab("votes")}
          >
            Live Votes
          </button>
        )}
      </div>

      {/* ARTISTS TABLE */}
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
                  {a.checkedInAt ? new Date(a.checkedInAt).toLocaleString() : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* VOLUNTEERS TABLE */}
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
                  {v.checkedInAt ? new Date(v.checkedInAt).toLocaleString() : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* PAGEANTS TABLE */}
      {activeTab === "pageants" && (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Culture</th>
              <th>Bracket</th>
              <th>Group Size</th>
              <th>Checked In By</th>
              <th>Time</th>
              <th>Gate Notes</th>
            </tr>
          </thead>
          <tbody>
            {pageants.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: "center", fontStyle: "italic", color: "#64748b" }}>
                  No contestants have checked in yet.
                </td>
              </tr>
            ) : (
              pageants.map((p) => (
                <tr key={p._id}>
                  <td data-label="Name" style={{ fontWeight: "600" }}>{p.fullName}</td>
                  <td data-label="Culture">{p.culture}</td>
                  <td data-label="Bracket" style={{ textTransform: "capitalize" }}>{p.gender || "-"}</td>
                  <td data-label="Group Size" style={{ fontWeight: "600" }}>{p.numberOfPeople || 1}</td>
                  <td data-label="Checked In By">{p.checkedInBy || "-"}</td>
                  <td data-label="Time">
                    {p.checkedInAt ? new Date(p.checkedInAt).toLocaleString() : "-"}
                  </td>
                  <td data-label="Gate Notes" style={{ color: "#64748b", fontSize: "0.9em" }}>
                    {p.notes || "—"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* 🗳️ SECURED LIVE VOTES RENDER PANEL */}
      {activeTab === "votes" && (adminRole === "full" || adminRole === "pageant") && (
        <div>
          <div style={{ marginBottom: "20px", padding: "12px", background: "#f1f5f9", borderRadius: "8px", fontWeight: "700" }}>
            📈 Total Verified Votes Processed: {absoluteTotalVotes}
          </div>
          <table>
            <thead>
              <tr>
                <th>Placement Rank</th>
                <th>Contestant / Target Item Identifier</th>
                <th>Total Confirmed Votes Received</th>
              </tr>
            </thead>
            <tbody>
              {voteStandings.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: "center", fontStyle: "italic", color: "#64748b" }}>
                    Waiting for incoming voting submissions...
                  </td>
                </tr>
              ) : (
                voteStandings.map((voteGroup, index) => (
                  <tr key={voteGroup._id}>
                    <td data-label="Placement Rank" style={{ fontWeight: "700", color: index === 0 ? "#eab308" : "#334155" }}>
                      {index === 0 ? "🥇 Leader" : `#${index + 1}`}
                    </td>
                    <td data-label="Contestant" style={{ fontWeight: "600" }}>{voteGroup._id}</td>
                    <td data-label="Total Confirmed Votes" style={{ fontWeight: "800", color: "#0f766e" }}>
                      {voteGroup.totalVotes} votes
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;