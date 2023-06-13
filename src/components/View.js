import React, { useState } from "react";
import Fuse from "fuse.js";

const users = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    address: "123 Main St, Anytown, USA",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "janesmith@example.com",
    address: "456 Elm St, Somewhere, USA",
  },
  {
    firstName: "Shubham",
    lastName: "Tapadiya",
    email: "janesmith@example.com",
    address: "456 Elm St, Somewhere, USA",
  },
  {
    firstName: "Kaitlyn",
    lastName: "Kong",
    email: "janesmith@example.com",
    address: "456 Elm St, Somewhere, USA",
  },
  {
    firstName: "Suresh",
    lastName: "Bhai",
    email: "janesmith@example.com",
    address: "456 Elm St, Somewhere, USA",
  },
  {
    firstName: "Ramesh",
    lastName: "Sharma",
    email: "janesmith@example.com",
    address: "456 Elm St, Somewhere, USA",
  },
  {
    firstName: "Anagha",
    lastName: "Pabitwar",
    email: "janesmith@example.com",
    address: "456 Elm St, Somewhere, USA",
  },
  {
    firstName: "Sadhana",
    lastName: "Desai",
    email: "janesmith@example.com",
    address: "456 Elm St, Somewhere, USA",
  },
  // Add more user objects as needed
];

const View = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const fuseOptions = {
    keys: ["firstName", "lastName"],
    threshold: 0.4, // Adjust the threshold as needed for matching similarity
  };

  const fuse = new Fuse(users, fuseOptions);

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  // Filter the users based on the search query
  const filteredUsers = searchQuery
    ? fuse.search(searchQuery).map((result) => result.item)
    : users;

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />

      {/* <button onClick={handleSearch}>Search</button> */}

      {filteredUsers.map((user) => (
        <div key={user.email}>
          <p>
            {user.firstName} {user.lastName}
          </p>
        </div>
      ))}
    </div>
  );
};

export default View;
