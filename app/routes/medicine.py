from flask import Blueprint, jsonify, request
from app.models import Medicine, User
from app.database import db_session

medicine_bp = Blueprint('medicine', __name__)

@medicine_bp.route('', methods=['GET'])
def list_medicines():
    medicines = Medicine.query.all()
    return jsonify([medicine.to_dict() for medicine in medicines])

@medicine_bp.route('/search', methods=['GET'])
def search_medicines():
    query = request.args.get('query')
    medicines = Medicine.query.filter(Medicine.name.contains(query)).all()
    return jsonify([medicine.to_dict() for medicine in medicines])

@medicine_bp.route('/buy', methods=['POST'])
def buy_medicine():
    data = request.json
    user_id = data.get('user_id')
    medicine_id = data.get('medicine_id')
    quantity = data.get('quantity')

    # Fetch user and medicine details
    user = User.query.get(user_id)
    medicine = Medicine.query.get(medicine_id)

    if not user or not medicine:
        return jsonify({"error": "Invalid user or medicine ID"}), 400

    # Calculate total price and discount
    total_price = medicine.price * quantity
    discount = min(user.points,total_price)  # change the algo
    final_price = total_price - discount

    # Deduct points and finalize transaction
    user.points -= int(discount / 0.00001)
    db_session.commit()

    return jsonify({
        "message": "Purchase successful",
        "medicine_id": medicine_id,
        "total_price": total_price,
        "discount": discount,
        "final_price": final_price,
    
    })
