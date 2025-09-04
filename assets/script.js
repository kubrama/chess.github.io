document.addEventListener("DOMContentLoaded", () => {
  const stagesSection = document.querySelector(".stages-mobile");
  if (!stagesSection) return;

  const track = stagesSection.querySelector(".carousel-track");
  const cards = stagesSection.querySelectorAll(".stage-card");
  const prevBtn = stagesSection.querySelector(".carousel-btn.prev");
  const nextBtn = stagesSection.querySelector(".carousel-btn.next");
  const dotsContainer = stagesSection.querySelector(".carousel-dots");

  let index = 0;
  const total = cards.length;


  const dots = [];
  cards.forEach((_, i) => {
    const dot = document.createElement("button");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      index = i;
      updateCarousel();
    });
    dotsContainer.appendChild(dot);
    dots.push(dot);
  });

  function updateCarousel() {
    track.style.transform = `translateX(-${index * 100}%)`;


    dots.forEach((dot, i) =>
      dot.classList.toggle("active", i === index)
    );


    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === total - 1;
  }


  nextBtn.addEventListener("click", () => {
    if (index < total - 1) {
      index++;
      updateCarousel();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (index > 0) {
      index--;
      updateCarousel();
    }
  });

  
  updateCarousel();
});


  const playersSection = document.querySelector("#players");
  if (playersSection) {
    const track = playersSection.querySelector(".carousel-track");
    const cards = playersSection.querySelectorAll(".player-card");
    const prevBtn = playersSection.querySelector(".carousel-btn.prev");
    const nextBtn = playersSection.querySelector(".carousel-btn.next");
    const counter = playersSection.querySelector("#current-slide");

    let current = 0;
    const cardsPerView = 3;
    const totalCards = cards.length;
    const totalSlides = Math.ceil(totalCards / cardsPerView);
    let autoSlideInterval;

    function updatePlayersCarousel() {
      track.style.transform = `translateX(-${current * 100}%)`;

      let visibleCards = (current + 1) * cardsPerView;
      if (visibleCards > totalCards) visibleCards = totalCards;
      counter.textContent = `${visibleCards}/${totalCards}`;

     
      prevBtn.classList.add("disabled");
      nextBtn.classList.remove("disabled");
    }

    function nextSlide() {
      current = (current + 1) % totalSlides;
      updatePlayersCarousel();
      nextBtn.classList.add("disabled");
      prevBtn.classList.remove("disabled");
    }

    function prevSlide() {
      current = (current - 1 + totalSlides) % totalSlides;
      updatePlayersCarousel();
      prevBtn.classList.add("disabled");
      nextBtn.classList.remove("disabled");
    }

    function startAutoSlide() {
      autoSlideInterval = setInterval(nextSlide, 4000);
    }
    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    nextBtn.addEventListener("click", () => {
      stopAutoSlide();
      nextSlide();
      startAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
      stopAutoSlide();
      prevSlide();
      startAutoSlide();
    });

    updatePlayersCarousel();
    startAutoSlide();
  }

