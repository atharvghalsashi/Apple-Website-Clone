const menuData = {
  store: {
    title: "Store",
    kicker: "Shop Apple",
    columns: [
      ["Shop", "Shop the Latest", "Mac", "iPad", "iPhone", "Apple Watch", "Accessories"],
      ["Quick Links", "Find a Store", "Order Status", "Ways to Buy", "Apple Trade In"],
      ["Special Stores", "Education", "Business", "Certified Refurbished"]
    ]
  },
  mac: {
    title: "Mac",
    kicker: "Explore Mac",
    columns: [
      ["Explore", "MacBook Air", "MacBook Pro", "iMac", "Mac mini", "Mac Studio"],
      ["Shop Mac", "Shop Mac", "Mac Accessories", "Ways to Buy"],
      ["More from Mac", "Mac Support", "AppleCare+", "macOS"]
    ]
  },
  ipad: {
    title: "iPad",
    kicker: "Explore iPad",
    columns: [
      ["Explore", "iPad Pro", "iPad Air", "iPad", "iPad mini", "Apple Pencil"],
      ["Shop iPad", "Shop iPad", "iPad Accessories", "Ways to Buy"],
      ["More from iPad", "iPad Support", "AppleCare+", "iPadOS"]
    ]
  },
  iphone: {
    title: "iPhone",
    kicker: "Explore iPhone",
    columns: [
      ["Explore", "iPhone 17 Pro", "iPhone 17", "iPhone Air", "iPhone 17e"],
      ["Shop iPhone", "Shop iPhone", "iPhone Accessories", "Apple Trade In"],
      ["More from iPhone", "iPhone Support", "AppleCare+", "iOS"]
    ]
  },
  watch: {
    title: "Watch",
    kicker: "Explore Watch",
    columns: [
      ["Explore", "Apple Watch Series 11", "Apple Watch Ultra", "Apple Watch SE", "Compare Watch"],
      ["Shop Watch", "Shop Apple Watch", "Watch Straps", "Watch Accessories"],
      ["More from Watch", "Apple Watch Support", "AppleCare+", "watchOS"]
    ]
  },
  airpods: {
    title: "AirPods",
    kicker: "Explore AirPods",
    columns: [
      ["Explore", "AirPods Pro", "AirPods", "AirPods Max", "Compare AirPods"],
      ["Shop AirPods", "Shop AirPods", "AirPods Accessories"],
      ["More from AirPods", "AirPods Support", "AppleCare+", "Apple Music"]
    ]
  },
  home: {
    title: "TV & Home",
    kicker: "Explore TV & Home",
    columns: [
      ["Explore", "Apple TV 4K", "HomePod", "Home app"],
      ["Shop", "Shop Apple TV 4K", "Shop HomePod", "TV & Home Accessories"],
      ["More", "Apple TV Support", "HomePod Support", "Apple TV app"]
    ]
  },
  entertainment: {
    title: "Entertainment",
    kicker: "Explore Entertainment",
    columns: [
      ["Explore", "Apple One", "Apple TV+", "Apple Music", "Apple Arcade", "Apple Podcasts"],
      ["Support", "Apple TV+ Support", "Apple Music Support", "Subscriptions"],
      ["Quick Links", "Watch Now", "Listen Now", "Play Now"]
    ]
  },
  accessories: {
    title: "Accessories",
    kicker: "Shop Accessories",
    columns: [
      ["Shop", "Mac Accessories", "iPad Accessories", "iPhone Accessories", "Watch Accessories"],
      ["Featured", "Apple Pencil", "AirTag", "MagSafe", "Cases & Protection"],
      ["Helpful Links", "Find a Store", "Order Status", "Shopping Help"]
    ]
  },
  support: {
    title: "Support",
    kicker: "Get Help",
    columns: [
      ["Support", "iPhone Support", "Mac Support", "iPad Support", "Watch Support"],
      ["Services", "AppleCare+", "Repair", "Contact Support", "Check Coverage"],
      ["Resources", "Apple Account", "Manuals", "Community"]
    ]
  }
};

const menuButtons = document.querySelectorAll(".nav-link");
const megaMenu = document.getElementById("megaMenu");
const menuKicker = document.getElementById("menuKicker");
const menuTitle = document.getElementById("menuTitle");
const menuColumns = document.getElementById("menuColumns");
const menuButton = document.getElementById("menuButton");
const navLinks = document.getElementById("navLinks");
const searchButton = document.getElementById("searchButton");
const bagButton = document.getElementById("bagButton");
const searchPanel = document.getElementById("searchPanel");
const bagPanel = document.getElementById("bagPanel");

function buildMenu(menuName) {
  const data = menuData[menuName];

  menuKicker.textContent = data.kicker;
  menuTitle.textContent = data.title;
  menuColumns.innerHTML = "";

  data.columns.forEach((column) => {
    const columnBox = document.createElement("div");
    columnBox.className = "mega-column";

    const heading = document.createElement("h3");
    heading.textContent = column[0];
    columnBox.appendChild(heading);

    column.slice(1).forEach((item) => {
      const link = document.createElement("a");
      link.href = "https://www.apple.com/in/";
      link.textContent = item;
      columnBox.appendChild(link);
    });

    menuColumns.appendChild(columnBox);
  });
}

function closePanels() {
  megaMenu.classList.remove("open");
  searchPanel.classList.remove("open");
  bagPanel.classList.remove("open");
  menuButtons.forEach((button) => button.classList.remove("active"));
}

function openMegaMenu(menuName, clickedButton) {
  buildMenu(menuName);
  searchPanel.classList.remove("open");
  bagPanel.classList.remove("open");
  megaMenu.classList.add("open");

  menuButtons.forEach((button) => button.classList.remove("active"));
  clickedButton.classList.add("active");
}

menuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const menuName = button.dataset.menu;
    const isAlreadyOpen = button.classList.contains("active") && megaMenu.classList.contains("open");

    if (isAlreadyOpen) {
      closePanels();
    } else {
      openMegaMenu(menuName, button);
    }
  });
});

menuButton.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", isOpen);
});

searchButton.addEventListener("click", () => {
  closePanels();
  searchPanel.classList.add("open");
  document.getElementById("searchInput").focus();
});

bagButton.addEventListener("click", () => {
  closePanels();
  bagPanel.classList.add("open");
});

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => {
    document.getElementById(button.dataset.close).classList.remove("open");
  });
});

document.addEventListener("click", (event) => {
  const clickedInsideHeader = event.target.closest(".topbar");

  if (!clickedInsideHeader) {
    closePanels();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closePanels();
    navLinks.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  }
});