from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User
from models.student import Student
from models.activity import Activity
from models.eq_trait import EQTrait

common_bp = Blueprint("common", __name__)

@common_bp.route("/students", methods=["GET"])
@jwt_required()
def get_students():
    identity = get_jwt_identity()
    username = identity.get("username")  # only if you stored a dict in JWT
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    teacher_id = user.id
    students = Student.query.filter_by(teacher_id=teacher_id).all()
    return jsonify([{"id": s.id, "name": s.name} for s in students])

@common_bp.route("/activities", methods=["GET"])
def get_activities():
    activities = Activity.query.all()
    return jsonify([{"id": a.activity_id, "name": a.name} for a in activities])

@common_bp.route("/eq_traits", methods=["GET"])
def get_eq_traits():
    traits = EQTrait.query.all()
    return jsonify([{"id": t.eq_trait_id, "name": t.name} for t in traits])
