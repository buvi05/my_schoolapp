from flask import Flask, jsonify
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from flask_cors import CORS

from db import db
from config import Config

# Initialize Flask app
app = Flask(__name__)

# CORS config (adjust origin if needed)
CORS(app, origins=["http://localhost:5173"])
#CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True)

#CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}}, supports_credentials=True, methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

# Load app configuration
app.config.from_object(Config)

# Initialize DB and JWT
db.init_app(app)
jwt = JWTManager(app)
migrate = Migrate(app, db)

# Import models AFTER db is initialized
from models.user import User
from models.student import Student
from models.activity import Activity
from models.session import Session
from models.eq_trait import EQTrait

# Import and register blueprints
from routes.auth import auth_bp
from routes.students import student_bp
from routes.sessions import session_bp
from routes.dashboard import dashboard_bp
from routes.metadata import metadata_bp
from routes.common import common_bp

app.register_blueprint(auth_bp, url_prefix="/auth")
app.register_blueprint(student_bp, url_prefix="/students")
app.register_blueprint(session_bp, url_prefix="/sessions")
app.register_blueprint(dashboard_bp, url_prefix="/dashboard")
app.register_blueprint(metadata_bp, url_prefix="/meta")
app.register_blueprint(common_bp, url_prefix="/common")

# --- Dummy Routes Section ---

@app.route('/teachers', methods=['GET'])
@app.route('/teachers/', methods=['GET'])
def dummy_teachers():
    return jsonify([
        {"id": 1, "name": "Mr. Smith", "subject": "Math"},
        {"id": 2, "name": "Ms. Johnson", "subject": "English"}
    ])

@app.route('/parents', methods=['GET'])
@app.route('/parents/', methods=['GET'])
def dummy_parents():
    return jsonify([
        {"id": 1, "name": "Mrs. Taylor", "child": "Alice"},
        {"id": 2, "name": "Mr. Wilson", "child": "Bob"}
    ])

@app.route('/common/students', methods=['GET'])
@app.route('/common/students/', methods=['GET'])
def dummy_students():
    return jsonify([
        {"id": 1, "name": "Alice", "year": "1"},
        {"id": 2, "name": "Bob", "year": "2"}
    ])

# --- Root & Test ---

@app.route("/")
def home():
    return {"message": "School Tracker API Running!"}

@app.route("/api/test")
def test():
    return {"message": "API is working!"}

# --- Main Entry ---

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
