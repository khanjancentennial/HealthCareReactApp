class User {
    constructor({ _id, firstName, lastName, email, phoneNumber, gender, healthcareProvider }) {
      this.id = _id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.gender = gender;
      this.healthcareProvider = healthcareProvider;
    }
  }
  
  export default User;