import 'package:flutter/material.dart';
import 'Profile.dart';
import 'CreateEvent.dart';
import 'CreateMatch.dart';
import 'ShowDialog.dart';
import 'package:http/http.dart' as http;
import 'models/UserInfo.dart';
import 'models/BagInfo.dart';
import 'models/ClubInfo.dart';
import 'models/GetBags.dart';
import 'Session.dart';
import 'dart:convert';
import 'dart:async';
import 'ViewMatch.dart';
import 'ViewBag.dart';
import 'ViewEvent.dart';

class Homepage extends StatefulWidget{
  _Homepage createState() => _Homepage();
}

// Bag count
int _bags = 0;
// POST Bag model
Future<BagInfo> futureBagInfo;
// Club model
Future<ClubInfo> futureClubInfo;
// Get all bags model
Future<GetBags> futureGetBags;
List<String> bagnames = new List<String>();
List<String> bagIDs = new List<String>();
class _GolfBagDialogState extends State<GolfBagDialog>{
  // Controllers
  final _bagNameController = TextEditingController();
  final _clubNameController = TextEditingController();
  // Number of clubs
  int _numClubs = 0;
  // Drop down value for number of bags
  String _clubType = 'Wood';
  // ignore: non_constant_identifier_names
  final String NO_CLUB = "0";
  // ignore: non_constant_identifier_names
  final String WOOD = "1";
  // ignore: non_constant_identifier_names
  final String IRON = "2";
  // ignore: non_constant_identifier_names
  final String WEDGE = "3";
  // ignore: non_constant_identifier_names
  final String PUTTER = "4";
  // BID
  String bagID;
  // Readonly for bag name
  bool bagNameReadOnly = false;
  List<String> clubNames = new List<String>();
  List<String> clubTypeNames = new List<String>();

  String determineClubType() {
    if(_numClubs == 0)
      return NO_CLUB;

    switch(_clubType)
    {
      case "Wood":
        return WOOD;

      case "Iron":
        return IRON;

      case "Wedge":
        return WEDGE;

      case "Putter":
        return PUTTER;
    }
  }
  Future<BagInfo> postBag(dynamic info) async {
    final http.Response _response = await http.post(
        'http://localhost3000.us-east-2.elasticbeanstalk.com/api/golf/createGolfBag',
        headers: headers,
        body: info
    );

    // If successful login, navigate to homepage.
    if (_response.statusCode == 200) {
      var parsedJson = json.decode(_response.body);
      bagIDs.add(parsedJson['golfBag']);
      _bags++;
      // Get all bags to get the bag that was just posted.
      futureGetBags = getBags(_bagNameController.text);
    }
    // If it's some other error that the user doesn't need to know about.
    else {
      print(_response.statusCode);
      print(_response.body);
    }
  }
  Future<GetBags> getBags(String name) async {
    List<dynamic> bagResponseList2;
    final http.Response _response = await http.get(
      'http://localhost3000.us-east-2.elasticbeanstalk.com/api/golf/getAllGolfBags',
      headers: headers,
    );

    if (_response.statusCode == 200) {
      bagResponseList2 = json.decode(_response.body);
      for (int i = 0; i < bagResponseList2.length; i++) {

        if (bagResponseList2[i]['bagName'] == name)
          bagID = bagResponseList2[i]['_id'];

      }
      for (int i = 0; i < _numClubs; i++){
      futureClubInfo = postClub(
          jsonEncode(<String, String>{
            'golfBag': bagID,
            'clubName': clubNames[i],
            'clubType': clubTypeNames[i],
          })
      );
      }
    }
    else {
      print(_response.statusCode);
      print(_response.body);
    }
  }
  Future<ClubInfo> postClub(dynamic info) async {
    final http.Response _response = await http.post(
        'http://localhost3000.us-east-2.elasticbeanstalk.com/api/golf/createGolfclub',
        headers: headers,
        body: info
    );

    // If successful login, navigate to homepage.
    if (_response.statusCode == 200) {
      //return ClubInfo.fromJson(json.decode(_response.body));
    }
    // If it's some other error that the user doesn't need to know about.
    else {
      print(_response.statusCode);
      print(_response.body);
    }
  }

  Widget build(BuildContext context){
    return AlertDialog(
      title: Text('Bag', style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
      content: SingleChildScrollView(
          child: ListBody(
            children: <Widget>[
              TextField(
                  controller: _bagNameController,
                  decoration: InputDecoration(hintText: "Bag Name"),
                readOnly: bagNameReadOnly,
                onSubmitted: (p) {
                  setState(() {
                    if(_bagNameController.text != "")
                      bagNameReadOnly = true;
                  });
                },
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(0, 35, 0, 0),
                child: Text(
                    "Club", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
              ),
              TextField(
                  controller: _clubNameController,
                  decoration: InputDecoration(hintText: "Club Name")
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(0, 20, 0, 0),
                child: Text("Club type"),
              ),
              DropdownButton<String>(
                value: _clubType,
                icon: Icon(Icons.arrow_downward),
                iconSize: 24,
                elevation: 16,
                style: TextStyle(color:Colors.deepOrange),
                onChanged: (String newValue) {
                  setState(() {
                    _clubType = newValue;
                  });
                },
                items: <String> ['Wood', 'Iron', 'Wedge', 'Putter'].map<DropdownMenuItem<String>>((String value) {
                  return DropdownMenuItem<String>(
                    value: value,
                    child: Text(value, style: TextStyle(fontSize: 18)),
                  );
                }).toList(),
              ),
              RaisedButton(
                child: Text("Add club"),
                onPressed: (){
                  if (_clubNameController.text == "")
                    DialogPopUp(context, "Name your club.");
                  else {
                    setState(() {
                      _numClubs++;
                    });
                    clubNames.add(_clubNameController.text);
                    clubTypeNames.add(determineClubType());
                  }
                },
              ),
              Text(_numClubs == 1 ? "$_numClubs club will be in this bag"
                  : "$_numClubs clubs will be in this bag", style: TextStyle(fontSize: 18))
            ],
          )
      ),
      actions: <Widget>[
        new FlatButton(
            child: new Text('Add bag'),
            onPressed: () {
              if (_bagNameController.text == "")
                DialogPopUp(context, "Name your bag.");
              else {
                bagnames.add(_bagNameController.text);
                // Post the bag
                futureBagInfo = postBag(jsonEncode(
                    <String, String>{'bagName': _bagNameController.text}));
                // Post each of the clubs that were added.
                Navigator.of(context).pop();
              }
            }
        ),
        new FlatButton(
            child: new Text('Cancel'),
            onPressed: () {
              Navigator.of(context).pop();
              bagNameReadOnly = false;
              _bagNameController.text = "";
              _clubNameController.text = "";
              _numClubs = 0;
            }
        )
      ],
    );
  }
}

class GolfBagDialog extends StatefulWidget{
  @override
  _GolfBagDialogState createState() => new _GolfBagDialogState();
}

class _Homepage extends State<Homepage>{
  // Index variable for the tabs.
  int _selectedIndex = 0;
  // User model
  Future<UserInfo> futureProfileInfo;
  // ignore: non_constant_identifier_names
  List<Widget> MatchList = new List<Widget>();
  List<String> matchNames = new List<String>();
  List<String> matchIDs = new List<String>();

  List<Widget> EventList = new List<Widget>();
  List<String> eventNames = new List<String>();
  List<String> eventIDs = new List<String>();

  List<Widget> BagList = new List<Widget>();

  int _matches = 0;
  int _events = 0;

  // Initial state. Get the user and details.
  @override
  void initState() {
    super.initState();
    // Get profile info to display it on the profile page.
    getUser();
    getBags();
    getMatches();
    getEvents();
  }

  Future<void> getUser() async {
    final http.Response _response = await http.get(
      'http://localhost3000.us-east-2.elasticbeanstalk.com/api/users/getUserAndDetail',
      headers: headers,
    );

    if (_response.statusCode == 200) {
      var parsedJson = json.decode(_response.body);
      setState(() {
        SessionFirstName = parsedJson['firstname'];
        SessionLastName = parsedJson['lastname'];
        SessionEmail = parsedJson['email'];
        SessionAge = parsedJson['details']['age'];
        SessionHeight = parsedJson['details']['height'];
        SessionWeight = parsedJson['details']['weight'];
      });
      //return UserInfo.fromJson(json.decode(_response.body));
    }
    else {
      print(_response.statusCode);
      print(_response.body);
    }
  }
  Future<void> getBags() async {
    List<dynamic> bagResponseList;
    final http.Response _response = await http.get(
      'http://localhost3000.us-east-2.elasticbeanstalk.com/api/golf/getAllGolfBags',
      headers: headers,
    );

    if (_response.statusCode == 200) {
      bagResponseList = json.decode(_response.body);
      setState(() {
        _bags = bagResponseList.length;
      });
      for (int i = 0; i < bagResponseList.length; i++) {
        bagnames.add(bagResponseList[i]['bagName']);
        bagIDs.add(bagResponseList[i]['_id']);
      }
    }
    else {
      print(_response.statusCode);
      print(_response.body);
    }
  }
  Future<void> getMatches() async {
    List<dynamic> matchResponseList;
    final http.Response _response = await http.get(
      'http://localhost3000.us-east-2.elasticbeanstalk.com/api/golf/getMyMatches',
      headers: headers,
    );

    if (_response.statusCode == 200) {
      matchResponseList = json.decode(_response.body);
      setState(() {
        _matches = matchResponseList.length;
      });

      for (int i = 0; i < matchResponseList.length; i++){
        matchIDs.add(matchResponseList[i]['_id']);
        matchNames.add(matchResponseList[i]['nameOfRound']);
      }
    }
    else {
      print(_response.statusCode);
      print(_response.body);
    }
  }
  Future<void> getEvents() async {
    List<dynamic> eventResponseList;
    final http.Response _response = await http.get(
      'http://localhost3000.us-east-2.elasticbeanstalk.com/api/golf/getMyEvents',
      headers: headers,
    );

    if (_response.statusCode == 200) {
      eventResponseList = json.decode(_response.body);
      setState(() {
        _events = eventResponseList.length;
      });

      for (int i = 0; i < eventResponseList.length; i++){
        eventIDs.add(eventResponseList[i]['_id']);
        eventNames.add(eventResponseList[i]['eventName']);
      }
    }
    else {
      print(_response.statusCode);
      print(_response.body);
    }
  }

  List<Widget> displayMatches(){
    MatchList = new List<Widget>();

    MatchList.add(Text("Matches", style: largeStyle));

    if(_matches == 0) {
      MatchList.add(Text("No matches to show"));
      MatchList.add(matchCount());
      return MatchList;
    }
    else {
      for (int i = 0; i < _matches; i++) {
        MatchList.add(
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Container(
                  child: InkWell(
                    onTap: () {
                      Navigator.push(
                          context, MaterialPageRoute(
                          builder: (context) => ViewMatch(matchIDs[i])));
                    },
                    child: Text("${matchNames[i]}", style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold, color: Colors.white)),
                  ),
                  color: Colors.deepOrange,
                ),
                Padding(
                  padding: EdgeInsets.fromLTRB(0, 0, 0, 50),
                )
              ],
            )
        );
      }
      MatchList.add(matchCount());
      return MatchList;
    }
  }

  List<Widget> displayEvents(){
    EventList = new List<Widget>();

    EventList.add(Text("Events", style: largeStyle));

    if(_events == 0) {
      EventList.add(Text("No events to show"));
      EventList.add(eventCount());
      return EventList;
    }
    else {
      for (int i = 0; i < _events; i++) {
        EventList.add(
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: <Widget>[
                Container(
                  child: InkWell(
                    onTap: () {
                      Navigator.push(
                          context, MaterialPageRoute(
                          builder: (context) => ViewEvent(eventIDs[i])));
                    },
                    child: Text("${eventNames[i]}", style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold, color: Colors.white)),
                  ),
                  color: Colors.deepOrange,
                ),
                Padding(
                  padding: EdgeInsets.fromLTRB(0, 0, 0, 50),
                )
              ],
            )
        );
      }
      EventList.add(eventCount());
      return EventList;
    }
  }

  List<Widget> displayBags(){
    BagList = new List<Widget>();

    BagList.add(Text("Golf Bags", style: largeStyle));

    if(_bags == 0) {
        BagList.add(Text("No bags to show"));
        BagList.add(bagCount());
        return BagList;
    }
    else {
      for (int i = 0; i < _bags; i++) {
        BagList.add(
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Container(
                child: InkWell(
                  onTap: () {
                    Navigator.push(
                        context, MaterialPageRoute(
                        builder: (context) => ViewBag(bagIDs[i])));
                  },
                  child: Text("${bagnames[i]}", style: TextStyle(fontSize: 25, fontWeight: FontWeight.bold, color: Colors.white)),
                ),
                color: Colors.deepOrange,
              ),
              Padding(
                padding: EdgeInsets.fromLTRB(0, 0, 0, 50),
              )
            ],
          )
        );
      }
      BagList.add(bagCount());
      return BagList;
    }
  }

  Widget select(){

    switch (_selectedIndex)
    {
      case 0: return Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: displayMatches()
      );
      break;

      case 1: return Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: displayEvents()
      );
      break;

      case 2: return Column(
          mainAxisAlignment: MainAxisAlignment.start,
          children: displayBags()
      );
    }
  }

  _simp() {
    showDialog(
        context: context,
        builder: (context) {
          return new GolfBagDialog();
        });
  }

  // Displays match count in the match page.
  Text matchCount() {
    if (_matches == 0)
      return Text("[No matches]", style: TextStyle(fontSize: 20));
    else
      return Text(_matches == 1 ? "[$_matches matches]" : "[$_matches matches]", style: TextStyle(fontSize: 20));
  }

  // Displays event count in the event page.
  Text eventCount() {
    if (_events == 0)
      return Text("[No events]", style: TextStyle(fontSize: 20));
    else
      return Text(_events == 1 ? "[$_events event]" : "[$_events events]", style: TextStyle(fontSize: 20));
  }

  // Displays bag count in the bag dialog.
  Text bagCount() {
    if (_bags == 0)
      return Text("[No bags]", style: TextStyle(fontSize: 20));
    else
      return Text(_bags == 1 ? "[$_bags bag]" : "[$_bags bags]", style: TextStyle(fontSize: 20));
  }

  // Displays the floating action button if we're on the events page.
  FloatingActionButton FAB() {
    // If the current index is 2 (events page) return the button.
      return FloatingActionButton(
        onPressed: () {
          if (_selectedIndex == 0) {
            Navigator.push(context,
                MaterialPageRoute(builder: (context) => CreateMatch()));

          }
          else if (_selectedIndex == 1){
            Navigator.push(context, MaterialPageRoute(builder: (context) => CreateEvent()));
            setState(() {});
          }
          else if (_selectedIndex == 2) {
            _simp();
            setState(() {});
          }

        },
        child: Icon(Icons.add),
        backgroundColor: Colors.deepOrange,
      );
  }

  // SetState for changing the tab index.
  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  Widget build(BuildContext context) {
    return Scaffold(
          appBar: AppBar(
            title: Text('Home'),
          ),
          drawer: Drawer(
                child: ListView(
                    padding: EdgeInsets.zero,
                    children: <Widget>[
                      DrawerHeader(
                        decoration: BoxDecoration(
                          color: Colors.deepOrange,
                        ),
                        child: Text('Options',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 24,
                          ),
                        ),
                      ),
                      ListTile(
                          leading: Icon(Icons.account_circle),
                          title: Text('Profile'),
                          onTap: (){
                            Navigator.push(
                                context, MaterialPageRoute(
                                builder: (context) => Profile()));
                          }
                          ),
                      ListTile(
                        leading: Icon(Icons.arrow_back),
                        title: Text('Logout'),
                        onTap: () {
                          Navigator.pop(context);
                          Navigator.pop(context);
                          },
                      )
                    ]
                )
            ),
          body: Center(
            child: select(),
          ),
          bottomNavigationBar: BottomNavigationBar(
            items: <BottomNavigationBarItem>[
              BottomNavigationBarItem(
                icon: Icon(Icons.golf_course),
                title: Text('Matches'),
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.library_books),
                title: Text('Events'),
              ),
              BottomNavigationBarItem(
                icon: Icon(Icons.archive),
                title: Text('Bags'),
              ),
            ],
            currentIndex: _selectedIndex,
            selectedItemColor: Colors.deepOrange,
            onTap: _onItemTapped,
          ),
          floatingActionButton: FAB(),
      );
  }
}
