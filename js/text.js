export function runTextSlider() {
  const slides = [
    {
      text: "من در ۵۱ سالگی تمام دندان‌های فک بالا رو از دست داده بودم...",
      name: "علیرضا مددی",
    },
    {
      text: "من ۶۵ سالمه و بی‌دندان بودم...",
      name: "احمد اخلاقی",
    },
    {
      text: "من جوان بودم ولی دچار بیماری لثه شدم...",
      name: "مرجان محمدی",
    },
  ];

  const container = document.getElementById("slider-container");

  const slidesWrapper = document.createElement("div");
  slidesWrapper.classList.add("flex", "transition-transform", "duration-500");
  container.appendChild(slidesWrapper);

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
    slidesWrapper.style.transform = `translateX(${
      -currentIndex * slideWidth
    }px)`;
  }

  let autoSlideInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    updateSlide();
  }, 3000);

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
    slidesWrapper.style.transition = "none";
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

    if (movedBy < -slideWidth / 3 && currentIndex < slides.length - 1) {
      currentIndex++;
    } else if (movedBy > slideWidth / 3 && currentIndex > 0) {
      currentIndex--;
    }

    updateSlide();

    autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      updateSlide();
    }, 3000);
  });
}
