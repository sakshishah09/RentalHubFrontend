# RentalHub Angular Frontend (Full Scaffold - Angular 20)

This archive contains a starter Angular frontend scaffold for a rental website with separate feature modules for **User**, **Seller**, **Admin**, and **Auth**, plus `core` and `shared` modules.

## What you get
- `src/app/` with the structure you asked: core, shared, features (user/seller/admin/auth)
- Minimal example components (home, profile, dashboard, etc.)
- Working `package.json` for **Angular 20** (stable versions)

## Quick setup (Windows)

1. Extract the ZIP to a folder:
   - Right-click ZIP -> Extract All...

2. Install Node & nvm (recommended)
   - Install nvm-windows: https://github.com/coreybutler/nvm-windows
   - Install Node 20 and use it:
     ```
     nvm install 20.6.0
     nvm use 20.6.0
     ```

3. Install dependencies
   ```
   npm install
   ```

4. Serve the app
   ```
   npx ng serve
   ```
   or if you installed Angular CLI globally:
   ```
   ng serve
   ```

5. Open `http://localhost:4200` in your browser.

## Notes & Next steps
- This scaffold is minimal — replace placeholder content with your real UI and API calls.
- Add real routing in each feature module (`user-routing.module.ts`, etc.) as needed.
- Wire `ApiService` to your backend endpoints (e.g., product APIs we discussed earlier).
- Implement AuthService login/logout and protect routes with `AuthGuard`.

If you want, I can:
- Add fully implemented `add-product` and `manage-products` pages (forms, image upload),
- Wire the product update API (controller/service) to front-end forms,
- Create Postman collection or example requests for the backend endpoints.
