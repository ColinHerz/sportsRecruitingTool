import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'Session.dart';
import 'dart:convert';
import 'dart:async';

class ViewBag extends StatefulWidget{
  final String bagID;

  ViewBag(this.bagID);

  _ViewBag createState() => _ViewBag(bagID);
}

class _ViewBag extends State<ViewBag>{
  final String bagID;
  // ignore: non_constant_identifier_names
  final String WOOD = "Wood";
  // ignore: non_constant_identifier_names
  final String IRON = "Iron";
  // ignore: non_constant_identifier_names
  final String WEDGE = "Wedge";
  // ignore: non_constant_identifier_names
  final String PUTTER = "Putter";
  // ignore: non_constant_identifier_names
  final String WOOD2 = "1";
  // ignore: non_constant_identifier_names
  final String IRON2 = "2";
  // ignore: non_constant_identifier_names
  final String WEDGE2 = "3";
  // ignore: non_constant_identifier_names
  final String PUTTER2 = "4";
  String bagName;
  List<Widget> display = new List<Widget>();
  List<String> clubNames = new List<String>();
  List<String> clubIDs = new List<String>();
  List<int> clubTypes = new List<int>();
  final _clubNameController = new TextEditingController();
  String _clubType;
  String _clubType2 = "Wood";

  _ViewBag(this.bagID);

  String determineClubType2() {
    switch(_clubType2)
    {
      case "Wood":
        return WOOD2;

      case "Iron":
        return IRON2;

      case "Wedge":
        return WEDGE2;

      case "Putter":
        return PUTTER2;
    }
  }
  String determineClubType(int _clubType) {

    switch(_clubType)
    {
      case 1:
        return WOOD;

      case 2:
        return IRON;

      case 3:
        return WEDGE;

      case 4:
        return PUTTER;
    }
  }

  Future<void> getBag(dynamic info) async {
    List<dynamic> clubResponse = new List<dynamic>();
    final http.Response _response = await http.post(
      'http://localhost3000.us-east-2.elasticbeanstalk.com/api/golf/getGolfBag',
      headers: headers,
      body: info
    );

    if (_response.statusCode == 200) {
      var parsedJson = json.decode(_response.body);
      clubResponse = parsedJson['golfClub'];
      setState(() {
        bagName = parsedJson['bagName'];
        for (int i = 0; i < clubResponse.length; i++) {
          clubNames.add(clubResponse[i]['clubName']);
          clubIDs.add(clubResponse[i]['_id']);
          clubTypes.add(clubResponse[i]['clubType']);
        }
      });
    }
    else {
      print(_response.statusCode);
      print(_response.body);
    }
  }
  Future<void> addClub(dynamic info) async {
    final http.Response _response = await http.post(
        'http://localhost3000.us-east-2.elasticbeanstalk.com/api/golf/createGolfclub',
        headers: headers,
        body: info
    );

    if (_response.statusCode == 200) {

    }
    else {
      print(_response.statusCode);
      print(_response.body);
    }
  }
  Future<void> deleteClub(dynamic info) async {
    final http.Response _response = await http.post(
        'http://localhost3000.us-east-2.elasticbeanstalk.com/api/golf/deleteGolfclub',
        headers: headers,
        body: info
    );

    if (_response.statusCode == 200) {
    }
    else {
      print(_response.statusCode);
      print(_response.body);
    }
  }
  Future<void> deleteBag(dynamic info) async {
    final http.Response _response = await http.post(
        'http://localhost3000.us-east-2.elasticbeanstalk.com/api/golf/deleteGolfBag',
        headers: headers,
        body: info
    );

    if (_response.statusCode == 200) {
      Navigator.pop(context);
    }
    else {
      print(_response.statusCode);
      print(_response.body);
    }
  }

  List<Widget> displayClubs(){
    display = new List<Widget>();

    display.add(Padding(
        padding: EdgeInsets.fromLTRB(0, 0, 0, 10),
        child: Text("$bagName", style: largeStyle)
    ));

    display.add(Text("Clubs in this bag:", style: TextStyle(
        fontSize: 20,
        fontWeight: FontWeight.bold
    )
    ));

    display.add(Padding(padding: EdgeInsets.fromLTRB(0, 0, 0, 20)));

    for (int i = 0; i < clubNames.length; i++)
      display.add((
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Container(
                child: InkWell(
                  onTap: () {
                  },
                  child: Text("${clubNames[i]} [${determineClubType(clubTypes[i])}]", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white)),
                ),
                color: Colors.deepOrange,
              ),
              Padding(padding: EdgeInsets.fromLTRB(0, 0, 20, 0)),
              ButtonTheme(
                minWidth: 60,
                height: 30,
                child: RaisedButton(
                  onPressed: (){
                      deleteClub(jsonEncode(<String, String>{
                        'golfClub': clubIDs[i],
                        'golfBag': bagID,
                      }));
                  },
                  child: Text("Delete"),
                )
              )
            ],
          )
      ));

    display.add(RaisedButton(
        onPressed: (){
          clubby(context);
        },
        child: Text('Add Club')
    ));

    display.add(RaisedButton(
        onPressed: (){
          deleteBag(jsonEncode(<String, String>{
            'golfBag': bagID,
          }));
        },
        child: Text('Delete Bag')
    ));

    return display;
  }

  AlertDialog clubby(BuildContext context){
    showDialog(
        context: context,
        builder: (BuildContext context){
          return AlertDialog(
            title: Text('Club', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
            content: SingleChildScrollView(
                child: ListBody(
                  children: <Widget>[
                    TextField(
                        controller: _clubNameController,
                        decoration: InputDecoration(hintText: "Club Name")
                    ),
                    Padding(
                      padding: EdgeInsets.fromLTRB(0, 20, 0, 0),
                      child: Text("Club type"),
                    ),
                    DropdownButton<String>(
                      value: _clubType2,
                      icon: Icon(Icons.arrow_downward),
                      iconSize: 24,
                      elevation: 16,
                      style: TextStyle(color:Colors.deepOrange),
                      onChanged: (String newValue) {
                        setState(() {
                          _clubType2 = newValue;
                        });
                      },
                      items: <String> ['Wood', 'Iron', 'Wedge', 'Putter'].map<DropdownMenuItem<String>>((String value) {
                        return DropdownMenuItem<String>(
                          value: value,
                          child: Text(value, style: TextStyle(fontSize: 18)),
                        );
                      }).toList(),
                    ),
                  ],
                )
            ),
            actions: <Widget>[
              new FlatButton(
                  child: new Text('Add Club'),
                  onPressed: () {
                    addClub(jsonEncode(<String, String>{
                      'golfBag' : bagID,
                      'clubName' : _clubNameController.text,
                      'clubType' : determineClubType2(),
                    }));
                    Navigator.of(context).pop();
                  }
              ),
              new FlatButton(
                  child: new Text('Cancel'),
                  onPressed: () {
                    Navigator.of(context).pop();
                  }
              )
            ],
          );
        }
    );
  }

  void initState(){
    super.initState();
    getBag(jsonEncode(<String, String>{
      'golfBag': bagID,
    }));
  }

  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('View Bag'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: displayClubs(),
        ),
      ),
    );
  }
}
