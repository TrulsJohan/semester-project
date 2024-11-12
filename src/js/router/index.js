export default async function router(pathname = window.location.pathname) {
    switch (pathname) {
      case "/":
        await import("./views/home.js");
        break;
      case "/auth/login.html":
        await import("./views/login.js");
        break;
      case "/auth/register.html":
        await import("./views/register.js");
        break;
      case "/post/createPost.html":
        await import("./views/createPost.js");
        break;
      default:
        await import("./views/notFound.js");
    }
  }
  