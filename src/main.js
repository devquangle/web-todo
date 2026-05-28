async function loadComponent(id, file) {
    const element = document.getElementById(id);
    if (!element) return;

    try {
        const response = await fetch(file); 
        
        if (!response.ok) throw new Error(`Lỗi tải file: ${file}`);
        const data = await response.text();
        element.innerHTML = data;
    } catch (error) {
        console.error("Lỗi khi tải component:", error);
    }
}

// Xác định đường dẫn gốc tương đối dựa trên vị trí của file HTML hiện tại
// Nếu trang hiện tại nằm trong thư mục con '/src/pages/', tiền tố sẽ là '../'
// Nếu trang hiện tại nằm ở thư mục gốc (index.html), tiền tố sẽ là './src/'
const isSubPage = window.location.pathname.includes('/src/pages/');
const basePath = isSubPage ? '../' : './src/';

// Gọi hàm tải động các thành phần giao diện dùng chung
loadComponent('navbar-placeholder', basePath + 'components/nav-user.html');
loadComponent('footer-placeholder', basePath + 'components/footer-user.html');