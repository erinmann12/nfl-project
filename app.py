import pandas as pd

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify, render_template

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
# @app.route("/")
# def home():

#     return render_template("index.html")

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


if __name__ == '__main__':
    app.run(debug=True)