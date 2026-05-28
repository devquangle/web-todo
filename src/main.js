async function loadComponent(id, file) {
    const element = document.getElementById(id);
    if (!element) return;

    // Đảm bảo APP_ROOT tồn tại, nếu không lấy mặc định là '/'
    const root = (typeof window.APP_ROOT !== 'undefined') ? window.APP_ROOT : '/';
    
    // Loại bỏ dấu '/' ở đầu của biến 'file' nếu có để tránh lỗi lặp dấu (//)
    const cleanPath = file.startsWith('/') ? file.substring(1) : file;
    const url = root + cleanPath;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Không thể tải: ${url}`);
        const data = await response.text();
        element.innerHTML = data;
    } catch (error) {
        console.error("Lỗi loadComponent:", error);
    }
}

// Gọi hàm sau khi trang đã load xong để đảm bảo APP_ROOT đã sẵn sàng
document.addEventListener('DOMContentLoaded', () => {
    loadComponent('navbar-placeholder', 'src/components/nav-user.html');
    loadComponent('footer-placeholder', 'src/components/footer-user.html');
});