import 'package:flutter/material.dart';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'models/UserInfo.dart';
import 'Session.dart';
import 'ShowDialog.dart';

class Profile extends StatefulWidget {
  @override
  _ProfileState createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {

  // Keyboard focus nodes for each field
  List<FocusNode> _nodes = [new FocusNode(), new FocusNode(), new FocusNode()];

  // ReadOnly booleans for each field
  List<bool> _ReadOnlybools = [true, true, true];

  // Text controllers for the profile information fields
  final _nameController = TextEditingController(text: "$SessionFirstName $SessionLastName");
  final _emailController = TextEditingController(text: SessionEmail);
  final _ageController = TextEditingController(text: SessionAge.toString());
  final _heightController = TextEditingController(text: SessionHeight.toString());
  final _weightController = TextEditingController(text: SessionWeight.toString());

  bool isVerified = false;

  // Dialog box
  void _showDialog(String message, int enable){
    showDialog(
        context: context,
        builder: (BuildContext context){
          return AlertDialog(
              title: new Text(message),
              actions: <Widget>[
                new FlatButton(
                    child: new Text("Yes"),
                    onPressed: (){
                      _ReadOnlybools[enable] = false;
                      Navigator.of(context).pop();
                    }
                ),
                new FlatButton(
                  child: new Text("Cancel"),
                  onPressed: (){
                    _ReadOnlybools[enable] = true;
                    Navigator.of(context).pop();
                    },
                )
              ]
          );
        }
    );
  }

  Future<UserInfo> postUser(dynamic info) async {
    final http.Response _response = await http.post(
      'http://localhost3000.us-east-2.elasticbeanstalk.com/api/users/detail/update',
      headers: headers,
      body: info,
    );

    // If successful login, navigate to homepage.
    if (_response.statusCode == 200) {
      return UserInfo.fromJson(json.decode(_response.body));
    }
    else {
      print(_response.statusCode);
      print(_response.body);
    }
  }
  Future<UserInfo> getUser() async {
    final http.Response _response = await http.get(
      'http://localhost3000.us-east-2.elasticbeanstalk.com/api/users/get',
      headers: headers,
    );

    // If successful login, navigate to homepage.
    if (_response.statusCode == 200) {
      var parsedJson = json.decode(_response.body);
      setState(() {
        isVerified = parsedJson['isVerified'];
      });
      //return UserInfo.fromJson(json.decode(_response.body));
    }
    else {
      print(_response.statusCode);
      print(_response.body);
    }
  }
  Future<UserInfo> resendVerification(dynamic info) async {
    final http.Response _response = await http.post(
      'http://localhost3000.us-east-2.elasticbeanstalk.com/api/emails/resendVerificationEmail',
      headers: headers,
      body: info,
    );

    // If successful login, navigate to homepage.
    if (_response.statusCode == 200) {
      DialogPopUp(context, "Email has been re-sent!");
      //return UserInfo.fromJson(json.decode(_response.body));
    }
    else {
      print(_response.statusCode);
      print(_response.body);
    }
  }

  InkWell isNotVerified(){
    return InkWell(
      child: Text(
        "Need to resend verification email?",
        style: TextStyle(
            fontSize: 16,
            color: Colors.deepOrangeAccent
        ),
      ),
      onTap: (){
        resendVerification(jsonEncode(<String, String>{
          'receiverEmail' : _emailController.text
        }));
        },
    );
  }

  void initState()
  {
    super.initState();
    getUser();
  }

  Widget build(BuildContext context){
    return Scaffold(
      appBar: AppBar(
          title: Text('Profile')
      ),
      body: ListView(
          children: <Widget>[
        Column(
          mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
              Padding(
                padding: EdgeInsets.fromLTRB(0, 10, 0, 10),
                child: TextField(
                    readOnly: true,
                    controller: _nameController,
                    decoration: InputDecoration(
                    border: OutlineInputBorder(),
                    labelText: 'Name',
                  )
                )
              ),
              Padding(
                  padding: EdgeInsets.fromLTRB(0, 0, 0, 10),
                  child: TextField(
                      readOnly: true,
                      controller: _emailController,
                      decoration: InputDecoration(
                        border: OutlineInputBorder(),
                        labelText: 'Email',
                      )
                  )
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(0, 0, 0, 10),
                child: Text("Email verified: $isVerified",
                    style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.bold,
                        color: Colors.deepOrange
                    )
                ),
              ),
              isNotVerified(),
              Padding(
                  padding: EdgeInsets.fromLTRB(0, 10, 0, 10),
                  child: TextField(
                      onTap: () {
                        setState(() {
                          _showDialog("Edit age?", 0);
                          FocusScope.of(context).requestFocus(_nodes.elementAt(0));
                        });
                      },
                      // Sets the field back to read-only
                      onSubmitted: (d){setState(() {
                        _ReadOnlybools[0] = true;
                        postUser(jsonEncode(<String, int>{
                          'age': int.parse(_ageController.text),
                          'height': SessionHeight,
                          'weight': SessionWeight,
                        }));
                        SessionAge = int.parse(_ageController.text);
                      });
                      },
                      focusNode: _nodes.elementAt(0),
                      readOnly: _ReadOnlybools.elementAt(0),
                      controller: _ageController,
                      decoration: InputDecoration(
                        suffixIcon: Icon(Icons.create),
                        border: OutlineInputBorder(),
                        labelText: 'Age',
                      )
                  )
              ),
              Padding(
                  padding: EdgeInsets.fromLTRB(0, 0, 0, 10),
                  child: TextField(
                      onTap: () {
                         setState(() {
                          _showDialog("Edit height?", 1);
                          FocusScope.of(context).requestFocus(_nodes.elementAt(1));
                        });
                      },
                      // Sets the field back to read-only
                      onSubmitted: (e){setState(() {
                        _ReadOnlybools[1] = true;
                        postUser(jsonEncode(<String, int>{
                          'age': SessionAge,
                          'height': int.parse(_heightController.text),
                          'weight': SessionWeight,
                        }));
                        SessionHeight = int.parse(_heightController.text);
                      });
                      },
                      focusNode: _nodes.elementAt(1),
                      readOnly: _ReadOnlybools.elementAt(1),
                      controller: _heightController,
                      decoration: InputDecoration(
                        suffixIcon: Icon(Icons.create),
                        border: OutlineInputBorder(),
                        labelText: 'Height',
                      )
                  )
              ),
                Padding(
                  padding: EdgeInsets.fromLTRB(0, 0, 0, 10),
                  child: TextField(
                      onTap: () {
                        setState(() {
                          _showDialog("Edit weight?", 2);
                          FocusScope.of(context).requestFocus(_nodes.elementAt(2));
                        });
                      },
                      // Sets the field back to read-only
                      onSubmitted: (e){setState(() {
                        _ReadOnlybools[2] = true;
                        postUser(jsonEncode(<String, int>{
                          'age': SessionAge,
                          'height': SessionHeight,
                          'weight': int.parse(_weightController.text),
                        }));
                        SessionWeight = int.parse(_weightController.text);
                      });
                      },
                      focusNode: _nodes.elementAt(2),
                      readOnly: _ReadOnlybools.elementAt(2),
                      controller: _weightController,
                      decoration: InputDecoration(
                        suffixIcon: Icon(Icons.create),
                        border: OutlineInputBorder(),
                        labelText: 'Weight',
                      )
                  )
                ),
            ],
        )
      ])
    );
  }
}