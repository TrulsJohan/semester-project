# BidOn

## Description
A web application designed to facilitate the creation and management of listings, bidding, and account management. The application supports both registered and unregistered users, providing a seamless experience for browsing and interacting with listings for auction.

## Features
### User Stories
- **Registration**: A user with a `stud.noroff.no` email may register.
- **Login**: A registered user may log in.
- **Logout**: A registered user may log out.
- **Profile Management**: A registered user may update their avatar and view their total credit.
- **Listings**:
  - A registered user may create a listing with the following details:
    - Title
    - Deadline date
    - Media gallery
    - Description
  - An unregistered user may search through existing listings.
- **Bidding**:
  - A registered user may add a bid to another user’s listing.
  - A registered user may view bids made on a listing.

### Best Practices
- The application code (JavaScript, CSS, and HTML) follows best practices:
  - Modular and clean JavaScript code structure.
  - CSS uses appropriate class naming conventions and is optimized for maintainability.
  - HTML is semantic and adheres to accessibility standards.

### User Experience
- Errors are handled with user-friendly alerts.
- All form inputs are validated and accessible.
- The navigation UI is efficient, functional, and accessible.

---

## Installation and Setup
This project is built using [Vite](https://vitejs.dev/), a modern frontend tool for fast development.

### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/)
- npm (comes with Node.js)

### Installation
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <project_directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
   This will start the application and provide a local development server. Open your browser and navigate to the URL displayed (usually `http://localhost:5173`).

### Build for Production
To create an optimized build for production:
```bash
npm run build
```
The output will be in the `dist` folder.

### Preview the Production Build
To preview the production build locally:
```bash
npm run preview
```

---

## Usage

### Register
1. Enter a valid `stud.noroff.no` email.
2. Complete the registration form.

### Login
1. Enter your registered email and password.
2. Click the login button to access your account.

### Manage Profile
- Update your avatar by uploading a new image.
- View your total credit directly on your profile.

### Create a Listing
1. Navigate to the "Create Listing" section.
2. Provide the required details:
   - Title
   - Deadline date
   - Media gallery
   - Description
3. Submit the form to publish the listing.

### Bid on Listings
1. Browse listings created by other users.
2. Add a bid by entering your offer and submitting.

### View Bids
- Access a listing to view all bids made by other users.

### Search Listings
- Use the search bar to find listings by keywords.

---

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`feature/your-feature-name`).
3. Commit your changes.
4. Push to your branch and submit a pull request.

---

## License
This project is licensed under the [MIT License](LICENSE).

---

## Contact
For any questions or feedback, please reach out at [truls@myst83.com].


