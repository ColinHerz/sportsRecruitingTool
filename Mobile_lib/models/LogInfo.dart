class LogInfo{
  final String email;
  final String password;

  LogInfo(
      {
        this.email, this.password
      });

  List<Object> get props => [email, password];

  static LogInfo fromJson(dynamic json){
    return LogInfo(
      email: json['email'],
      password: json['password'],
    );
  }
}
