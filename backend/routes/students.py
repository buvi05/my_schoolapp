from flask import Blueprint, request, jsonify
from models.student import Student
from db import db
from utils.decorators import role_required

student_bp = Blueprint("students", __name__)

# Get all students - accessible to teachers
@student_bp.route("/", methods=["GET"])
@role_required("teacher")
def get_students():
    students = Student.query.all()
    return jsonify([
        {
            "id": s.id,
            "name": s.name,
            "year_level": s.year_level,
            "age": s.age,
            "gender": s.gender,
            "ethnicity": s.ethnicity,
            "phone": s.phone,
            "address": s.address,
            "height": s.height,
            "teacher_id": s.teacher_id,
            "parent_id": s.parent_id
        } for s in students
    ])

# Create a new student - accessible to admins
@student_bp.route("/", methods=["POST"])
@role_required("admin")
def add_student():
    data = request.json
    if not data.get("name") or not data.get("year_level"):
        return jsonify({"error": "Missing required fields: name and year_level"}), 400

    student = Student(
        name=data["name"],
        year_level=data["year_level"],
        age=data.get("age"),
        gender=data.get("gender"),
        ethnicity=data.get("ethnicity"),
        phone=data.get("phone"),
        address=data.get("address"),
        height=data.get("height"),
        teacher_id=data.get("teacher_id"),
        parent_id=data.get("parent_id")
    )
    try:
        db.session.add(student)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Failed to add student", "details": str(e)}), 500

    return jsonify({
        "message": "Student added",
        "student": {
            "id": student.id,
            "name": student.name,
            "year_level": student.year_level,
            "age": student.age,
            "gender": student.gender,
            "ethnicity": student.ethnicity,
            "phone": student.phone,
            "address": student.address,
            "height": student.height,
            "teacher_id": student.teacher_id,
            "parent_id": student.parent_id
        }
    }), 201
