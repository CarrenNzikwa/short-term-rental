const checkinInput = document.getElementById("checkin");
const checkoutInput = document.getElementById("checkout");
const nightCount = document.getElementById("night-count");
const totalPrice = document.getElementById("total");

function calculateNights() {
  const checkin = new Date(checkinInput.value);
  const checkout = new Date(checkoutInput.value);
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  if (checkin && checkout && checkout > checkin) {
    const nights = Math.round((checkout - checkin) / millisecondsPerDay);
    const pricePerNight = 8000;
    const total = nights * pricePerNight;

    nightCount.textContent = `${nights} night${nights > 1 ? "s" : ""}`;
    totalPrice.textContent = `Total: Ksh ${total.toLocaleString()}`;
  } else {
    nightCount.textContent = "0 nights";
    totalPrice.textContent = "Total: Ksh 0";
  }
}

checkinInput.addEventListener("change", calculateNights);
checkoutInput.addEventListener("change", calculateNights);

// calendar.js
const calendarGrid = document.getElementById("calendarGrid");
const monthYearDisplay = document.getElementById("monthYearDisplay");

let currentDate = new Date();
let selectedDates = new Set();

// Simulate booked dates
const bookedDates = {
  "2025-07-15": true,
  "2025-07-16": true,
  "2025-08-02": true,
};

function renderCalendar(date) {
  calendarGrid.innerHTML = "";
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  monthYearDisplay.textContent = `${monthNames[month]} ${year}`;

  weekDays.forEach((day) => {
    const el = document.createElement("div");
    el.classList.add("day-header");
    el.textContent = day;
    calendarGrid.appendChild(el);
  });

  for (let i = 0; i < firstDay; i++) {
    calendarGrid.appendChild(document.createElement("div"));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const el = document.createElement("div");
    el.textContent = day;

    if (bookedDates[dateKey]) {
      el.classList.add("booked");
    } else {
      el.classList.add("available");

      if (selectedDates.has(dateKey)) {
        el.classList.add("selected");
      }

      el.addEventListener("click", () => {
        if (selectedDates.has(dateKey)) {
          selectedDates.delete(dateKey);
          el.classList.remove("selected");
        } else {
          selectedDates.add(dateKey);
          el.classList.add("selected");
        }
      });
    }

    calendarGrid.appendChild(el);
  }
}

document.getElementById("prevMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

// Hook this to your form's submit button
function checkBookingAvailability() {
  for (let date of selectedDates) {
    if (bookedDates[date]) {
      alert(`Date ${date} is already booked!`);
      return false;
    }
  }
  alert("Dates are available!");
  return true;
}

renderCalendar(currentDate);

//gallery section

// Array of gallery media
const galleryItems = [
  { type: "image", src: "images/sky beach.jpg" },
  { type: "video", src: "videos/villa-tour.mp4" },
  { type: "image", src: "images/villa2.jpg" },
];

let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  document.getElementById("lightbox").style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightbox").style.display = "none";
}

function changeSlide(offset) {
  currentIndex =
    (currentIndex + offset + galleryItems.length) % galleryItems.length;
  updateLightbox();
}

function updateLightbox() {
  const container = document.getElementById("lightbox-content");
  const item = galleryItems[currentIndex];

  container.innerHTML =
    item.type === "image"
      ? `<img src="${item.src}" alt="Gallery Image">`
      : `<video src="${item.src}" controls autoplay muted></video>`;
}

//detaailed information
// Tab switching logic
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanes = document.querySelectorAll(".tab-pane");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabPanes.forEach((pane) => pane.classList.remove("active"));

    // Add active to clicked button and corresponding content
    button.classList.add("active");
    document.getElementById(button.dataset.tab).classList.add("active");
  });
});
