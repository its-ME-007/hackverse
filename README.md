# MediHelp - Healthcare Services Platform

MediHelp is a comprehensive healthcare services platform that connects users with medical services, including medicine delivery, appointment scheduling, insurance plans, and direct communication with healthcare professionals.

## Features

- **Medicine Management**
  - Search and purchase medicines
  - View detailed medicine information
  - Track order status
  - Secure checkout process

- **Appointment Scheduling**
  - Book appointments with healthcare professionals
  - View and manage appointments
  - Real-time availability checking
  - Appointment reminders

- **Insurance Services**
  - Browse insurance plans
  - Compare coverage options
  - Purchase insurance policies
  - Manage claims

- **Chat with Pharmacist**
  - Real-time chat with qualified pharmacists
  - Get expert medical advice
  - Discuss prescriptions and medications
  - 24/7 support availability

## Tech Stack

### Frontend
- React.js
- Material-UI (MUI)
- React Router
- Axios for API calls

### Backend
- Python
- Flask
- Flask-RESTful
- Flask-CORS
- Supabase for database

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- Python (v3.8 or higher)
- pip (Python package manager)
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/medihelp.git
cd medihelp
```

2. Set up the backend
```bash
# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials
```

3. Set up the frontend
```bash
cd frontend
npm install
```

### Running the Application

1. Start the backend server
```bash
# From the root directory
python run.py
```

2. Start the frontend development server
```bash
# From the frontend directory
cd frontend
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure

```
medihelp/
├── app/
│   ├── __init__.py
│   ├── routes/
│   │   ├── medicine.py
│   │   ├── appointment.py
│   │   └── insurance.py
│   ├── templates/
│   └── chatapp.py
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       ├── App.js
│       └── theme.js
├── .env
├── run.py
└── requirements.txt
```

## API Endpoints

### Medicines
- `GET /api/medicines` - List all medicines
- `GET /api/medicines/search` - Search medicines
- `POST /api/medicines/cart` - Add to cart

### Appointments
- `GET /api/appointments` - List appointments
- `POST /api/appointments` - Create appointment
- `PUT /api/appointments/<id>` - Update appointment

### Insurance
- `GET /api/insurance` - List insurance plans
- `POST /api/insurance/buy` - Purchase insurance
- `GET /api/insurance/search` - Search insurance plans

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
GROCLAKE_API_KEY=your_groclake_api_key
GROCLAKE_ACCOUNT_ID=your_groclake_account_id
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the beautiful components
- Supabase for the backend infrastructure
- Flask for the robust API framework

## Contact

Your Name - anirudh007kulkarni@gmail.com

Project Link: [(https://github.com/its-ME-007/hackverse)](https://github.com/its-ME-007/hackverse)
