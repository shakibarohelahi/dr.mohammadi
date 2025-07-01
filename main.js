let slideIndex = 0;
showSlides();

function showSlides() {
  let slides = document.getElementsByClassName("mySlides");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  slideIndex++;

  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";

  setTimeout(showSlides, 2000);
}

const slides = [
  {
    text: "من در ۵۱ سالگی تمام دندان‌های فک بالا رو از دست داده بودم. با دکتر محمد محمدی آشنا شدم و روکش مبتنی بر ایمپلنت را انجام دادم...",
    name: "علیرضا مددی",
  },
  {
    text: "من ۶۵ سالمه و بی‌دندان بودم. دکتر محمدی درمان رو با روکش زیرکونیایی انجام دادن. خیلی راضیم.",
    name: "احمد اخلاقی",
  },
  {
    text: "من جوان بودم ولی دچار بیماری لثه شدم. دکتر محمدی روکش کامل زیرکونیا برام انجام دادن و الان خیلی راضیم.",
    name: "مرجان محمدی",
  },
];

const container = document.getElementById("slider-container");

// ساخت slidesWrapper
const slidesWrapper = document.createElement("div");
slidesWrapper.classList.add("flex", "transition-transform", "duration-500");
container.appendChild(slidesWrapper);

// ساخت اسلایدها
slides.forEach((item) => {
  const slide = document.createElement("div");
  slide.className = "w-[600px] p-8";
  slide.innerHTML = `
    <p class="text-[#FFFFFFC4] text-base sm:text-lg leading-relaxed">${item.text}</p>
    <h1 class="text-[#f1c562] text-xl font-bold mt-6">${item.name}</h1>
  `;
  slidesWrapper.appendChild(slide);
});

let currentIndex = 0;
const slideWidth = 600;

function updateSlide() {
  slidesWrapper.style.transition = "transform 0.5s ease";
  slidesWrapper.style.transform = `translateX(${-currentIndex * slideWidth}px)`;
}

// Auto slide
let autoSlideInterval = setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlide();
}, 3000);

// 🖱️ Drag logic with translateX
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

container.addEventListener("mousedown", (e) => {
  clearInterval(autoSlideInterval);
  isDragging = true;
  startX = e.pageX;
  prevTranslate = -currentIndex * slideWidth;
  container.style.cursor = "grabbing";
  slidesWrapper.style.transition = "none"; // حذف انیمیشن هنگام درگ
});

window.addEventListener("mousemove", (e) => {
  if (!isDragging) return;
  const deltaX = e.pageX - startX;
  currentTranslate = prevTranslate + deltaX;
  slidesWrapper.style.transform = `translateX(${currentTranslate}px)`;
});

window.addEventListener("mouseup", () => {
  if (!isDragging) return;
  isDragging = false;
  container.style.cursor = "grab";

  const movedBy = currentTranslate - prevTranslate;

  // اگر بیشتر از نصف اسلاید حرکت کرد، تغییر ایندکس بده
  if (movedBy < -slideWidth / 3 && currentIndex < slides.length - 1) {
    currentIndex++;
  } else if (movedBy > slideWidth / 3 && currentIndex > 0) {
    currentIndex--;
  }

  updateSlide();

  // راه‌اندازی دوباره اسلاید خودکار
  autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide();
  }, 3000);
});
