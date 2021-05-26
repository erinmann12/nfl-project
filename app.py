import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template, request
from sklearn.linear_model import LogisticRegression
import pickle
import json

# #################################################
# # Database Setup
# #################################################
engine = create_engine("sqlite:///nfldata.sqlite")

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)
#print(Base.classes.keys())
# # Save reference to the tables
nfl = Base.classes.nfl
scores = Base.classes.scores
plays = Base.classes.plays

#################################################
# Flask Setup
#################################################
app = Flask(__name__)

#################################################
# Flask Routes
#################################################

# -------------------------------------------------------------------
# Web Pages
# -------------------------------------------------------------------
@app.route("/")
def home():

    return render_template("index.html")

@app.route("/results")
def results():
    
    return render_template("results.html")

@app.route("/form")
def form():
    return render_template("form.html")

@app.route("/thirddown")
def thirddown():
    return render_template("thirddown.html")

@app.route("/fourthdown")
def fourthdown():
    return render_template("fourthdown.html")

# -------------------------------------------------------------------
# API endpoint one
# -------------------------------------------------------------------
@app.route("/api/v1.0/nfl")
def nfl_data():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of nfl_data"""
    # Query all nfl_data
    results = session.query(nfl.GameId,nfl.GameDate,nfl.Quarter,nfl.Minute,nfl.Second,\
        nfl.OffenseTeam,nfl.DefenseTeam,nfl.Down,nfl.ToGo,nfl.YardLine,nfl.SeriesFirstDown,\
            nfl.NextScore,nfl.Description,nfl.TeamWin,nfl.SeasonYear,nfl.Yards,nfl.Formation,\
                nfl.PlayType,nfl.IsRush,nfl.IsPass,nfl.IsIncomplete,nfl.IsTouchdown,nfl.PassType,\
                    nfl.IsSack,nfl.IsChallenge,nfl.IsChallengeReversed,nfl.IsMeasurement,nfl.IsInterception,\
                        nfl.IsFumble,nfl.IsPenalty,nfl.IsTwoPointConversion,nfl.IsTwoPointConversionSuccessful,\
                            nfl.RushDirection,nfl.YardLineFixed,nfl.YardLineDirection,nfl.IsPenaltyAccepted,\
                                nfl.PenaltyTeam,nfl.IsNoPlay,nfl.PenaltyType,nfl.Yards).all()

    session.close()

    # Create a dictionary from the row data and append to a list
    nfl_info = []
    for GameId, GameDate, Quarter, Minute, Second, OffenseTeam, DefenseTeam, Down, ToGo, YardLine, SeriesFirstDown,\
        NextScore, Description,TeamWin, SeasonYear, Yards, Formation, PlayType, IsRush, IsPass, IsIncomplete, IsTouchdown,\
            PassType, IsSack, IsChallenge, IsChallengeReversed, IsMeasurement, IsInterception, IsFumble, IsPenalty, IsTwoPointConversion,\
                IsTwoPointConversionSuccessful, RushDirection, YardLineFixed, YardLineDirection, IsPenaltyAccepted, PenaltyTeam, IsNoPlay, PenaltyType, PenaltyYards in results:
        nfl_dict = {}
        nfl_dict["GameId"] = GameId
        nfl_dict["Quarter"] = Quarter
        nfl_dict["Minute"] = Minute
        nfl_dict["Second"] = Second
        nfl_dict["OffenseTeam"] = OffenseTeam
        nfl_dict["DefenseTeam"] = DefenseTeam
        nfl_dict["Down"] =  Down
        nfl_dict["ToGo"] = ToGo
        nfl_dict["YardLine"] = YardLine
        nfl_dict["SeriesFirstDown"]= SeriesFirstDown
        nfl_dict["NextScore"]= NextScore
        nfl_dict["Description"]= Description
        nfl_dict["TeamWin"]= TeamWin
        nfl_dict["SeasonYear"]= SeasonYear
        nfl_dict["Yards"]= Yards
        nfl_dict["Formation"]= Formation
        nfl_dict["PlayType"]= PlayType
        nfl_dict["IsRush"]= IsRush
        nfl_dict["IsPass"]= IsPass
        nfl_dict["IsIncomplete"]= IsIncomplete
        nfl_dict["IsTouchdown"]= IsTouchdown
        nfl_dict["PassType"]= PassType
        nfl_dict["IsSack"]= IsSack
        nfl_dict["IsChallenge"]= IsChallenge
        nfl_dict["IsChallengeReversed"]= IsChallengeReversed
        nfl_dict["IsMeasurement"]= IsMeasurement
        nfl_dict["IsInterception"]= IsInterception
        nfl_dict["IsFumble"]= IsFumble
        nfl_dict["IsPenalty"]= IsPenalty
        nfl_dict["IsTwoPointConversion"]= IsTwoPointConversion
        nfl_dict["IsTwoPointConversionSuccessful"]= IsTwoPointConversionSuccessful
        nfl_dict["RushDirection"]= RushDirection
        nfl_dict["YardLineFixed"]= YardLineFixed
        nfl_dict["YardLineDirection"]= YardLineDirection
        nfl_dict["IsPenaltyAccepted"]= IsPenaltyAccepted
        nfl_dict["PenaltyTeam"]= PenaltyTeam
        nfl_dict["IsNoPlay"]= IsNoPlay
        nfl_dict["PenaltyType"]= PenaltyType
        nfl_dict["PenaltyYards"]= PenaltyYards
        nfl_info.append(nfl_dict)

    return jsonify(nfl_info)

# -------------------------------------------------------------------
# API endpoint two
# -------------------------------------------------------------------
@app.route("/api/v1.0/scores")
def score_data():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of score_data"""
    # Query all nfl_data
    results = session.query(scores.Score, scores.PtsW, scores.PtsL, scores.PtTot,\
        scores.PtDif, scores.Winner, scores.Loser, scores.Date).all()
    
    session.close()

    # Create a dictionary from the row data and append to a list
    score_info = []
    for Score, PtsW, PtsL, PtTot, PtDif, Winner, Loser, Date in results:
        score_dict = {}
        score_dict["Score"] = Score
        score_dict["PtsW"] = PtsW
        score_dict["PtsL"] = PtsL
        score_dict["PtTot"] = PtTot
        score_dict["PtDif"] = PtDif
        score_dict["Winner"] = Winner
        score_dict["Loser"] = Loser
        score_dict["Date"] = Date
        score_info.append(score_dict)

    return jsonify(score_info)

# -------------------------------------------------------------------
# API endpoint three
# -------------------------------------------------------------------
@app.route("/api/v1.0/plays")
def play_data():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    play_df = pd.read_sql_query("SELECT * FROM plays", con=engine)
    grouped = play_df.groupby(['Quarter',"OffenseTeam"])
    plays_2019 = grouped.sum()
    session.close()

    return plays_2019.to_json(orient = "table")

# -------------------------------------------------------------------
# API endpoint fourth
# -------------------------------------------------------------------
@app.route("/api/v1.0/yardsgained")
def yards_data():
    # Create our session (link) from Python to the DB
    session = Session(engine)
    results = session.query(nfl.OffenseTeam,nfl.Down,nfl.ToGo,nfl.SeasonYear,nfl.Yards,nfl.Formation,\
                nfl.PlayType).all()
    session.close()
    yard_info = []
    for OffenseTeam,  Down, ToGo,  SeasonYear, Yards, Formation, PlayType in results:
        yard_dict = {}
        yard_dict["OffenseTeam"] = OffenseTeam
        yard_dict["Down"] =  Down
        yard_dict["ToGo"] = ToGo
        yard_dict["SeasonYear"]= SeasonYear
        yard_dict["Yards"]= Yards
        yard_dict["Formation"]= Formation
        yard_dict["PlayType"]= PlayType
        yard_info.append(yard_dict)
    return jsonify(yard_info)
# -------------------------------------------------------------------
# API endpoint for predictions
# -------------------------------------------------------------------
# # Query the database and send the jsonified results
@app.route("/predict", methods=["GET", "POST"])
def predict():

    session = Session(engine)
        
    post_data = request.get_json()
    print(post_data)

    if "quarter" in post_data: 
        quarter = float(post_data['quarter'])
        down = float(post_data['down'])
        points = float(post_data['points'])
        togo = float(post_data["togo"])
        fieldposition = post_data["fieldposition"]
        fieldposition2 = post_data["fieldposition2"]
        fieldposition3 = post_data["fieldposition3"]
        fieldposition4 = post_data["fieldposition4"]
        
        X = [[quarter, down, togo, fieldposition, fieldposition2, fieldposition3, fieldposition4, points,]]
        print(X)
        loaded_model = pickle.load(open("NFL_machine2.sav", 'rb'))
        predictions = loaded_model.predict(X)
        print(predictions)

    session.close()

    results = {
        "Status":"Ok",
        "predictions": predictions[0]
    }
    #return render_template("results.html", predictions=predictions)
    return jsonify(results)

if __name__ == '__main__':
    app.run(debug=True)