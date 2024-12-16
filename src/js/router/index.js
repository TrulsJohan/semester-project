export default async function router(pathname = window.location.pathname) {
    switch (pathname) {
        case '/':
            await import('./views/home.js');
            break;
        case '/auth/login/':
            await import('./views/login.js');
            break;
        case '/auth/register/':
            await import('./views/register.js');
            break;
        case '/post/create/':
            await import('./views/create.js');
            break;
        case '/profile/':
            await import('./views/profile.js');
            break;
        case '/post/post/':
            await import('./views/post.js');
            break;
        default:
            await import('./views/notFound.js');
    }
}
