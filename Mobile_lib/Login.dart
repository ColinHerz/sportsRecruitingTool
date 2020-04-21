import 'package:flutter/material.dart';
import 'Homepage.dart';
import 'Register.dart';
import 'models/LogInfo.dart';
import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'ShowDialog.dart';
import 'Session.dart';

// Create login state / Create the context
class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  Future<LogInfo> _FutureLogInfo;

  Future<LogInfo> log(String email, String password) async {
    final http.Response _response = await http.post(
        'http://localhost3000.us-east-2.elasticbeanstalk.com/api/users/login',
      headers: headers,
      body: jsonEncode(<String, String>{
        'email': email,
        'password': password,
      }),
    );

    // If successful login, navigate to homepage.
    if (_response.statusCode == 200) {
      updateCookie(_response);
      Navigator.push(
          context, MaterialPageRoute(
          builder: (context) => Homepage()));
      return LogInfo.fromJson(json.decode(_response.body));
    }
    // 400 = incorrect credentials.
    else if (_response.statusCode == 400) {
      DialogPopUp(context, "Incorrect credentials.");
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
                    controller: _emailController,
                    decoration: InputDecoration(
                      border: OutlineInputBorder(),
                      labelText: 'Email',
                    )
                )
            ),
            TextField(
                obscureText: true,
                controller: _passwordController,
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Password',
                )
            ),
            RaisedButton(
                onPressed: () {
                  setState(() {
                    _FutureLogInfo = log(_emailController.text, _passwordController.text);
                  });
                },
                child: Text('Login')
            ),
            Padding(
                padding: EdgeInsets.fromLTRB(0, 80, 0, 0),
                child: Text('Don\'t have an account?')
            ),
            RaisedButton(
                onPressed: (){
                  Navigator.push(
                      context, MaterialPageRoute(
                      builder: (context) => Register()));
                },
                child: Text('Register')
            ),
          ],
        ),
      ),
    );
  }
}