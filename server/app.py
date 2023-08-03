from flask import Flask
import psycopg2

app = Flask(__name__)

# Connect to postgres DB
conn = psycopg2.connect("dbname=authappdb user=zack")

# Open a cursor to perform database operations
cur = conn.cursor()


@app.route("/users")
def add_user():
    cur.execute(
        "CREATE TABLE IF NOT EXISTS users (id serial PRIMARY KEY, name varchar, email varchar, password varchar);"
    )
    cur.execute(
        "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
        ("Adam", "adam@gmail.com", "mypAssw0rd"),
    )
    conn.commit()
    # user = cur.fetchone()[0]
    return "<p>User information added to the database successfully!</p>"


@app.route("/getusers")
def get_users():
    cur.execute("SELECT * FROM users;")
    users = cur.fetchall()
    return "<p>Users: {}</p>".format(users)
