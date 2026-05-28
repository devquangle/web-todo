async function loadComponent(id, file) {
    const element = document.getElementById(id);
    
    // Kiểm tra: Nếu không tìm thấy element thì thoát hàm ngay lập tức
    if (!element) {
        console.warn(`Không tìm thấy phần tử có ID: ${id}. Bỏ qua.`);
        return;
    }

    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`Lỗi tải file: ${file}`);
        const data = await response.text();
        element.innerHTML = data;
    } catch (error) {
        console.error("Lỗi khi tải component:", error);
    }
}

// Gọi hàm
loadComponent('navbar-placeholder', '/src/components/nav-user.html');
loadComponent('footer-placeholder', '/src/components/footer-user.html');