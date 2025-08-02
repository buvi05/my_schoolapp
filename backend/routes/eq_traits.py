# routes/eq_trait_routes.py

from flask import Blueprint, jsonify
from models.eq_trait import EQTrait
from extensions import db

eq_trait_bp = Blueprint('eq_trait_bp', __name__)

@eq_trait_bp.route('/eq_traits', methods=['GET'])
def get_eq_traits():
    eq_traits = EQTrait.query.all()
    return jsonify([{
        'id': eq.id,
        'name': eq.name,
        'description': eq.description
    } for eq in eq_traits])
