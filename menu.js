// Assuming db.json is accessible at the path "/db.json"
fetch('/db.json')
    .then(response => response.json())
    .then(data => {
        displayMenuItems(data);
    });

function displayMenuItems(data) {
    const menuList = document.getElementById('menu-list');
    menuList.innerHTML = ''; // Clear the list

    Object.keys(data).forEach(category => {
        // Create a section for each category
        const section = document.createElement('section');
        const h2 = document.createElement('h2');
        h2.textContent = category;
        section.appendChild(h2);

        // List each menu item in this category
        data[category].forEach(item => {
            const p = document.createElement('p');
            p.textContent = `${item.name} - $${item.price}`;
            section.appendChild(p);
        });

        menuList.appendChild(section);
    });
}

function searchMenu() {
    const searchText = document.getElementById('search-box').value.toLowerCase();
    fetch('/db.json')
        .then(response => response.json())
        .then(data => {
            const filteredData = {};
            Object.keys(data).forEach(category => {
                filteredData[category] = data[category].filter(item => 
                    item.name.toLowerCase().includes(searchText)
                );
            });
            displayMenuItems(filteredData);
        });
}
