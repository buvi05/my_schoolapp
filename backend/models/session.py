from db import db
from datetime import date

class Session(db.Model):
    __tablename__ = "sessions"
    id = db.Column(db.Integer, primary_key=True)
    student_id = db.Column(db.Integer, db.ForeignKey("students.id"), nullable=False)
    activity_id = db.Column(db.Integer, db.ForeignKey("activities.activity_id"), nullable=False)
    duration = db.Column(db.Integer, nullable=False)  # in minutes
    eq_trait_id = db.Column(db.Integer, db.ForeignKey("eq_traits.eq_trait_id"), nullable=True)
    date = db.Column(db.Date, nullable=False)  # <-- Added date column

    activity = db.relationship("Activity", backref="sessions")
    eq_trait = db.relationship("EQTrait", backref="sessions")

    def __repr__(self):
        return f"<Session Student {self.student_id}, Activity {self.activity_id}, Duration {self.duration}, Date {self.date}>"

    @property
    def calories_burned(self):
        """Calculate calories burned during this session."""
        if self.activity and self.activity.calories_per_min:
            return self.duration * self.activity.calories_per_min
        return 0
