from db import db
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    role = db.Column(db.String(20), nullable=False, default='parent')  # 'admin', 'teacher', 'parent'

    # Relationships
    teacher_students = db.relationship(
        'Student',
        back_populates='teacher',
        foreign_keys='Student.teacher_id',
        lazy=True
    )

    parent_students = db.relationship(
        'Student',
        back_populates='parent',
        foreign_keys='Student.parent_id',
        lazy=True
    )

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username} ({self.role})>'
