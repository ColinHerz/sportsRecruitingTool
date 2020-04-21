import 'package:flutter/material.dart';
import 'Login.dart';

void main() => runApp(Sporta());

// Root
class Sporta extends StatelessWidget {

  // This widget is the root of the application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      // Affects the colors of the app.
      theme: ThemeData(
        primarySwatch: Colors.deepOrange,
      ),
      home: Login(),
    );
  }
}
