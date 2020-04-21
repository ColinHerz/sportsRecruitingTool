import 'package:flutter/material.dart';

// Dialog box
AlertDialog DialogPopUp(BuildContext context, String message){
  showDialog(
      context: context,
      builder: (BuildContext context){
        return AlertDialog(
            title: new Text(message),
            actions: <Widget>[
              new FlatButton(
                  child: new Text("Close"),
                  onPressed: (){
                    Navigator.of(context).pop();
                  }
              )
            ]
        );
      }
  );
}
