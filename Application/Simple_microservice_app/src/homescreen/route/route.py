from flask import Blueprint
from controller.home import home

# Create a Blueprint for user routes
user_bp = Blueprint('user_bp', __name__)

# Define route
user_bp.add_url_rule("/", "home", home)
