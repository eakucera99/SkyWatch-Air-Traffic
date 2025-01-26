from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from routes import routes

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://elizabethkucera:Halley2022@localhost/air_traffic_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
with app.app_context():
    db.create_all()
migrate = Migrate(app, db)

app.register_blueprint(routes)

if __name__ == "__main__":
    app.run(debug=True)
