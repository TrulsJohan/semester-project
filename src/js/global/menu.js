export async function menuToggle(action) {
    const menu = document.getElementById('menu');
    if (!menu) {
        alert('Menu element not found');
        return;
    }

    if (action === 'open') {
        menu.classList.remove('hidden');
        menu.classList.add('flex');
    } else if (action === 'close') {
        menu.classList.remove('flex');
        menu.classList.add('hidden');
    } else {
        alert("Invalid action for menuToggle: use 'open' or 'close'");
    }
}
