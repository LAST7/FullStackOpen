const bcrypt = require("bcrypt");
const supertest = require("supertest");
const helper = require("./test_helper");

const User = require("../models/users");

const app = require("../app");
const { default: mongoose } = require("mongoose");
const api = supertest(app);

describe("when there is initially one user in DB", () => {
    beforeEach(async () => {
        await User.deleteMany({});

        const passwordHash = await bcrypt.hash("passwd", 10);
        const user = new User({
            username: "root",
            passwordHash,
        });

        await user.save();
    }, 100000);

    test("creation succeeds with a fresh username", async () => {
        const usersAtStart = await helper.usersInDB();

        const newUser = {
            username: "Last",
            name: "Lious Last",
            password: "salainen",
        };

        // add the new user to the database
        await api
            .post("/api/users")
            .send(newUser)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        // expecting the amount of the users to grow
        const usersAtEnd = await helper.usersInDB();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);

        // expecting the returned users to contain the one newly added
        const usernames = usersAtEnd.map((u) => u.username);
        expect(usernames).toContain(newUser.username);
    }, 100000);
});

afterAll(async () => {
    await mongoose.connection.close();
}, 100000);
