from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Api
from flask_jwt_extended import JWTManager
# JWT is yet to be implemneted in this project
from .routes.medicine import medicine_bp
from .routes.appointment import appointment_bp
from .routes.insurance import insurance_bp
# Initialize SQLAlchemy
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # Configuration settings
    app.config['SQLALCHEMY_DATABASE_URI'] = (
        "postgresql://<username>:<password>@<host>:<port>/<database_name>"
    )
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'  # Replace with a strong secret key
    
    # Initialize extensions
    db.init_app(app)
    jwt = JWTManager(app)
    api = Api(app)
    
    # Register blueprints
    app.register_blueprint(medicine_bp, url_prefix='/api/medicines')
    app.register_blueprint(appointment_bp, url_prefix='/api/appointments')
    app.register_blueprint(insurance_bp,url_prefix = '/api/insurance')
    # Create database tables if they don't exist
    # with app.app_context():
    #    db.create_all()

    return app
