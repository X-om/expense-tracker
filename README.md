# Expense-X Tracker 💰

A full-stack expense tracking application that helps users manage their finances efficiently with an intuitive interface, detailed analytics, and powerful features.

## 🌟 Features

### User Account:

- **Sign Up & Sign In**: User authentication using JWT.
- **Profile Management**:
  - Upload or remove profile pictures (stored via Imgur).
  - Update user information (name, password).

### Dashboard:

- **Account Overview**:
  - Add income balance and budget.
  - View current balance, income, budget, and spending in value and percentage.
- **Spending Breakdown**:
  - Spending by categories displayed in percentages.

### Transactions:

- **History & Search**:
  - Search transactions with filters for category, date range, and description.
- **Export Data**:
  - Download transaction history as `.xlsx` or `.csv` files.

### Analytics:

- Visualizations using ECharts:
  - **Pie Chart**
  - **Bar Chart**
  - **3D Bar Chart**

### Responsiveness:

- Fully responsive UI optimized for all devices.

---

## 🛠️ Tech Stack

### Frontend:

- **React.js**
- **Tailwind CSS**
- **NextUI** (Component Library)
- **Recoil** (State Management)
- **React Router DOM**
- **Framer Motion** (Animations)
- **ECharts** (Charts & Graphs)
- **Lodash Debounce** (Optimized Search)
- **Axios** (API Calls)

### Backend:

- **Express.js**
- **Mongoose** (MongoDB)
- **JWT** (Authentication)
- **Argon2** (Password Hashing)
- **Zod** (Input Validation)
- **Excel.js** (File Export)
- **Dotenv** (Environment Variables)

### Image Storage:

- **Imgur.com**: For storing user profile images.

---

## 🌐 Deployment

- **Frontend**: Deployed on [Vercel](https://vercel.com/).
- **Backend**: Deployed on [Railway.app](https://railway.app/).

🔗 Live Demo: [Expense-X Tracker](https://expense-x-tracker.vercel.app)

---

## 📥 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/expense-x-tracker.git
   cd expense-x-tracker
   ```
2. **Install dependencies:**

   ```bash
    cd frontend
    npm install
   ```

   ```bash
   cd server
   npm install
   ```

3. **Setup Environment Variables:**
    *frontend*

    VITE_BACKEND_URL=your_backend_url
    VITE_IMGUR_CLIENT_ID=your_imgur_client_id

    *backend*

    PORT=your_port_no
    MONGO_URL=your_mongoDB_url
    JWT_SECRET=your_jwt_secret_key

## 🤝 Contributing
Contributions are welcome! Feel free to fork the repo and submit a pull request.

## 📄 License
This project is licensed under the MIT License.

## 📧 Contact
For any inquiries or feedback, feel free to reach out:

Email: omargade2208@gmail.com
LinkedIn: https://www.linkedin.com/in/om-argade-694038259
