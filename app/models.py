from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    metamask_id = Column(String(50), default=0)  # Points for discounts
    phone = Column(String(10), nullable=False)

    appointments = relationship('Appointment', back_populates='user')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone" : self.phone,
            "metamaskid": self.metamask_id
        }

class Medicine(Base):
    __tablename__ = 'medicines'

    id = Column(Integer, primary_key=True)
    name = Column(String(100), nullable=False)
    description = Column(String(500), nullable=True)
    price = Column(Float, nullable=False)  # Price per unit
    stock = Column(Integer, nullable=False)  # Stock quantity

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "price": self.price,
            "stock": self.stock
        }

class Appointment(Base):
    __tablename__ = 'appointments'

    id = Column(Integer, primary_key=True)
    patient_name = Column(String(100), nullable=False)
    datetime = Column(DateTime, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)

    user = relationship('User', back_populates='appointments')
    def to_dict(self):
        return {
            "id": self.id,
            "patient_name": self.patient_name,
            "datetime": self.datetime.isoformat(),
            "user_id": self.user_id
        }

class Insurance(Base):
    __tablename__ = 'insurance policies' 
    id = Column(Integer, primary_key=True)
    insurance_provider_name = Column(String(100), nullable=False)
    insurance_policy_name = Column(String(100), nullable =False)
    insurance_policy_price = Column(Float, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "insurance_provider_name": self.insurance_provider_name,
            "insurance_policy_price": self.insurance_policy_price
        }