from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from flask_cors import cross_origin
from models.user import User
from db import db

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST", "OPTIONS"])
@cross_origin(origins="http://16.176.172.125:5173")
def register():
    if request.method == "OPTIONS":
        # Allow preflight request
        return "", 200

    data = request.json
    if not data or not data.get("username") or not data.get("password") or not data.get("role"):
        return jsonify({"message": "Missing required fields"}), 400

    # Check if user already exists
    existing_user = User.query.filter_by(username=data["username"]).first()
    if existing_user:
        return jsonify({"message": "User already exists"}), 409

    hashed_password = generate_password_hash(data["password"])
    user = User(username=data["username"], password_hash=hashed_password, role=data["role"])
    db.session.add(user)
    db.session.commit()
    return jsonify({"message": "User registered successfully"}), 201

@auth_bp.route("/login", methods=["POST", "OPTIONS"])
@cross_origin(origins="http://localhost:5173")
def login():
    if request.method == "OPTIONS":
        # Respond OK to preflight request
        return "", 200

    data = request.json
    if not data or not data.get("username") or not data.get("password"):
        return jsonify({"message": "Missing username or password"}), 400

    user = User.query.filter_by(username=data["username"]).first()
    if user and check_password_hash(user.password_hash, data["password"]):
        token = create_access_token(identity={"username": user.username, "role": user.role})
        return jsonify({"token": token, "role": user.role}), 200

    return jsonify({"message": "Invalid credentials"}), 401
