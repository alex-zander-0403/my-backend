import request from "supertest";
import { app } from "../../src";

describe("/users", () => {
  it("should return 200 and empty array", () => {
    request(app).get("/users").expect([]);
  });
});
