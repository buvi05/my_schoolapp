from db import db

class EQTrait(db.Model):
    __tablename__ = "eq_traits"
    eq_trait_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    # Optional: Add a field to hold a score or weight for the trait
    score = db.Column(db.Float, default=0.0)

    def __repr__(self):
        return f"<EQTrait {self.name} (Score: {self.score})>"

    # Example method to calculate or update score if needed
    def update_score(self, new_score):
        # You can implement logic to update score here
        self.score = new_score
