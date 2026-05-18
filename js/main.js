const lightning = document.querySelector(".lightning-bg");

setInterval(() => {
  lightning.classList.add("flash");

  setTimeout(() => {
    lightning.classList.remove("flash");
  }, 180);
}, 3200);