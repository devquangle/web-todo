function toggleModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.toggle("hidden");
}

// Hàm đóng mở Mega Menu (Danh mục)
function toggleMegaMenu(event) {
  event.stopPropagation();
  const megaMenu = document.getElementById("megaMenu");
  const userDropdown = document.getElementById("userDropdown");
  const megaMenuBtnIcon = document.querySelector("#megaMenuBtn i");

  if (userDropdown) userDropdown.classList.add("hidden");

  const isHidden = megaMenu.classList.toggle("hidden");

  // Xoay mũi tên nút Danh mục chính
  if (megaMenuBtnIcon) {
    megaMenuBtnIcon.style.transform = isHidden
      ? "rotate(0deg)"
      : "rotate(180deg)";
  }
}

// Hàm đóng mở Menu tài khoản
function toggleUserMenu(event) {
  event.stopPropagation();
  const userDropdown = document.getElementById("userDropdown");
  const megaMenu = document.getElementById("megaMenu");

  if (megaMenu) {
    megaMenu.classList.add("hidden");
    const megaMenuBtnIcon = document.querySelector("#megaMenuBtn i");
    if (megaMenuBtnIcon) megaMenuBtnIcon.style.transform = "rotate(0deg)";
  }

  userDropdown.classList.toggle("hidden");
}

// Tự động đóng TẤT CẢ các menu nếu nhấp chuột ra ngoài vùng menu
window.addEventListener("click", function (e) {
  const megaMenu = document.getElementById("megaMenu");
  const megaMenuBtn = document.getElementById("megaMenuBtn");
  const userDropdown = document.getElementById("userDropdown");
  const userMenuBtn = document.getElementById("userMenuBtn");

  // Xử lý đóng Mega Menu
  if (megaMenu && !megaMenu.classList.contains("hidden")) {
    if (!megaMenuBtn.contains(e.target) && !megaMenu.contains(e.target)) {
      megaMenu.classList.add("hidden");
      const megaMenuBtnIcon = document.querySelector("#megaMenuBtn i");
      if (megaMenuBtnIcon) megaMenuBtnIcon.style.transform = "rotate(0deg)";
    }
  }

  // Xử lý đóng Dropdown Tài khoản
  if (userDropdown && !userDropdown.classList.contains("hidden")) {
    if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
      userDropdown.classList.add("hidden");
    }
  }
});
function toggleSubAccordion(element) {
  const submenu = element.nextElementSibling;
  const arrow = element.querySelector(".ri-arrow-down-s-line");
  const scrollContainer = element.closest(".overflow-y-auto");

  if (!submenu) return;

  // Kiểm tra xem mục hiện tại click vào đã mở chưa
  const isAlreadyOpen =
    submenu.style.maxHeight && submenu.style.maxHeight !== "0px";

  // Tìm tất cả các vùng submenu đang mở trong toàn bộ Mega Menu
  const allSubmenus = document.querySelectorAll("#megaMenu .submenu-target");
  allSubmenus.forEach((sub) => {
    sub.style.maxHeight = "0px";

    // Tìm phần tử cha (header) tương ứng để reset style và xoay lại mũi tên
    const parentHeader = sub.previousElementSibling;
    if (parentHeader) {
      parentHeader.classList.remove("bg-slate-50");
      const parentArrow = parentHeader.querySelector(".ri-arrow-down-s-line");
      if (parentArrow) parentArrow.style.transform = "rotate(0deg)";
    }
  });

  if (!isAlreadyOpen) {
    // Nếu trước đó đang đóng -> Tiến hành mở nó ra
    submenu.style.maxHeight = submenu.scrollHeight + "px";
    if (arrow) arrow.style.transform = "rotate(180deg)";
    element.classList.add("bg-slate-50");

    // Cuộn mượt mà đưa mục vừa mở lên góc nhìn rõ hơn (tùy chọn)
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

