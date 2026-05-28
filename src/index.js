// =========================
// 1. CÁC HÀM TIỆN ÍCH CHUNG
// =========================
function toggleModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.toggle("hidden");
}

function toggleMegaMenu(event) {
  event.stopPropagation();
  const megaMenu = document.getElementById("megaMenu");
  const userDropdown = document.getElementById("userDropdown");
  const megaMenuBtnIcon = document.querySelector("#megaMenuBtn i");

  if (!megaMenu) return;

  // Đóng user dropdown khi mở mega menu
  if (userDropdown) userDropdown.classList.add("hidden");

  const isHidden = megaMenu.classList.toggle("hidden");
  if (megaMenuBtnIcon) {
    megaMenuBtnIcon.style.transform = isHidden ? "rotate(0deg)" : "rotate(180deg)";
  }
}
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
window.initUserDropdown = function() {
  const userDropdown = document.getElementById("userDropdown");
  const userMenuBtn = document.getElementById("userMenuBtn");
  const arrowIcon = document.getElementById("arrowIcon");

  if (!userDropdown || !userMenuBtn || !arrowIcon) return;

  const user = JSON.parse(localStorage.getItem("user")) || null;

  if (user) {
    userDropdown.innerHTML = `
      <div class="px-4 py-3 border-b border-slate-100">
        <p class="text-xs text-slate-400">Xin chào 👋</p>
        <p class="text-sm font-semibold truncate">${user.name || user.email}</p>
      </div>
      <a href="./profile.html"       data-root-href="src/pages/profile.html" class="flex text-black items-center gap-2 px-4 py-3 hover:bg-slate-50"><i class="ri-user-line"></i> Tài khoản</a>
      <a href="./order.html"       data-root-href="src/pages/order.html" class="flex text-black items-center gap-2 px-4 py-3 hover:bg-slate-50"><i class="ri-file-list-line"></i> Đơn hàng</a>
      <button id="logoutBtn" class="w-full  text-left px-4 py-3 text-red-500 hover:bg-red-50"><i class="ri-logout-box-r-line mr-2"></i> Đăng xuất</button>
    `;

    document.getElementById("logoutBtn")?.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("user");
      window.location.href = "./login.html";
    });
  } else {
    userDropdown.innerHTML = `
      <a href="./login.html"      data-root-href="src/pages/login.html" class="flex text-black items-center gap-2 px-4 py-3 hover:bg-slate-50"><i class="ri-login-box-line"></i> Đăng nhập</a>
      <a href="./register.html" data-root-href="src/pages/register.html" class="flex text-black items-center gap-2 px-4 py-3 hover:bg-slate-50"><i class="ri-user-add-line"></i> Đăng ký</a>
    `;
  }
};

// =========================
// 3. XỬ LÝ SỰ KIỆN CLICK TOÀN CỤC (Event Delegation)
// =========================
document.addEventListener("click", (e) => {
  const userMenuBtn = document.getElementById("userMenuBtn");
  const userDropdown = document.getElementById("userDropdown");
  const arrowIcon = document.getElementById("arrowIcon");

  if (!userMenuBtn || !userDropdown) return;

  // Nếu click vào nút userMenuBtn
  if (userMenuBtn.contains(e.target)) {
    e.stopPropagation();
    
    // Đóng Mega Menu nếu nó đang mở
    const megaMenu = document.getElementById("megaMenu");
    if (megaMenu) megaMenu.classList.add("hidden");

    userDropdown.classList.toggle("hidden");
    arrowIcon?.classList.toggle("rotate-180");
  } 
  // Nếu click ra ngoài userDropdown thì đóng nó lại
  else if (!userDropdown.contains(e.target)) {
    userDropdown.classList.add("hidden");
    arrowIcon?.classList.remove("rotate-180");
  }
});

// =========================
// 4. CHẠY KHỞI TẠO
// =========================
document.addEventListener("DOMContentLoaded", () => {
  window.initUserDropdown();
});