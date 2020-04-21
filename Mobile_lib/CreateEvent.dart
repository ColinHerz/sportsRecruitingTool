import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'models/EventInfo.dart';
import 'Session.dart';
import 'dart:convert';
import 'dart:async';

class CreateEvent extends StatefulWidget{
  _CreateEvent createState() => _CreateEvent();
}

class _CreateEvent extends State<CreateEvent>{
  final _eventNameController = TextEditingController();
  final _courseController = TextEditingController();
  final _holeController = TextEditingController();
  List<TextEditingController> _parsController;
  List<Widget> _holeList;
  List<Widget> _playerList;
  List<TextEditingController> _controllerList;
  String _numPlayers = '2';
  DateTime selectedStartDate = DateTime.now();
  DateTime selectedEndDate = DateTime.now();
  List<String> listPlayers = new List<String>();

  Future<EventInfo> event(dynamic info) async {
    final http.Response _response = await http.post(
      'http://localhost3000.us-east-2.elasticbeanstalk.com/api/golf/createGolfEvent',
      headers: headers,
      body: info
    );

    if (_response.statusCode == 200) {
      Navigator.pop(context);
      //return EventInfo.fromJson(json.decode(_response.body));
    }
    else {
      print(_response.statusCode);
      print(_response.body);
    }
  }

/*
  void createHoles(int holeCount){
    _parsController = new List<TextEditingController>(holeCount);
    _holeList = new List<Widget>();

    for (int i = 0; i < holeCount; i++)
    {
      setState(() {
        _holeList.add(Expanded(
          child: Container(
            width: 70.0,
            child: TextField(
                style: TextStyle(
                    fontSize: 18
                ),
                textAlign: TextAlign.center,
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: (i+1).toString(),
                )
            ),
          )
        )
        );
      });
    }
  }

  Text areParsDisplayed(){
    if(_holeController.text != '')
    {
      if (int.parse(_holeController.text) > 0)
        return new Text("Pars:", textAlign: TextAlign.center, style: TextStyle(fontSize: 20));
      else
        return new Text("");
    }
    else
      return new Text("");
  }

  Row parsForEachHole(){
    if (_holeController.text == '')
      return new Row();

    if (_holeList != null)
    {
        return new Row(children: _holeList);
    }
    else
      return new Row();
  }*/

  Row displayPlayers(int playerCount){
    _controllerList = new List<TextEditingController>();
    _playerList = new List<Widget>();

    for (int i = 0; i < playerCount; i++){
      _controllerList.add(new TextEditingController());

      _playerList.add(
          Expanded(child: TextField(
            controller: _controllerList[i],
              textAlign: TextAlign.center,
              decoration: InputDecoration(hintText: "Email")
          )
        )
      );
    }
    return Row(children: _playerList);
  }

  Future<void> _selectStartDate(BuildContext context) async {
    final DateTime picked = await showDatePicker(
        context: context,
        initialDate: selectedStartDate,
        firstDate: DateTime(2015, 8),
        lastDate: DateTime(2101));
    if (picked != null && picked != selectedStartDate)
      setState(() {
        selectedStartDate = picked;
      });
  }
  Future<void> _selectEndDate(BuildContext context) async {
    final DateTime picked = await showDatePicker(
        context: context,
        initialDate: selectedEndDate,
        firstDate: DateTime(2015, 8),
        lastDate: DateTime(2101));
    if (picked != null && picked != selectedEndDate)
      setState(() {
        selectedEndDate = picked;
      });
  }

  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Create Event'),
      ),
      body: Center(
        child: ListView(
          shrinkWrap: true,
          children: <Widget>[
            Padding(
                padding: EdgeInsets.fromLTRB(0, 0, 0, 10),
                child: TextField(
                    controller: _eventNameController,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Event Name',
                    )
                )
            ),
            Padding(
                padding: EdgeInsets.fromLTRB(0, 0, 0, 10),
                child: TextField(
                    controller: _courseController,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Course',
                    )
                )
            ),
            Text("${selectedStartDate.toLocal()}".split(' ')[0],
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            Align(
              child: RaisedButton(
                onPressed: (){
                  _selectStartDate(context);
                },
                child: Text("Select Start Date"),
              ),
            ),
            Text("${selectedEndDate.toLocal()}".split(' ')[0],
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            Align(
              child: RaisedButton(
                onPressed: (){
                  _selectEndDate(context);
                },
                child: Text("Select End Date"),
              ),
            ),
            /*Container(
              width: 70.0,
              child: TextField(
                style: TextStyle(
                  fontSize: 17
                ),
                textAlign: TextAlign.center,
                  controller: _holeController,
                  onSubmitted: (_holeController) {
                    setState(() {
                      createHoles(int.parse(_holeController));
                    });
                  },
                  decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Holes',
                  )
              ),
            ),*/
            Padding(
              padding: EdgeInsets.fromLTRB(0, 5, 0, 5),
            ),
            //areParsDisplayed(),
            Padding(
              padding: EdgeInsets.fromLTRB(0, 5, 0, 5),
            ),
            //parsForEachHole(),
            Padding(
                padding: EdgeInsets.fromLTRB(0, 20, 0, 0),
              child: Text("Players:", textAlign: TextAlign.center ,style: TextStyle(fontSize: 20)),
            ),
            displayPlayers(int.parse(_numPlayers)),
            Center(
              child: DropdownButton<String>(
                value: _numPlayers,
                icon: Icon(Icons.arrow_downward),
                iconSize: 24,
                elevation: 16,
                style: TextStyle(color:Colors.deepOrange),
                onChanged: (String newValue) {
                  setState(() {
                    _numPlayers = newValue;
                  });
                },
                items: <String> ['2', '3', '4', '5'].map<DropdownMenuItem<String>>((String value) {
                  return DropdownMenuItem<String>(
                    value: value,
                    child: Text(value, style: TextStyle(fontSize: 18)),
                  );
                }).toList(),
              ),
            ),
            Align(
              child: RaisedButton(
                  onPressed: (){
                    for (int i = 0; i < _controllerList.length; i++)
                      listPlayers.add(_controllerList[i].text);
                    event(jsonEncode({
                      'eventName': _eventNameController.text,
                      'startDate': selectedStartDate.toIso8601String() + 'Z',
                      'endDate': selectedEndDate.toIso8601String() + 'Z',
                      'course' : _courseController.text,
                      'players' : listPlayers
                    }));
                  },
                  child: Text('Create Event')
              ),
            )
          ],
        ),
      ),
    );
  }
}
