export default async function router(pathname = window.location.pathname) {
    switch (pathname) {
      case "/":
        await import("./views/home.js");
        break;
      case "/auth/":
        await import("./views/auth.js");
        break;
      case "/auth/login/":
        await import("./views/login.js");
        break;
      case "/auth/register/":
        await import("./views/register.js");
        break;
      case "/post/":
        await import("./views/post.js");
        break;
      case "/post/edit/":
        await import("./views/postEdit.js");
        break;
      case "/post/create/":
        await import("./views/postCreate.js");
        break;
      case "/profile/":
        await import("./views/profile.js");
        break;
      default:
        await import("./views/notFound.js");
    }
  }
  