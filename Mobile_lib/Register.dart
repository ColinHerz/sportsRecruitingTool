import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'models/RegInfo.dart';
import 'dart:async';
import 'dart:convert';
import 'ShowDialog.dart';
import 'Session.dart';

class Register extends StatefulWidget{
  @override
  _RegisterState createState() => _RegisterState();
}

class _RegisterState extends State<Register>{
  final _firstNameController = TextEditingController();
  final _lastNameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  Future<RegInfo> _FutureRegInfo;

  Future<RegInfo> reg(String firstname, String lastname, String email, String password) async {
    final http.Response _response = await http.post(
      'http://localhost3000.us-east-2.elasticbeanstalk.com/api/users/register',
      headers: headers,
      body: jsonEncode(<String, String>{
        'firstname': firstname,
        'lastname': lastname,
        'email': email,
        'password': password,
      }),
    );

    // If successful registration, navigate back to login.
    if (_response.statusCode == 200){
      // updateCookie(_response); ??
      Navigator.pop(context);
      DialogPopUp(context, "Account created!");
      return RegInfo.fromJson(json.decode(_response.body));
    }
    // If there was an error with registration. Email taken, email invalid, etc.
    else if (_response.statusCode == 400) {
      DialogPopUp(context, "Failed to register.");
    }
    // If it's some other error that the user doesn't need to know about.
    else {
        print(_response.statusCode);
        print(_response.body);
    }
  }

  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Sporta'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Padding(
                padding: EdgeInsets.fromLTRB(0, 0, 0, 10),
                child: TextField(
                    controller: _firstNameController,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'First Name',
                    )
                )
            ),
            Padding(
                padding: EdgeInsets.fromLTRB(0, 0, 0, 10),
                child: TextField(
                    controller: _lastNameController,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Last Name',
                    )
                )
            ),
            Padding(
                padding: EdgeInsets.fromLTRB(0, 0, 0, 10),
                child: TextField(
                    controller: _emailController,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(), labelText: 'Email',
                    )
                )
            ),
            TextField(
                obscureText: true,
                controller: _passwordController,
                decoration: InputDecoration(
                  border: OutlineInputBorder(), labelText: 'Password',
                )
            ),
            RaisedButton(
                onPressed: () {
                  setState(() {
                    _FutureRegInfo = reg(_firstNameController.text, _lastNameController.text,
                        _emailController.text, _passwordController.text);
                  });
                },
                child: Text('Register')
            ),
          ],
        ),
      ),
    );
  }
}
