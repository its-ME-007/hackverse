import os
from flask import Flask
from flask_restful import Api
from dotenv import load_dotenv
from app.database import get_db  # Import the get_db function to access Supabase
from config import Config
from .routes.medicine import medicine_bp
from .routes.appointment import appointment_bp
from .routes.insurance import insurance_bp
from flask_cors import CORS

# Load environment variables from .env file
load_dotenv()

# Initialize the Flask application
def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for all routes
    
    # Load configuration from the Config class
    app.config.from_object(Config)

    # Initialize extensions
    db = get_db()  # Get the Supabase client

    # Register blueprints
    app.register_blueprint(medicine_bp, url_prefix='/api/medicines')
    app.register_blueprint(appointment_bp, url_prefix='/api/appointments')
    app.register_blueprint(insurance_bp, url_prefix='/api/insurance')
 
    return app
