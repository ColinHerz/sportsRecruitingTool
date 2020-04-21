import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'Session.dart';
import 'dart:async';
import 'dart:convert';

class ViewMatch extends StatefulWidget{
  final String matchID;

  ViewMatch(this.matchID);

  _ViewMatch createState() => _ViewMatch(matchID);
}
enum choose{yes, no}
class _ViewMatch extends State<ViewMatch>{
  final String matchID;

  List<dynamic> subTotalScores = new List<String>();
  //List<String> golf = new List<String>();
  String bagID;
  String datePlayed;
  String matchName;
  String bagName;
  String course;
  int totalScore;
  List<Widget> displayMatch = new List<Widget>();
  final _scoreController = new TextEditingController();
  final _puttController = new TextEditingController();
  choose currVal1;
  choose currVal2;

  _ViewMatch(this.matchID);

  Future<void> getMatch() async {
    final http.Response _response = await http.get(
      'http://localhost3000.us-east-2.elasticbeanstalk.com/api/golf/getGolfMatch/$matchID',
      headers: headers,
    );

    if (_response.statusCode == 200) {
      var parsedJson = json.decode(_response.body);
      print(parsedJson);
      setState(() {
        matchName = parsedJson['nameOfRound'];
        datePlayed = parsedJson['datePlayed'];
        subTotalScores = parsedJson['subTotalScores'];
        totalScore = parsedJson['totalScore'];
        bagID = parsedJson['GolfBagUsed'];
        course = parsedJson['coursePlayed'];
      });
      //golf = parsedJson['golfMatch'];
      getBag(jsonEncode(<String, String>{
        'golfBag': bagID,
      }));
    }
    else {
      print(_response.statusCode);
      print(_response.body);
    }
  }
  Future<void> getBag(dynamic info) async {
    final http.Response _response = await http.post(
        'http://localhost3000.us-east-2.elasticbeanstalk.com/api/golf/getGolfBag',
        headers: headers,
        body: info
    );

    if (_response.statusCode == 200) {
      var parsedJson = json.decode(_response.body);
      setState(() {
        bagName = parsedJson['bagName'];
      });
    }
    else {
      print(_response.statusCode);
      print(_response.body);
    }
  }

  List<Widget> display(){
    displayMatch = new List<Widget>();

    displayMatch.add(Text("$matchName", style: largeStyle));
    displayMatch.add(Text("$course", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)));
    displayMatch.add(Padding(padding: EdgeInsets.fromLTRB(0, 0, 0, 10)));
    displayMatch.add(Text("Date Played: $datePlayed", style: TextStyle(fontSize: 20)));
    displayMatch.add(Padding(padding: EdgeInsets.fromLTRB(0, 0, 0, 10)));
    displayMatch.add(Text("Bag Used: $bagName", style: TextStyle(fontSize: 20)));
    displayMatch.add(Padding(padding: EdgeInsets.fromLTRB(0, 10, 0, 10)));
    if (subTotalScores.length == 0)
      displayMatch.add(Text("Total Score: 0", style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold)));
    else
      displayMatch.add(Text("Total Score: ", style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold)));

    displayMatch.add(Padding(padding: EdgeInsets.fromLTRB(0, 0, 0, 20)));
    displayMatch.add(Text("New Score", style: TextStyle(fontSize: 20)));

    displayMatch.add(TextField(
        controller: _scoreController,
        decoration: InputDecoration(
          border: OutlineInputBorder(),
          labelText: 'Score',
        )
    ));

    displayMatch.add(TextField(
        controller: _puttController,
        decoration: InputDecoration(
          border: OutlineInputBorder(),
          labelText: 'Number of Putts',
        )
    ));

    displayMatch.add(Text("Fairway Hit:", style: TextStyle(fontSize: 20)));

    displayMatch.add(
      ListTile(
        title: const Text('Yes'),
        leading: Radio(
          value: choose.yes,
          groupValue: currVal1,
          onChanged: (choose value) {
            setState(() { currVal1 = value; });
          },
        ),
      ),
    );
    displayMatch.add(
      ListTile(
        title: const Text('No'),
        leading: Radio(
          value: choose.no,
          groupValue: currVal1,
          onChanged: (choose value) {
            setState(() { currVal1 = value; });
          },
        ),
      ),
    );

    displayMatch.add(Text("Green in Regulation:", style: TextStyle(fontSize: 20)));

    displayMatch.add(
      ListTile(
        title: const Text('Yes'),
        leading: Radio(
          value: choose.yes,
          groupValue: currVal2,
          onChanged: (choose value) {
            setState(() { currVal2 = value; });
          },
        ),
      ),
    );
    displayMatch.add(
      ListTile(
        title: const Text('No'),
        leading: Radio(
          value: choose.no,
          groupValue: currVal2,
          onChanged: (choose value) {
            setState(() { currVal2 = value; });
          },
        ),
      ),
    );
    displayMatch.add(Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children: <Widget>[
        Center(child: ButtonTheme(
            child: RaisedButton(
              onPressed: (){
                Navigator.pop(context);
              },
              child: Text("Add score"),
            )
        )
        ),
        Center(child: RaisedButton(
            onPressed: (){
              Navigator.pop(context);
            },
            child: Text('Back')
        )
        )
      ],
    ));


    return displayMatch;
  }

  void initState(){
    super.initState();
    getMatch();
  }

  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('View Match'),
      ),
      body: ListView(
          children: display()
      ),
    );
  }
}
