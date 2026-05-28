async function loadComponent(id, file) {
    const element = document.getElementById(id);
    if (!element) return;

    try {
        // BỎ DÒNG: const url = window.location.origin + file;
        // Dùng trực tiếp 'file' như một đường dẫn tương đối
        const response = await fetch(file); 
        
        if (!response.ok) throw new Error(`Lỗi tải file: ${file}`);
        const data = await response.text();
        element.innerHTML = data;
    } catch (error) {
        console.error("Lỗi khi tải component:", error);
    }
}

// Gọi hàm với đường dẫn tương đối tính từ file HTML hiện tại
// Nếu bạn đang ở index.html (gốc), dùng:
loadComponent('navbar-placeholder', 'src/components/nav-user.html');
loadComponent('footer-placeholder', 'src/components/footer-user.html');