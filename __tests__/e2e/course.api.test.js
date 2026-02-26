import request from "supertest";
import { app } from "../../src/index";
//
describe("/users", () => {
    // нормализация перед тестами
    beforeAll(async () => {
        await request(app).delete("/__test__/data");
    });
    it("should return 200 and empty array", async () => {
        await request(app).get("/users").expect(200, []);
    });
    it("should return 404 for not existing user", async () => {
        await request(app).get("/users/999").expect(404);
    });
    it("should'nt create new user without name", async () => {
        await request(app).post("/users").send({ name: "" }).expect(400);
        await request(app).get("/users").expect(200, []);
    });
    it("should create new user with correct data", async () => {
        const response = await request(app)
            .post("/users")
            .send({ name: "David" })
            .expect(201);
        const createdUser = response.body;
        expect(createdUser).toEqual({
            id: expect.any(Number),
            name: "David",
            age: expect.any(Number),
            hasCar: expect.any(Boolean),
        });
        await request(app).get("/users").expect(200, [createdUser]);
    });
});
//# sourceMappingURL=course.api.test.js.map