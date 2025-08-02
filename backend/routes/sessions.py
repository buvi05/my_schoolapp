from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.session import Session
from models.student import Student
from models.user import User
from db import db
#from app import app

session_bp = Blueprint("sessions", __name__)

@session_bp.route("/teacher", methods=["GET","POST", "OPTIONS"])
@jwt_required()
def get_teacher_sessions():
    if request.method == "OPTIONS":
        return "", 200  # respond OK to preflight

    identity = get_jwt_identity()  # get user info from JWT

    # Adjust according to your JWT identity structure:
    username = identity.get("username")
    user = User.query.filter_by(username=username).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    teacher_id = user.id

    # Join Session and Student to filter sessions of students assigned to this teacher
    sessions = (
        db.session.query(Session, Student)
        .join(Student, Session.student_id == Student.id)
        .filter(Student.teacher_id == teacher_id)
        .all()
    )

    response = []
    for session, student in sessions:
        session_date = session.date.strftime("%Y-%m-%d") if session.date else None
        response.append({
            "id": session.id,
            "student_name": student.name,
            "activity_name": session.activity.name if session.activity else "Unknown",
            "eq_trait_name": session.eq_trait.name if session.eq_trait else None,
            "duration": session.duration,
            "date": session_date,
        })

    return jsonify(response)
