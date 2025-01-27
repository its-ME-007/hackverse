from flask import Blueprint, jsonify, request
from app.database import get_db
from app.cart import shared_cart
medicine_bp = Blueprint('medicine', __name__)

@medicine_bp.route('', methods=['GET'])
def list_medicines():
    supabase = get_db()
    response = supabase.table('medicines').select('*').execute()
    return jsonify(response.data)

@medicine_bp.route('/search', methods=['GET'])
def search_medicines():
    query = request.args.get('query')
    supabase = get_db()
    response = supabase.table('medicines').select('*').ilike('name', f'%{query}%').execute()
    return jsonify(response.data)

@medicine_bp.route('/buy', methods=['POST'])
def buy_medicine():
    data = request.json
    user_id = data.get('user_id')
    medicine_id = data.get('medicine_id')
    quantity = data.get('quantity')

    # Fetch user and medicine details
    supabase = get_db()
    user_response = supabase.table('users').select('*').eq('id', user_id).execute()
    medicine_response = supabase.table('medicines').select('*').eq('id', medicine_id).execute()

    user = user_response.data[0] if user_response.data else None
    medicine = medicine_response.data[0] if medicine_response.data else None

    if not user or not medicine:
        return jsonify({"error": "Invalid user or medicine ID"}), 400

    # Calculate total price and discount
    total_price = medicine['price'] * quantity
    discount = min(user['points'], total_price)
    final_price = total_price - discount

    # Deduct points and finalize transaction
    new_points = user['points'] - int(discount / 0.00001)
    supabase.table('users').update({"points": new_points}).eq('id', user_id).execute()

    # Update medicine stock
    new_stock = medicine['stock'] - quantity
    supabase.table('medicines').update({"stock": new_stock}).eq('id', medicine_id).execute()

    cart_item = {
        "user_id": user_id,
        "medicine_id": medicine_id,
        "total_price": total_price,
        "discount": discount,
        "final_price": final_price,
        "name": medicine_response['name']
    }
    shared_cart.items.append(cart_item)
    return jsonify({
        "message": "Purchase successful",
        "medicine_id": medicine_id,
        "total_price": total_price,
        "discount": discount,
        "final_price": final_price,
    })

@medicine_bp.route('/update/<int:medicine_id>', methods=['PUT'])
def update_medicine(medicine_id):
    data = request.json
    name = data.get('name')
    description = data.get('description')
    price = data.get('price')
    stock = data.get('stock')

    # Fetch existing medicine details
    supabase = get_db()
    medicine_response = supabase.table('medicines').select('*').eq('id', medicine_id).execute()
    medicine = medicine_response.data[0] if medicine_response.data else None

    if not medicine:
        return jsonify({"error": "Invalid medicine ID"}), 400

    # Update medicine details
    update_data = {}
    if name is not None:
        update_data['name'] = name
    if description is not None:
        update_data['description'] = description
    if price is not None:
        update_data['price'] = price
    if stock is not None:
        update_data['stock'] = stock

    supabase.table('medicines').update(update_data).eq('id', medicine_id).execute()

    return jsonify({"message": "Medicine updated successfully"}), 200
