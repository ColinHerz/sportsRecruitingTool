class ClubInfo{
  final String golfBag;
  final String clubName;
  final String clubType;

  ClubInfo(
      {
        this.golfBag, this.clubName, this.clubType
      });

  List<Object> get props => [golfBag, clubName, clubType];

  static ClubInfo fromJson(dynamic json){
    return ClubInfo(
      golfBag: json['bid'],
      clubName: json['clubName'],
      clubType: json['clubType']
    );
  }
}