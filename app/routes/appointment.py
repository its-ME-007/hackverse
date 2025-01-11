from flask import Blueprint, jsonify, request
from app.models import Appointment, User
from app.database import db_session
from app.utils import validate_datetime

appointment_bp = Blueprint('appointment', __name__)

@appointment_bp.route('', methods=['GET'])
def list_appointments():
    appointments = Appointment.query.all()
    return jsonify([appointment.to_dict() for appointment in appointments])

@appointment_bp.route('/book', methods=['POST'])
def book_appointment():
    data = request.json
    user_id = data.get('user_id')
    patient_name = data.get('patient_name')
    datetime = data.get('datetime')

    # Validate input
    if not validate_datetime(datetime):
        return jsonify({"error": "Invalid datetime format"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    # Calculate appointment cost and apply points discount
    base_price = 500  # Assume a fixed price for appointments
    discount = min(user.points * 0.01, base_price)  # 1 point = 1% discount
    final_price = base_price - discount

    # Deduct points and save appointment
    user.points -= int(discount / 0.01)
    appointment = Appointment(patient_name=patient_name, datetime=datetime, user_id=user_id)
    db_session.add(appointment)
    db_session.commit()

    return jsonify({
        "message": "Appointment booked successfully",
        "appointment_id": appointment.id,
        "base_price": base_price,
        "discount": discount,
        "final_price": final_price,
    })

@appointment_bp.route('/cancel', methods=['DELETE'])
def cancel_appointment():
    appointment_id = request.args.get('appointment_id')
    appointment = Appointment.query.get(appointment_id)
    if not appointment:
        return jsonify({"error": "Appointment not found"}), 404
    db_session.delete(appointment)
    db_session.commit()
    return jsonify({"message": "Appointment cancelled successfully"})
