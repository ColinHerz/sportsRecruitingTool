class EventInfo{
  final String eventName;
  final DateTime startDate;
  final DateTime endDate;
  final String course;

  EventInfo(
      {
        this.eventName, this.startDate, this.endDate, this.course
      });

  List<Object> get props => [eventName, startDate, endDate, course];

  static EventInfo fromJson(dynamic json){
    return EventInfo(
      eventName: json['eventName'],
      startDate: json['startDate'],
      endDate: json['endDate'],
      course: json['course']
    );
  }
}