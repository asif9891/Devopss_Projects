from flask import render_template
from config.mysqlconnector import db

def home():
    cursor = db.cursor(dictionary=True)  # get rows as dict
    cursor.execute("SELECT * FROM users where username='asif'")
    users = cursor.fetchall()

    # Print in console
    for user in users:
        print(user)

    # Render HTML template
    return render_template("home.html", users=users)
