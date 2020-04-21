class RegInfo{
  final String firstname;
  final String lastname;
  final String email;
  final String password;

  RegInfo(
      {
        this.firstname, this.lastname, this.email, this.password
      });

  List<Object> get props => [firstname, lastname, email, password];

  static RegInfo fromJson(dynamic json){
    return RegInfo(
      firstname: json['firstname'],
      lastname: json['lastname'],
      email: json['email'],
      password: json['password'],
    );
  }
}
