import app from "..";
import prisma from "../util/prisma";
import request from "supertest";
import EntitiesFactoy from "./factory";

describe('Parcels', () => {

    const factory = new EntitiesFactoy();

    beforeEach(async () => {
        await prisma.parcel.deleteMany();
        await prisma.truck.deleteMany();
    })

    afterEach(async () => {
        await prisma.parcel.deleteMany();
        await prisma.truck.deleteMany();
    })

    it("create a parcel", () => {
        const data = {
            weight: 100,
            cargo: "Electronics",
            truckId: 1
        }
        request(app)
            .post('/parcels')
            .send(data)
            .expect(200)
            .then(response => {
                expect(response.body.weight).toBe(data.weight);
                expect(response.body.cargo).toBe(data.cargo);
                expect(response.body.truckId).toBe(data.truckId);
            })

    })

    it("get all parcels", async () => {
        await factory.createParcel();
        request(app)
            .get('/parcels')
            .expect(200)
            .then(response => {
                expect(response.body.length).toEqual(1);
            })
    })

    it("get a parcel by id", async () => {
        const parcel = await factory.createParcel();

        request(app)
            .get(`/parcels/${parcel.id}`)
            .expect(200)
            .then(response => {
                console.log(response.body);
                expect(response.body).toEqual(parcel);
            })
    })

})