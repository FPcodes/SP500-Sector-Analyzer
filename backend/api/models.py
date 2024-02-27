from . import db

class SP500_Realtime_Data(db.Model):
    __tablename__ = "SP500_Realtime_Data"
    id = db.Column(db.Integer, primary_key=True)
    ticker = db.Column(db.String(255))
    company = db.Column(db.String(255))
    sector = db.Column(db.String(255))
    market_cap = db.Column(db.String(255))
    date = db.Column(db.Date)
    weekly_open = db.Column(db.Integer)
    weekly_close = db.Column(db.Integer)
    weekly_percentage = db.Column(db.Integer)
    weekly_volume = db.Column(db.Integer)

    def serialize(self):
        return {
            'id': self.id,
            'ticker': self.ticker,
            'company': self.company,
            'sector': self.sector,
            'market_cap': self.market_cap,
            'date': self.date.isoformat() if self.date else None,
            'weekly_open': self.weekly_open,
            'weekly_close': self.weekly_close,
            'weekly_percentage': self.weekly_percentage,
            'weekly_volume': self.weekly_volume
        }
