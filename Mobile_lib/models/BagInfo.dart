class BagInfo{
  final String bagName;

  BagInfo(
      {
        this.bagName
      });

  List<Object> get props => [bagName];

  static BagInfo fromJson(dynamic json){
    return BagInfo(
      bagName: json['bagName'],
    );
  }
}