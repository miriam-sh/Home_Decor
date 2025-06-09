# Home Decor – Online Store Web App

An online store for home decor accessories, built with Angular 18 (frontend) and C# with Entity Framework Core (backend).  
Includes features such as product catalog, shopping cart, category and style filtering, and admin-ready backend structure.

> Note: The project may look empty or not styled properly if no data is seeded into the database.

## Features

- Full-stack application: Angular frontend, C# backend, SQL Server database
- Display of products by category and style
- Product details page and shopping cart functionality
- Organized project structure for easy scalability

## Future Plans

- User registration and login (including Google login)
- Admin dashboard for product and order management
- Google Pay integration for payments
- Gift cards and birthday discounts
- Smart product recommendations
- Order history and management

## Setup Instructions

### Prerequisites

- [.NET 8 SDK](https://dotnet.microsoft.com/)
- [Node.js](https://nodejs.org/) (v18 or later)
- [Angular CLI](https://angular.io/cli)
- SQL Server (local or remote)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/home-decor-store.git
   cd home-decor-store
   ```

2. Navigate to the backend project and apply the secret connection string:

   ```bash
   cd backend
   dotnet user-secrets set "sql-connection" "Server=\"YOUR-COMPUTER-NAME\";Database=HomeAccessories;Trusted_Connection=True;TrustServerCertificate=True"
   ```

3. Apply migrations and update the database:

   ```bash
   dotnet ef database update
   ```

4. Run the backend:

   ```bash
   dotnet run
   ```

5. In a new terminal, go to the frontend folder and install dependencies:

   ```bash
   cd frontend
   npm install
   ```

6. Run the Angular app:

   ```bash
   ng serve
   ```

7. Open [http://localhost:4200](http://localhost:4200) in your browser.

---

