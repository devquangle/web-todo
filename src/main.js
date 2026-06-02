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

  // Load navbar và đợi nó hoàn tất
  await loadComponent("navbar-placeholder", `${componentBase}nav-user.html`);
  applyRootHrefOverrides(document.getElementById("navbar-placeholder") || document);

  // SAU KHI LOAD XONG NAVBAR, KÍCH HOẠT LOGIC MENU
  if (typeof window.initUserDropdown === 'function') {
    window.initUserDropdown();
  }

  await loadComponent("footer-placeholder", `${componentBase}footer-user.html`);
});