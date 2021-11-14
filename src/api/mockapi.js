import axios from "axios";

const client = axios.create({
  baseURL: "https://618a7c5c34b4f400177c4716.mockapi.io/",
  json: true,
});

export default {
  async execute(method, resource, data) {
    return client({
      method,
      url: resource,
      data,
    }).then((req) => {
      return req.data;
    });
  },
  login() {
    return this.execute("get", "admin");
  },
  getAllPassengers() {
    return this.execute("get", "passengers");
  },
  createPassenger(passenger) {
    return this.execute("post", "passengers", passenger);
  },
  deletePassenger(passenger) {
    return this.execute("delete", `passengers/${passenger.id}`);
  },
  editPassenger(passenger) {
    return this.execute("put", `passengers/${passenger.id}`, passenger);
  },
};
