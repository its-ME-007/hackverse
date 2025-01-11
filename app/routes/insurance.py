from flask import Blueprint, jsonify, request
from app.models import Insurance, User
from app.database import db_session
from app.utils import validate_datetime

insurance_bp = Blueprint("insurance", __name__)

@insurance_bp.route('', methods=['GET'])
def list_insurances():
    insurances = Insurance.query.all()
    return jsonify([insurance.to_dict() for insurance in insurances])

@insurance_bp.route('/search', methods=['GET'])
def search_insurances():
    query = request.args.get('query')
    insurances = Insurance.query.filter(Insurance.name.contains(query)).all()
    return jsonify([insurance.to_dict() for insurance in insurances])

@insurance_bp.route('/buy', methods=['POST'])
def buy_insurance():
    data = request.json
    user_id = data.get('user_id')
    insurance_id = data.get('insurance_id')
    quantity = data.get('quantity')

    # Fetch user and insurance details
    user = User.query.get(user_id)
    insurance = Insurance.query.get(insurance_id)

    if not user or not insurance:
        return jsonify({"error": "Invalid user or insurance ID"}), 400

    # Calculate total price and discount
    total_price = insurance.price * quantity
    discount = min(user.points, total_price)  # change the algo
    final_price = total_price - discount

    # Deduct points and finalize transaction
    user.points -= int(discount / 0.00001)
    db_session.commit()

    return jsonify({
        "message": "Purchase successful",
        "insurance_id": insurance_id,
        "total_price": total_price,
        "discount": discount,
        "final_price": final_price,
    })

