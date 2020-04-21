import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

Map<String, String> headers = {'Content-Type': 'application/json'};

String SessionFirstName;
String SessionLastName;
String SessionEmail;
int SessionAge;
int SessionHeight;
int SessionWeight;

// Large font style.
const TextStyle largeStyle = TextStyle(
    fontSize: 40,
    fontWeight: FontWeight.bold
);

void updateCookie(http.Response response) {

  String rawCookie = response.headers['set-cookie'];
  if (rawCookie != null) {
    int index = rawCookie.indexOf(';');
    headers['cookie'] =
    (index == -1) ? rawCookie : rawCookie.substring(0, index);
  }
}
