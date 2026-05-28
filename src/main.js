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
const scriptUrl = document.currentScript.src;
const srcDirectory = scriptUrl.substring(0, scriptUrl.lastIndexOf('/'));

loadComponent('navbar-placeholder', srcDirectory + '/components/nav-user.html');
loadComponent('footer-placeholder', srcDirectory + '/components/footer-user.html');