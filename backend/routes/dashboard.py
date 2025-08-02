from flask import Blueprint, jsonify, request
from flask_jwt_extended import get_jwt_identity
from models.session import Session
from models.student import Student
from models.user import User
from utils.helpers import calculate_progress
from utils.decorators import role_required
from extensions import db

dashboard_bp = Blueprint("dashboard", __name__)

@dashboard_bp.route("/overview", methods=["GET"])
@role_required("teacher")
def overview():
    sessions = Session.query.all()
    total_minutes = sum(s.duration for s in sessions)
    status = calculate_progress(total_minutes)
    return jsonify({
        "total_minutes": total_minutes,
        "status": status,
        "chartData": [{"name": "Minutes", "value": total_minutes}]
    })

@dashboard_bp.route("/teacher/students", methods=["GET"])
@role_required("teacher")
def get_teacher_students():
    current_user = get_jwt_identity()
    teacher_username = current_user["username"]

    teacher = User.query.filter_by(username=teacher_username).first()
    if not teacher:
        return jsonify({"error": "Teacher not found"}), 404

    students = Student.query.filter_by(teacher_id=teacher.id).all()
    result = [{"id": s.id, "name": s.name} for s in students]

    return jsonify(result), 200

@dashboard_bp.route("/teacher/sessions", methods=["POST"])
@role_required("teacher")
def add_session():
    data = request.get_json()
    student_id = data.get("student_id")
    activity_id = data.get("activity_id")
    duration = data.get("duration")
    eq_trait_id = data.get("eq_trait_id")  # Optional

    # Validate required fields
    if not student_id or not activity_id or not duration:
        return jsonify({"error": "Missing required fields"}), 400

    new_session = Session(
        student_id=student_id,
        activity_id=activity_id,
        duration=duration,
        eq_trait_id=eq_trait_id  # Optional
    )
    db.session.add(new_session)
    db.session.commit()

    return jsonify({"message": "Session added successfully"}), 201

@dashboard_bp.route("/teacher/student_sessions/<int:student_id>", methods=["GET"])
@role_required("teacher")
def get_student_sessions(student_id):
    sessions = Session.query.filter_by(student_id=student_id).all()
    result = [{
        "id": s.id,
        "activity": s.activity.name if s.activity else "Unknown",
        "eq_trait": s.eq_trait.name if s.eq_trait else None,
        "duration": s.duration,
        "calories_burned": s.calories_burned
    } for s in sessions]

    return jsonify(result), 200
@dashboard_bp.route("/teacher/sessions/<int:session_id>", methods=["DELETE"])
@role_required("teacher")
def delete_session(session_id):
    session = Session.query.get(session_id)
    if not session:
        return jsonify({"error": "Session not found"}), 404

    db.session.delete(session)
    db.session.commit()
    return jsonify({"message": "Session deleted successfully"}), 200
