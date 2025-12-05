# Operations Research Toolkit

A comprehensive web-based Operations Research solver featuring interactive implementations of fundamental optimization algorithms. Built with a modern React frontend and FastAPI backend, this toolkit provides step-by-step solutions with detailed iterations for educational and professional use.

![License](https://img.shields.io/badge/license-Proprietary-red)
![Python](https://img.shields.io/badge/python-3.8+-blue.svg)
![React](https://img.shields.io/badge/react-18.3-61dafb.svg)

## 🚀 Features

### Implemented Algorithms

- **Simplex Method**: Solve linear programming problems with detailed tableau iterations
- **Transportation Problem**: Optimize distribution networks using Vogel's Approximation Method (VAM) and MODI method
- **Assignment Problem**: Solve assignment optimization using the Hungarian Algorithm

### Key Capabilities

- ✨ Interactive web interface with real-time computation
- 📊 Step-by-step solution visualization
- 🔍 Detailed iteration breakdown for learning
- 🎯 Support for maximization and minimization problems
- 📱 Responsive design for all devices
- ⚡ Fast computation with Python backend

## 🛠️ Tech Stack

**Frontend:**

- React 18.3
- Vite
- CSS3

**Backend:**

- Python 3.8+
- FastAPI
- NumPy
- CORS middleware

## 📋 Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn
- Git

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/CodeRafay/operations-research-toolkit.git
cd operations-research-toolkit
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

### 4. Running the Application

#### Start Backend Server

```bash
# From backend directory with activated venv
uvicorn main:app --reload
```

Backend will run on: `http://127.0.0.1:8000`

#### Start Frontend Development Server

```bash
# From frontend directory
npm run dev
```

Frontend will run on: `http://localhost:5173`

#### Quick Start (Windows)

Use the provided batch file:

```bash
run.bat
```

## 📖 Usage

### Simplex Method

1. Navigate to the Simplex page
2. Enter the number of variables and constraints
3. Input the objective function coefficients
4. Fill in the constraint coefficients and RHS values
5. Select optimization type (Maximize/Minimize)
6. Click "Solve" to see step-by-step solution

### Transportation Problem

1. Go to the Transportation page
2. Specify the number of sources and destinations
3. Enter supply values for each source
4. Enter demand values for each destination
5. Fill in the cost matrix
6. Click "Solve" to get the optimal solution

### Assignment Problem

1. Access the Assignment page
2. Set the matrix size (n × n)
3. Enter the cost/profit matrix
4. Choose the problem type (Minimization/Maximization)
5. Click "Solve" to see optimal assignments

## 🏗️ Project Structure

```
operations-research-toolkit/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── requirements.txt        # Python dependencies
│   └── solvers/
│       ├── simplex.py         # Simplex algorithm
│       ├── transportation.py  # Transportation solver
│       └── assignment.py      # Assignment solver
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main application component
│   │   ├── ErrorBoundary.jsx # Error handling
│   │   └── pages/
│   │       ├── Home.jsx
│   │       ├── Simplex.jsx
│   │       ├── Transportation.jsx
│   │       └── Assignment.jsx
│   ├── package.json
│   └── vite.config.js
├── README.md
├── CONTRIBUTING.md
├── LICENSE
└── run.bat
```

## 🧪 Testing

```bash
# Run backend tests
python test_solvers.py
```

## 🤝 Contributing

We welcome contributions! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on how to submit pull requests, report issues, and contribute to the project.

## 📄 License

This project is proprietary and confidential. All rights reserved.

**Copyright © 2025 CodeRafay**

Unauthorized copying, modification, distribution, or use of this software, via any medium, is strictly prohibited without explicit written permission from the owner. See the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**CodeRafay**

- GitHub: [@CodeRafay](https://github.com/CodeRafay)
-
- Repository: [operations-research-toolkit](https://github.com/CodeRafay/operations-research-toolkit)

## 🙏 Acknowledgments

- Built as part of Operations Research coursework (Semester 6)
- Special thanks to the OR community for algorithm references
- Inspired by the need for accessible optimization tools

## 📞 Support

For questions, issues, or feature requests, please open an issue on GitHub or contact the repository owner.

## 🗺️ Roadmap

- [ ] Add more optimization algorithms (Branch and Bound, Cutting Plane)
- [ ] Implement graphical method for 2-variable LP
- [ ] Add export functionality (PDF reports)
- [ ] Support for sensitivity analysis
- [ ] Mobile app version
- [ ] Multi-language support

---

**⭐ If you find this project useful, please consider giving it a star!**
