class Patient {
    constructor({ _id, firstName, lastName, email, phoneNumber, gender, weight, height, address, status }) {
      this.id = _id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.email = email;
      this.phoneNumber = phoneNumber;
      this.gender = gender;
      this.weight = weight;
      this.height = height;
      this.address = address;
      this.status = status;
    }
  }
  
  export default Patient;
  