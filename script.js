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



const menuToggle = document.querySelector(".menu-toggle");
const menuIcon = menuToggle.querySelector(".icon");
const navLinks = document.querySelector(".nav-links");
const overlay = document.querySelector(".menu-overlay");

/* TOGGLE MENU */
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.contains("active");

  if (isOpen) {
    closeMenu();
  } else {
    openMenu();
  }
});

function openMenu() {
  navLinks.classList.add("active");
  overlay.classList.add("active");
  menuIcon.textContent = "✕";
  menuToggle.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  navLinks.classList.remove("active");
  overlay.classList.remove("active");
  menuIcon.textContent = "☰";
  menuToggle.classList.remove("active");
  document.body.style.overflow = "";
}

/* FECHAR AO CLICAR NO OVERLAY */
overlay.addEventListener("click", closeMenu);

/* FECHAR AO CLICAR EM LINK */
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", closeMenu);
});
/* GALERIA DE PRODUTOS */
document.querySelectorAll(".produto-card").forEach((card) => {
  const images = card.querySelectorAll(".produto-galeria img");
  let index = 0;

  images[index].classList.add("active");

  const controls = document.createElement("div");
  controls.classList.add("galeria-controls");

  const prev = document.createElement("button");
  prev.innerHTML = "‹";

  const next = document.createElement("button");
  next.innerHTML = "›";

  controls.appendChild(prev);
  controls.appendChild(next);
  card.querySelector(".produto-galeria").after(controls);

  prev.addEventListener("click", () => {
    images[index].classList.remove("active");
    index = (index - 1 + images.length) % images.length;
    images[index].classList.add("active");
  });

  next.addEventListener("click", () => {
    images[index].classList.remove("active");
    index = (index + 1) % images.length;
    images[index].classList.add("active");
  });
});

/* Para travar o scrool do body*/
function openMenu() {
  navLinks.classList.add("active");
  overlay.classList.add("active");
  menuIcon.textContent = "✕";
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  navLinks.classList.remove("active");
  overlay.classList.remove("active");
  menuIcon.textContent = "☰";
  document.body.style.overflow = "";
}

window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    closeMenu();
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



/*
let lastTouchTime = 0;

document.addEventListener('touchend', (event) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTouchTime;
    
    // Se o tempo entre toques for menor que 500ms, é considerado duplo toque
    if (tapLength < 300 && tapLength > 0) {
        event.preventDefault(); // Impede o zoom
    }
    lastTouchTime = currentTime;
});*/