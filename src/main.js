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
// Lấy đường dẫn tuyệt đối của chính tệp main.js đang được chạy
// Điều này giúp xác định chính xác thư mục chứa các component dùng chung (src/components)
// mà không cần quan tâm đến URL hay độ sâu thư mục của trang HTML đang tải nó.
const scriptUrl = document.currentScript.src;
const srcDirectory = scriptUrl.substring(0, scriptUrl.lastIndexOf('/'));

// Gọi hàm tải động các thành phần giao diện dùng chung bằng đường dẫn tuyệt đối động
loadComponent('navbar-placeholder', srcDirectory + '/components/nav-user.html');
loadComponent('footer-placeholder', srcDirectory + '/components/footer-user.html');