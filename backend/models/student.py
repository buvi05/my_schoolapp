from db import db

class Student(db.Model):
    __tablename__ = 'students'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    year_level = db.Column(db.Integer, nullable=False)  # Year 0 to 13
    age = db.Column(db.Integer)
    gender = db.Column(db.String(10))

    # New fields
    ethnicity = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    address = db.Column(db.String(200))
    height = db.Column(db.Float)

    teacher_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    parent_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    teacher = db.relationship('User', back_populates='teacher_students', foreign_keys=[teacher_id])
    parent = db.relationship('User', back_populates='parent_students', foreign_keys=[parent_id])

    def __repr__(self):
        return f"<Student {self.name}, Year {self.year_level}>"