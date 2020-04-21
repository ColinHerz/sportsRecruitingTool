import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:sporta/ShowDialog.dart';
import 'models/GetBags.dart';
import 'models/EventInfo.dart';
import 'Session.dart';
import 'dart:convert';
import 'dart:async';

class CreateMatch extends StatefulWidget{
  _CreateMatch createState() => _CreateMatch();
}

class _CreateMatch extends State<CreateMatch>{
  final _matchNameController = TextEditingController();
  final _courseController = TextEditingController();
  List<TextEditingController> _parsController;
  List<TextEditingController> _controllerList;
  String _currentBag = '[None selected]';
  List<String> _bagIDlist = new List<String>();
  List<String> _bagList = new List<String>();
  DateTime selectedDate = DateTime.now();

  Future<GetBags> getBags() async {
    List<dynamic> bagResponseList;
    final http.Response _response = await http.get(
      'http://localhost3000.us-east-2.elasticbeanstalk.com/api/golf/getAllGolfBags',
      headers: headers,
    );

    if (_response.statusCode == 200) {
      _bagList.add('[None selected]');
      _bagIDlist.add('null');
      bagResponseList = json.decode(_response.body);
      setState(() {
        for (int i = 0; i < bagResponseList.length; i++) {
          _bagList.add(bagResponseList[i]['bagName']);
          _bagIDlist.add(bagResponseList[i]['_id']);
        }
      });
    }
    else {
      print(_response.statusCode);
      print(_response.body);
    }
  }
  Future<GetBags> createMatch(dynamic info) async {
    final http.Response _response = await http.post(
      'http://localhost3000.us-east-2.elasticbeanstalk.com/api/golf/createGolfMatch',
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
  void initState(){
    super.initState();
    getBags();
  }

  Future<void> _selectDate(BuildContext context) async {
    final DateTime picked = await showDatePicker(
        context: context,
        initialDate: selectedDate,
        firstDate: DateTime(2015, 8),
        lastDate: DateTime(2101));
    if (picked != null && picked != selectedDate)
      setState(() {
        selectedDate = picked;
      });
  }

  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Create Match'),
      ),
      body: Center(
        child: ListView(
          shrinkWrap: true,
          children: <Widget>[
            Padding(
                padding: EdgeInsets.fromLTRB(0, 0, 0, 10),
                child: TextField(
                    controller: _matchNameController,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Match Name',
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
            Text("${selectedDate.toLocal()}".split(' ')[0],
                textAlign: TextAlign.center,
              style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
            ),
            Align(
              child: RaisedButton(
                onPressed: (){
                  _selectDate(context);
                },
                child: Text("Select Date"),
              ),
            ),
            Padding(
              padding: EdgeInsets.fromLTRB(0, 10, 0, 10),
            ),
            Text("Select bag:",
                textAlign: TextAlign.center,
                style: TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.bold)
            ),
            Center(
              child: DropdownButton<String>(
                value: _currentBag,
                icon: Icon(Icons.arrow_downward),
                iconSize: 24,
                elevation: 16,
                style: TextStyle(color:Colors.deepOrange),
                onChanged: (String newValue) {
                  setState(() {
                    _currentBag = newValue;
                  });
                },
                items: _bagList.map<DropdownMenuItem<String>>((String value) {
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
                    if (_matchNameController.text == "" || _courseController.text == "" || _currentBag == '[None selected]')
                      DialogPopUp(context, "Please fill in all fields");
                    else{
                      String bagID;
                      for (int i = 0; i < _bagList.length; i++){
                        if (_bagList[i] == _currentBag){
                          bagID = _bagIDlist[i];
                          break;
                        }
                      }
                      createMatch(
                        jsonEncode(<String, String>{
                          'nameOfRound': _matchNameController.text,
                          'coursePlayed': _courseController.text,
                          'datePlayed' : selectedDate.toIso8601String() + 'Z',
                          'GolfBagUsed' : bagID
                        })
                      );
                      Navigator.pop(context);
                    }
                  },
                  child: Text('Create Match')
              ),
            )
          ],
        ),
      ),
    );
  }
}
