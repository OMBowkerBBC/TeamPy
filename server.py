from os import curdir
from flask import Flask, render_template
import sqlite3, json

app = Flask(__name__)

@app.route("/", methods=["GET"])
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/quizStart", methods=["GET"])
def quiz_start():
    return render_template("quizStart.html")

@app.route("/startquiz", methods=["GET"])
def start_quiz():
    with open('testQuiz.json', 'r') as file:
        data = json.loads(file.read())
        conn = sqlite3.connect("db.db")
        cursor = conn.cursor()
        cursor.execute("INSERT INTO QUIZ (CATEGORY, QUESTION_TYPE, DIFFICULTY) VALUES (?, ?, ?)", (data['category'], data['type'], data['difficulty']))
        conn.commit()
        cursor.close()
        conn.close()

    return "Starting Quiz"

@app.route("/quizEnd", methods=["GET"])
def quiz_end():
    with open("testScoreboard.json", 'r') as file:
        scoreboard = json.loads(file.read())
    temporary_data = { "name": "Oli", "score": 4 }
    return render_template("quizEnd.html", player_info = temporary_data, scoreboard = scoreboard)

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=6789)