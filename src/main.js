function isInPagesFolder() {
  // Works for Live Server, localhost, GH Pages, Netlify, Vercel:
  // relative paths are resolved by the browser based on current URL path.
  return window.location.pathname.includes("/src/pages/");
}

async function loadComponent(id, file) {
  const element = document.getElementById(id);
  if (!element) return;

  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error(`Không thể tải: ${file}`);
    const data = await response.text();
    element.innerHTML = data;
  } catch (error) {
    console.error("Lỗi loadComponent:", error);
  }
}

function applyRootHrefOverrides(scope = document) {
  // nav-user.html is authored for pages (src/pages/*).
  // When it is injected into root (index.html), patch hrefs via data-root-href.
  if (isInPagesFolder()) return;

  const nodes = scope.querySelectorAll("[data-root-href]");
  nodes.forEach((el) => {
    const rootHref = el.getAttribute("data-root-href");
    if (rootHref) el.setAttribute("href", rootHref);
  });
}

window.applyRootHrefOverrides = applyRootHrefOverrides;

document.addEventListener("DOMContentLoaded", async () => {
  const isPage = isInPagesFolder();
  const componentBase = isPage ? "../components/" : "src/components/";

  // Khởi tạo các Promise để load các component cùng lúc
  const navbarPromise = loadComponent("navbar-placeholder", `${componentBase}nav-user.html`);
  const footerPromise = loadComponent("footer-placeholder", `${componentBase}footer-user.html`);

  // Chờ cho cả 2 hoàn tất
  await Promise.all([navbarPromise, footerPromise]);

  // Sau khi cả 2 đã load xong, mới thực hiện các logic bổ sung
  // Lưu ý: Navbar phải xong trước để applyRootHrefOverrides và các hàm init
  applyRootHrefOverrides(document.getElementById("navbar-placeholder") || document);

  if (typeof window.initUserDropdown === 'function') {
    window.initUserDropdown();
  }
  if (typeof window.updateCartFavoriteVisibility === 'function') {
    window.updateCartFavoriteVisibility();
  }
});