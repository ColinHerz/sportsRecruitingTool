class UserInfo{
  final String firstname;
  final String lastname;
  final String email;
  final int age;
  final int height;
  final int weight;

  UserInfo(
      {
        this.firstname, this.lastname, this.email, this.age, this.height, this.weight
      });

  List<Object> get props => [firstname, lastname, age, height, weight];

  static UserInfo fromJson(dynamic json){
    return UserInfo(
      firstname: json['firstname'],
      lastname: json['lastname'],
      email: json['email'],
      age: json['age'],
      height: json['height'],
      weight: json['weight'],
    );
  }
}
