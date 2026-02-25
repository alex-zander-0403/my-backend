import request from "supertest";
import { app } from "../../src/index";

//
describe("/users", () => {
  it("should return 200 and empty array", async () => {
    await request(app).get("/users").expect(200, []);
    // expect(1).toBe(1);
  });
});
