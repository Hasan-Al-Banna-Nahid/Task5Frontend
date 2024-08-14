"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const DataTable = ({ region, errors, seed }) => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPage(1);
    setUsers([]);
    fetchUsers(1);
  }, [region, errors, seed]);

  const fetchUsers = async (pageNumber) => {
    setLoading(true);
    try {
      const response = await axios.get("/api/users/generate", {
        params: { region, errors, seed, page: pageNumber },
      });
      setUsers((prevUsers) => [...prevUsers, ...response.data]);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight;
    if (bottom) {
      setPage((prevPage) => {
        fetchUsers(prevPage + 1);
        return prevPage + 1;
      });
    }
  };

  return (
    <div onScroll={handleScroll} style={{ overflowY: "auto", height: "500px" }}>
      <table>
        <thead>
          <tr>
            <th>Index</th>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.index}</td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.address}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default DataTable;
