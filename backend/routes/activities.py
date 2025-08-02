# routes/activity_routes.py

from flask import Blueprint, jsonify
from models.activity import Activity
from extensions import db

activity_bp = Blueprint('activity_bp', __name__)

@activity_bp.route('/activities', methods=['GET'])
def get_activities():
    activities = Activity.query.all()
    return jsonify([{
        'id': a.id,
        'name': a.name,
        'description': a.description
    } for a in activities])
