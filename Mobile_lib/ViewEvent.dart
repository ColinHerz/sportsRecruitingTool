import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'Session.dart';
import 'dart:async';

class ViewEvent extends StatefulWidget{
  final String eventID;

  ViewEvent(this.eventID);

  _ViewEvent createState() => _ViewEvent(eventID);
}

class _ViewEvent extends State<ViewEvent>{
  final String eventID;

  _ViewEvent(this.eventID);

  Future<void> getEvent() async {
    final http.Response _response = await http.get(
      'http://localhost3000.us-east-2.elasticbeanstalk.com/api/golf/getEventResults/$eventID',
      headers: headers,
    );

    if (_response.statusCode == 200) {
      print(_response.body);
    }
    else {
      print(_response.statusCode);
      print(_response.body);
    }
  }

  void initState(){
    super.initState();
    getEvent();
  }

  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('View Event'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Padding(
                padding: EdgeInsets.fromLTRB(0, 0, 0, 10),
                child: Text("Event")
            ),
            Text("Stuff"),
            RaisedButton(
                onPressed: (){
                  Navigator.pop(context);
                },
                child: Text('Back')
            ),
          ],
        ),
      ),
    );
  }
}
