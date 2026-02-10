//intro

if (window.innerWidth >= 768 && !sessionStorage.getItem("introPlayed")) {

  document.body.classList.add("no-scroll");

  const tl = gsap.timeline({
    onComplete: () => {
      document.querySelector(".intro").style.display = "none";
      document.body.classList.remove("no-scroll");
      sessionStorage.setItem("introPlayed", "true");
    }
  });

  tl.fromTo(".intro-logo img",
    {
      opacity: 0,
      scale: 0.5
    },
    {
      opacity: 1,
      scale: 1,
      duration: 1.1,
      ease: "power3.out"
    }
  )
  .to(".intro-logo img", {
    scale: 1.6,
    duration: 0.8,
    ease: "power2.inOut"
  })
  .to(".intro-logo img", {
    scale: 2.3,
    duration: 0.7,
    ease: "power4.in"
  })
  .to(".intro-left", {
    xPercent: -100,
    duration: 1,
    ease: "power4.inOut"
  }, "-=0.6")
  .to(".intro-right", {
    xPercent: 100,
    duration: 1,
    ease: "power4.inOut"
  }, "<")
  .to(".intro-logo img", {
    opacity: 0,
    duration: 0.3
  }, "-=0.5");

} else {
  document.querySelector(".intro")?.remove();
}
// 

function isDesktop() {
  return window.innerWidth >= 768;
}

  // Garante que a página sempre abra no topo
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };





const menuToggle = document.querySelector(".menu-toggle");
const menuIcon = menuToggle.querySelector(".icon");
const navLinks = document.querySelector(".nav-links");
const overlay = document.querySelector(".menu-overlay");

menuToggle.addEventListener("click", () => {
  if (isDesktop()) return;

  const isOpen = navLinks.classList.contains("active");
  isOpen ? closeMenu() : openMenu();
});

function openMenu() {
  const scrollY = window.scrollY;
  document.body.style.setProperty("--scroll-y", `-${scrollY}px`);

  overlay.classList.add("active");

  requestAnimationFrame(() => {
    navLinks.classList.add("active");
    menuToggle.classList.add("active");
    menuIcon.textContent = "✕";
    document.body.classList.add("menu-open");
  });
}


function closeMenu() {
  const scrollY = document.body.style.getPropertyValue("--scroll-y");

  navLinks.classList.remove("active");
  menuToggle.classList.remove("active");
  menuIcon.textContent = "☰";

  setTimeout(() => {
    overlay.classList.remove("active");
    document.body.classList.remove("menu-open");
    document.body.style.removeProperty("--scroll-y");
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
  }, 300);
}


/* Fecha clicando no overlay */
overlay.addEventListener("click", closeMenu);

/* Fecha ao clicar em link */
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", (e) => {
    const targetId = link.getAttribute("href");

    // só trata âncoras
    if (targetId.startsWith("#")) {
      e.preventDefault();

       if (!isDesktop()) {
        closeMenu();
      }

      setTimeout(() => {
        document.querySelector(targetId)?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 300); // tempo da animação do menu
    }
  });
});

/* Para travar o scrool do body*/


window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    closeMenu();
  }
});

// Card

document.querySelectorAll(".produto-card").forEach(card => {
  card.addEventListener("click", () => {
    const slug = card.dataset.slug;
    window.location.href = `produto.html?produto=${slug}`;
  });
});

document.querySelectorAll(".btn-whatsapp").forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation();
  });
});

// carrosel

const track = document.querySelector(".produtos-grid");
const cards = document.querySelectorAll(".produto-card");
const prevBtn = document.querySelector(".produtos-nav.prev");
const nextBtn = document.querySelector(".produtos-nav.next");

let index = 0;

function isMobile() {
  return window.innerWidth < 768;
}

function updateCarousel() {
  if (!isMobile()) {
    track.style.transform = "none";
    return;
  }

  const container = document.querySelector(".produtos-track");
  const cardWidth = container.getBoundingClientRect().width;

  track.style.transform = `translate3d(-${index * cardWidth}px, 0, 0)`;
}



window.addEventListener("resize", () => {
  if (!isMobile()) {
    track.style.transform = "none";
  } else {
    index = 0;
    updateCarousel();
  }
});

const maxIndex = cards.length - 1;

nextBtn.addEventListener("click", () => {
  if (!isMobile()) return;
  if (index < maxIndex) {
    index++;
    updateCarousel();
  }
});

prevBtn.addEventListener("click", () => {
  if (!isMobile()) return;
  if (index > 0) {
    index--;
    updateCarousel();
  }
});








// Gsap

gsap.from(".hero h1", {
    y:40,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
})

gsap.from(".hero p", {
  y: 30,
  opacity: 0,
  duration: 0.9,
  delay: 0.2,
  ease: "power3.out"
});

gsap.from(".hero .btn-primary", {
  y: 20,
  opacity: 0,
  duration: 0.8,
  delay: 0.4,
  ease: "power3.out"
});

gsap.from(".diferencial-item", {
  scrollTrigger: {
    trigger: ".diferenciais",
    start: "top 85%",
  },
  scale: 0.92,
  opacity: 0,
  duration: 0.8,
  ease: "power2.out",
  stagger: 0.15
});

gsap.from(".contato h2, .contato p, .contato-acoes", {
  scrollTrigger: {
    trigger: ".contato",
    start: "top 80%",
  },
  y: 40,
  opacity: 0,
  duration: 0.9,
  stagger: 0.2,
  ease: "power3.out"
});

ScrollTrigger.create({
  start: 80,
  onEnter: () => {
    gsap.to("header", {
      backgroundColor: "rgba(255,255,255,0.95)",
      backdropFilter: "blur(8px)",
      boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      duration: 0.3
    });
  },
  onLeaveBack: () => {
    gsap.to("header", {
      backgroundColor: "#fff",
      backdropFilter: "blur(0px)",
      boxShadow: "none",
      duration: 0.3
    });
  }
});



document.querySelectorAll(".btn-whatsapp").forEach(botao => {
  botao.addEventListener("click", (e) => {
    e.preventDefault();

    const card = botao.closest(".produto-card");
    const produto = card.dataset.produto;
    const preco = card.dataset.preco;

    const mensagem = encodeURIComponent(
      `Oi! Quero comprar o produto: ${produto} ${preco}\n\nPode me passar mais detalhes?`
    );

    window.open(
      `https://wa.me/5524992145076?text=${mensagem}`,
      "_blank"
    );
  });
});



