from db import db

class Activity(db.Model):
    __tablename__ = "activities"
    activity_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    calories_per_min = db.Column(db.Float, nullable=False)
    score = db.Column(db.Integer)

    def __repr__(self):
        return f"<Activity {self.name} ({self.calories_per_min} cal/min)>"