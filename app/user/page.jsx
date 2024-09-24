"use client";
import { useEffect, useState, memo } from "react";
import { FixedSizeList as List } from "react-window";
import "./User.css"; // Import the CSS file for additional styles

const Row = memo(({ index, style, users, isVisible }) => (
  <div
    style={{ ...style, display: "flex", alignItems: "center", padding: "10px" }}
    className={`user-item ${isVisible ? 'show' : ''} flex items-center p-4 border-b border-gray-200 transition-all duration-300`}
  >
    <img
      src={users[index].picture.thumbnail}
      alt={`${users[index].name.first} ${users[index].name.last}`}
      className="rounded-full mr-4 h-10 w-10"
    />
    <span className="text-lg font-semibold">
      {users[index].name.first} {users[index].name.last}
    </span>
  </div>
));

export default function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("https://randomuser.me/api/?results=500");
        const data = await response.json();
        setUsers(data.results);

        // Set visible items after a delay to allow transition
        const delay = 100; // delay in ms
        data.results.forEach((_, index) => {
          setTimeout(() => {
            setVisibleItems((prev) => [...prev, index]);
          }, index * delay);
        });
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Users List</h1>
      {loading ? (
        <div className="flex flex-col items-center justify-center mt-20">
          <div className="spinner mb-2"></div>
          <p className="text-lg">Loading users...</p>
        </div>
      ) : (
        <List
          height={800}
          itemCount={users.length}
          itemSize={60} // Adjusted for better spacing
          width={400} // Adjusted width for better layout
        >
          {({ index, style }) => (
            <Row index={index} style={style} users={users} isVisible={visibleItems.includes(index)} />
          )}
        </List>
      )}
    </div>
  );
}
