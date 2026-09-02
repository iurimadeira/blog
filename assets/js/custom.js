(() => {
  const modeToggle = document.getElementById("mode");
  modeToggle?.addEventListener("click", (event) => event.preventDefault());

  const menuTrigger = document.getElementById("menu-trigger");
  const menuButton = document.getElementById("menu-button");

  if (!menuTrigger || !menuButton) return;

  const syncMenuState = () => {
    menuButton.setAttribute("aria-expanded", String(menuTrigger.checked));
    menuButton.setAttribute(
      "aria-label",
      menuTrigger.checked ? "Close main menu" : "Open main menu",
    );
    document.body.style.overflow = menuTrigger.checked ? "hidden" : "";
    document.querySelectorAll(".wrapper, .footer").forEach((element) => {
      element.inert = menuTrigger.checked;
    });
  };

  menuTrigger.addEventListener("change", syncMenuState);
  menuButton.addEventListener("click", () => {
    menuTrigger.checked = !menuTrigger.checked;
    menuTrigger.dispatchEvent(new Event("change", { bubbles: true }));
  });

  syncMenuState();
})();
