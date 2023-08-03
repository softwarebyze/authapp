from flask import Flask, request, jsonify
from flask_cors import cross_origin
import psycopg2

app = Flask(__name__)

DB_NAME = "authappdb"
DB_USER = "zack"


# Function to create a database connection and cursor
def get_database_connection():
    return psycopg2.connect(dbname=DB_NAME, user=DB_USER)


def is_email_available(email):
    # Create a new connection and cursor for each request
    conn = get_database_connection()
    cur = conn.cursor()

    cur.execute("SELECT email FROM users WHERE email = %s", (email,))
    users = cur.fetchall()

    cur.close()
    conn.close()

    return not bool(users)


@app.get("/users")
def get_users():
    # Create a new connection and cursor for each request
    conn = get_database_connection()
    cur = conn.cursor()

    cur.execute("SELECT * FROM users;")
    users = cur.fetchall()

    cur.close()
    conn.close()

    return "<p>Users: {}</p>".format(users)


@app.post("/register")
@cross_origin()
def register():
    # Get data from request body
    data = request.get_json()
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    # Check if the email is available for registration
    if not is_email_available(email):
        response = {"status": "error", "message": "Email already exists."}
        return jsonify(response)

    # Create a new connection and cursor for each request
    conn = get_database_connection()
    cur = conn.cursor()

    try:
        cur.execute(
            "CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY, name varchar, email varchar, password varchar);"
        )
        # Add user to table
        cur.execute(
            "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
            (name, email, password),
        )
        conn.commit()

        response = {
            "status": "success",
            "message": "Your account has been created.",
        }

    except Exception as e:
        # If any error occurs during the database operation, rollback the transaction
        conn.rollback()
        response = {"status": "error", "message": "Error registering user: " + str(e)}

    finally:
        cur.close()
        conn.close()

    return jsonify(response)


@app.post("/check-email")
@cross_origin()
def check_email():
    # Get data from request body
    data = request.get_json()
    email = data.get("email")

    try:
        # Check if the email is available for registration
        if not is_email_available(email):
            response = {"status": "success", "message": "Email already exists."}
        else:
            response = {
                "status": "success",
                "message": "Email is available for registration.",
            }

    except Exception as e:
        response = {
            "status": "error",
            "message": "Error checking if email is used: " + str(e),
        }

    return jsonify(response)


@app.post("/login")
@cross_origin()
def login():
    # Get data from request body
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    # Create a new connection and cursor for each request
    conn = get_database_connection()
    cur = conn.cursor()

    try:
        # Retrieve user data from the database based on the provided email
        cur.execute("SELECT * FROM users WHERE email = %s", (email,))
        user_data = cur.fetchone()

        if user_data:
            # If the email exists, check if the provided password matches the one in the database
            user_id, name, db_email, db_password = user_data

            if password == db_password:
                # Passwords match, login successful
                response = {
                    "status": "success",
                    "message": "Login successful.",
                    "user_id": user_id,
                }
            else:
                # Passwords do not match, login failed
                response = {"status": "error", "message": "Incorrect password."}
        else:
            # Email not found in the database, login failed
            response = {"status": "error", "message": "Email not registered."}

    except Exception as e:
        response = {"status": "error", "message": "Error during login: " + str(e)}

    finally:
        cur.close()
        conn.close()

    return jsonify(response)
