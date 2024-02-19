import app from "..";
import prisma from "../util/prisma";
import request from "supertest";
import EntitiesFactoy from "./factory";

describe('trucks', () => {

    const factory = new EntitiesFactoy();

    beforeEach(async () => {
        await prisma.parcel.deleteMany();
        await prisma.truck.deleteMany();
    })

    afterEach(async () => {
        await prisma.parcel.deleteMany();
        await prisma.truck.deleteMany();
    })


    it("create a truck", async () => {
        const data = {
            plate: "1234",
            capacity: 100,
        }
        const response = await
            request(app)
                .post('/trucks')
                .send(data)
                .expect(200)

        expect(response.body.plate).toBe(data.plate);
        expect(response.body.capacity).toBe(data.capacity);
    })

    it("get all trucks", async () => {
        const truck = await factory.createTruck();
        await factory.createParcel(truck.id);


        const response = await request(app)
            .get('/trucks')
            .expect(200)

        expect(response.body.length).toEqual(1);
    })

    it("get a truck by id", async () => {
        const truck = await factory.createTruck();
        await factory.createParcel(truck.id);

        const response = await
            request(app)
                .get(`/trucks/${truck.id}`)
                .expect(200)

        console.log(response.body);
    })

})