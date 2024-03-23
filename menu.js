// Load the JSON data immediately and store it
let menuData = {};

fetch("/db.json")
  .then((response) => response.json())
  .then((data) => {
    menuData = data;
    displayMenuItems(menuData); // Display all items initially
  });

function displayMenuItems(data) {
  const menuList = document.getElementById("menu-list");
  menuList.innerHTML = ""; // Clear the list before displaying new items

  Object.keys(data).forEach((category) => {
    // Only display the category if there are items in it
    if (data[category].length > 0) {
      const section = document.createElement("section");
      const h2 = document.createElement("h2");
      h2.textContent = category;
      section.appendChild(h2);

      data[category].forEach((item) => {
        const p = document.createElement("p");
        // Format price to two decimal places
        const formattedPrice = parseFloat(item.price).toFixed(2);
        p.textContent = `${item.name} - $${formattedPrice}`;
        section.appendChild(p);
      });

      menuList.appendChild(section);
    }
  });
}

function liveSearch() {
  const searchText = document.getElementById("search-box").value.toLowerCase();

  const filteredData = {};
  Object.keys(menuData).forEach((category) => {
    filteredData[category] = menuData[category].filter((item) =>
      item.name.toLowerCase().includes(searchText)
    );
  });
  displayMenuItems(filteredData);
}

// Call liveSearch initially to display all items
liveSearch();
