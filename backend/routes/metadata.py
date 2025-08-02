from flask import Blueprint, jsonify
from models.activity import Activity
from models.eq_trait import EQTrait
from db import db

metadata_bp = Blueprint("metadata", __name__)

@metadata_bp.route("/activities", methods=["GET"])
def get_activities():
    activities = Activity.query.all()
    result = [{"id": a.activity_id, "name": a.name, "score": a.score} for a in activities]
    return jsonify(result)

@metadata_bp.route("/eq_traits", methods=["GET"])
def get_eq_traits():
    traits = EQTrait.query.all()
    result = [{"id": t.eq_trait_id, "name": t.name} for t in traits]
    return jsonify(result)
