"use client";


export  function SearchBar() {

  return (
    <div className="py-4 w-full">
      <input
        type="text"
        placeholder="Search by name or email..."
        value="Search here"
        onChange={(e) => (e.target.value)}
        className="pl-9"
        aria-label="Search users"
      />
    </div>
  );
}
