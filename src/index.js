// =========================
// 1. CÁC HÀM TIỆN ÍCH CHUNG
// =========================
function toggleModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.toggle("hidden");
}

function setMegaMenuOpen(open) {
  const megaMenu = document.getElementById("megaMenu");
  const megaMenuBtnIcon = document.querySelector("#megaMenuBtn i");
  const mobileMegaMenuIcon = document.getElementById("mobileMegaMenuIcon");

  if (!megaMenu) return;

  megaMenu.classList.toggle("hidden", !open);
  const rotation = open ? "rotate(180deg)" : "rotate(0deg)";
  if (megaMenuBtnIcon) megaMenuBtnIcon.style.transform = rotation;
  if (mobileMegaMenuIcon) mobileMegaMenuIcon.style.transform = rotation;
}

function toggleMegaMenu(event) {
  event.stopPropagation();
  const megaMenu = document.getElementById("megaMenu");
  const userDropdown = document.getElementById("userDropdown");

  if (!megaMenu) return;

  if (userDropdown) userDropdown.classList.add("hidden");

  const willOpen = megaMenu.classList.contains("hidden");
  if (willOpen && window.matchMedia("(max-width: 767px)").matches) {
    closeMobileMenu();
  }
  setMegaMenuOpen(willOpen);
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenuIcon = document.getElementById("mobileMenuIcon");

  mobileMenu?.classList.add("hidden");
  mobileMenuBtn?.setAttribute("aria-expanded", "false");
  if (mobileMenuIcon) {
    mobileMenuIcon.classList.remove("ri-close-line");
    mobileMenuIcon.classList.add("ri-menu-line");
  }
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenuIcon = document.getElementById("mobileMenuIcon");

  if (!mobileMenu) return;

  const willOpen = mobileMenu.classList.contains("hidden");
  mobileMenu.classList.toggle("hidden", !willOpen);
  mobileMenuBtn?.setAttribute("aria-expanded", willOpen ? "true" : "false");

  if (mobileMenuIcon) {
    mobileMenuIcon.classList.toggle("ri-menu-line", !willOpen);
    mobileMenuIcon.classList.toggle("ri-close-line", willOpen);
  }

  if (!willOpen) setMegaMenuOpen(false);
}

window.toggleMobileMenu = toggleMobileMenu;
window.toggleMegaMenu = toggleMegaMenu;
window.closeMobileMenu = closeMobileMenu;
// Thay thế cho onclick="toggleSubAccordion(this)"
document.addEventListener("click", (e) => {
  // Tìm xem phần tử được click có class .accordion-trigger hay không
  const trigger = e.target.closest(".accordion-trigger");
  if (trigger) {
    toggleSubAccordion(trigger);
  }
});

// Hàm cũ của bạn (giữ nguyên logic, chỉ cần gọi qua delegation)
function toggleSubAccordion(element) {
  const submenu = element.nextElementSibling;
  const arrow = element.querySelector(".ri-arrow-down-s-line");
  const scrollContainer = element.closest(".overflow-y-auto");

  if (!submenu) return;

  const isAlreadyOpen = submenu.style.maxHeight && submenu.style.maxHeight !== "0px";

  // Đóng tất cả các sub khác
  const allSubmenus = document.querySelectorAll("#megaMenu .submenu-target");
  allSubmenus.forEach((sub) => {
    sub.style.maxHeight = "0px";
    const parentHeader = sub.previousElementSibling;
    if (parentHeader) {
      parentHeader.classList.remove("bg-slate-50");
      const parentArrow = parentHeader.querySelector(".ri-arrow-down-s-line");
      if (parentArrow) parentArrow.style.transform = "rotate(0deg)";
    }
  });

  // Mở cái hiện tại
  if (!isAlreadyOpen) {
    submenu.style.maxHeight = submenu.scrollHeight + "px";
    if (arrow) arrow.style.transform = "rotate(180deg)";
    element.classList.add("bg-slate-50");

    setTimeout(() => {
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: element.offsetTop - 12,
          behavior: "smooth",
        });
      }
    }, 150);
  }
}

// =========================
// 2. KHỞI TẠO USER DROPDOWN (Sử dụng window để gọi lại từ file khác)
// =========================
window.initUserDropdown = function () {
  const userDropdown = document.getElementById("userDropdown");
  const userMenuBtn = document.getElementById("userMenuBtn");
  const arrowIcon = document.getElementById("arrowIcon");

  if (!userDropdown || !userMenuBtn) return;

  const user = JSON.parse(localStorage.getItem("user")) || null;

  if (user) {
    userDropdown.innerHTML = `
      <div class="px-4 py-3 border-b border-slate-100">
        <p class="text-xs text-slate-400">Xin chào 👋</p>
        <p class="text-sm font-semibold truncate">${user.name || user.email}</p>
      </div>
      <a href="./profile.html" data-root-href="src/pages/profile.html" class="flex text-black items-center gap-2 px-4 py-3 hover:bg-slate-50"><i class="ri-user-line"></i> Tài khoản</a>
      <a href="./order.html" data-root-href="src/pages/order.html" class="flex text-black items-center gap-2 px-4 py-3 hover:bg-slate-50"><i class="ri-file-list-line"></i> Đơn hàng</a>
      <button id="logoutBtn" type="button" class="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50"><i class="ri-logout-box-r-line mr-2"></i> Đăng xuất</button>
    `;

    document.getElementById("logoutBtn")?.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("user");
      window.location.href = "./login.html";
    });
  } else {
    userDropdown.innerHTML = `
      <a href="./login.html" data-root-href="src/pages/login.html" class="flex text-black items-center gap-2 px-4 py-3 hover:bg-slate-50"><i class="ri-login-box-line"></i> Đăng nhập</a>
      <a href="./register.html" data-root-href="src/pages/register.html" class="flex text-black items-center gap-2 px-4 py-3 hover:bg-slate-50"><i class="ri-user-add-line"></i> Đăng ký</a>
    `;
  }

  if (typeof window.applyRootHrefOverrides === "function") {
    window.applyRootHrefOverrides(userDropdown);
  }
};

// =========================
// 3. XỬ LÝ SỰ KIỆN CLICK TOÀN CỤC (Event Delegation)
// =========================
function isMegaMenuTrigger(target) {
  return !!(
    target.closest("#megaMenuBtn") ||
    target.closest("#mobileMegaMenuBtn")
  );
}

function closeMegaMenuOnOutsideClick(e) {
  const megaMenu = document.getElementById("megaMenu");
  if (!megaMenu || megaMenu.classList.contains("hidden")) return;

  if (megaMenu.contains(e.target) || isMegaMenuTrigger(e.target)) return;

  setMegaMenuOpen(false);
}

document.addEventListener("click", (e) => {
  if (e.target.closest("#mobileMenu a[href]")) {
    closeMobileMenu();
    setMegaMenuOpen(false);
    return;
  }

  closeMegaMenuOnOutsideClick(e);

  const userMenuBtn = document.getElementById("userMenuBtn");
  const userDropdown = document.getElementById("userDropdown");
  const arrowIcon = document.getElementById("arrowIcon");

  if (userMenuBtn && userDropdown) {
    if (userMenuBtn.contains(e.target)) {
      setMegaMenuOpen(false);
      userDropdown.classList.toggle("hidden");
      arrowIcon?.classList.toggle("rotate-180");
    } else if (!userDropdown.contains(e.target)) {
      userDropdown.classList.add("hidden");
      arrowIcon?.classList.remove("rotate-180");
    }
  }

  const mobileMenu = document.getElementById("mobileMenu");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const clickedMobileNav =
    mobileMenu?.contains(e.target) || mobileMenuBtn?.contains(e.target);
  if (mobileMenu && !clickedMobileNav && !mobileMenu.classList.contains("hidden")) {
    closeMobileMenu();
    setMegaMenuOpen(false);
  }
});

window.addEventListener("resize", () => {
  if (window.matchMedia("(min-width: 768px)").matches) {
    closeMobileMenu();
  }
});

// =========================
// 4. CHẠY KHỞI TẠO
// =========================
document.addEventListener("DOMContentLoaded", () => {
  window.initUserDropdown();
});