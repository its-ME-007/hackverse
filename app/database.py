from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, scoped_session
from app.models import User, Medicine, Appointment  # Import models to register them
from config import Config  # Import the Config class

# Create the database engine using the URI from the Config class
engine = create_engine(
    Config.SQLALCHEMY_DATABASE_URI,
    connect_args={"check_same_thread": False} if "sqlite" in Config.SQLALCHEMY_DATABASE_URI else {},
    echo=True  # Set to True for debugging SQL queries, False for production
)

# Create a scoped session for thread safety
SessionLocal = scoped_session(sessionmaker(autocommit=False, autoflush=False, bind=engine))

# Define the declarative base for the ORM models
Base = declarative_base()

def init_db():
    """
    Initialize the database by creating all the tables defined in the models.
    This should be called at the start of the application or during setup.
    """
    Base.metadata.create_all(bind=engine)

def get_db():
    """
    Dependency to provide a database session.
    Use in routes or services to manage database operations.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
